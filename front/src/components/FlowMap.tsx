import * as ApolloReactHooks from "@apollo/client";
import Autosuggest from "react-autosuggest";
import {FlowItemComponent} from "./FlowItemComponent"
import React, {FC, ReactElement, useEffect, useMemo, useState} from 'react';
import './FlowMap.css';
import {populate, Position, randomLayout, springLayout} from "../logic/layout";
import {useGesture} from 'react-use-gesture'
import {animated, useSpring, useSprings, useTransition} from 'react-spring'
import SearchBar from "./ui/SearchBar";
import UserMenu from "./ui/UserMenu";
import Brand from "./ui/Brand";
import ArrowButton from "./ui/ArrowButton";
import {WholeFlowQuery} from "../generated/graphql";
import {FlowItemConnectionComponent} from "./FlowItemConnection";
import {useKeyPress, useWindowSize} from "react-use";
import {QueryTuple} from "@apollo/client";
import "./Modal.scss"

type FlowMapProps = & {
    flow: WholeFlowQuery["flow"]
    addItem: () => void
};


type OffsetSpring = {
    left: number,
    top: number,
    transform: string,
}

export const FlowMap: FC<FlowMapProps> = props => {

    type Item = FlowMapProps["flow"]["flowItems"][number]

    const [targetZoom, setTargetZoom] = useState(1);

    const {width, height} = useWindowSize()

    const [cameraSpring, setCameraSpring] = useSpring((): OffsetSpring => ({
        left: -width / 2,
        top: -height / 2,
        transform: `scale(1)`,
    }));

    const itemIds = useMemo(() => props.flow.flowItems.map(it => it._id), [props.flow.flowItems.length])
    const itemByIds = useMemo(() =>
        props.flow.flowItems.reduce(
            (acc, cur): Record<string, Item> => ({
                ...acc,
                [cur._id]: cur,
            }),
            {} as Record<string, Item>
        ), [props.flow.flowItems.length]
    )

    const [itemPositions, setItemPositions] = useState(() =>
        randomLayout(
            itemIds,
            width,
            height,
        )
    )

    useEffect(() => {

        setItemPositions(springLayout(1000, 400, itemIds, width, height, props.flow.flowItemConnections.map(it => ({
            from: it.from._id,
            to: it.to._id
        })), populate(itemIds, itemPositions, width, height)))

    }, [props.flow.flowItems.length])

    type ItemProps = { left: number, top: number }

    const springs = useSprings<ItemProps>(itemIds.length, itemIds.map((item): ItemProps => ({
        left: itemPositions[item]?.left ?? 0,
        top: itemPositions[item]?.top ?? 0
    })))

    useKeyPress(e => {
        console.log(e)

        // if (e.key === "ArrowLeft") {
        //     setCameraSpring({left: -10})
        // }
        props.addItem()
        return true;
    })

    const bind = useGesture({
        onDrag: ({offset: [x, y], vxvy: [vx]}) =>
            setCameraSpring({left: x, top: y}),
        onWheel: (state) => {

            const maxZoomFactor = 4;
            const minZoomFactor = 0.25;
            const a = 200;
            const newTargetZoom = a / Math.max(state.offset[1] + a, a / maxZoomFactor);

            setTargetZoom(newTargetZoom);

            setCameraSpring({transform: `scale(${newTargetZoom})`});

        }

    });

    const [insertAt, setInsertAt] = useState<string | null>(null)
    type ModalSpring = { opacity: number, transform: string }
    const transitions = useTransition<string, ModalSpring>(insertAt === null ? [] : [""], {
        key: () => "key",
        from: {opacity: 0, y: -100, transform: "scale(0.8)"},
        enter: {opacity: 1, y: 0, transform: "scale(1)"},
        leave: {opacity: 0, y: -100, transform: "scale(0.8)"},
    })
    return <div {...bind()} className="FlowMap">
        <div className="top-bar">
            <Brand/>
            <SearchBar/>
            <UserMenu/>
        </div>

        {transitions((style, index) =>
            <animated.div key={index} className={"modal"} style={style as any}>
                Content
            </animated.div>
        )}

        <ArrowButton direction={"Bottom"}/>
        <ArrowButton direction={"Left"}/>
        <ArrowButton direction={"Right"}/>

        <animated.div className={"FlowMap-inner"} style={cameraSpring}>
            {itemIds.map((id, i) =>
                <FlowItemComponent
                    key={i}
                    {...itemByIds[id]}
                    {...itemByIds[id].item}
                    {...springs[i]}
                    onClickAdd={() => setInsertAt(id)}
                />
            )}

            {props.flow.flowItemConnections.map((a, i) =>
                <FlowItemConnectionComponent
                    key={i}
                    fromX={itemPositions[a.from._id]?.left ?? 0}
                    fromY={itemPositions[a.from._id]?.top ?? 0}
                    toX={itemPositions[a.to._id]?.left ?? 0}
                    toY={itemPositions[a.to._id]?.top ?? 0}
                />
            )}

        </animated.div>
    </div>;
};


export const QueryControlledAutoSuggest = <TData, TItem, TVariables>(
    props: {
        getSuggestionValue: (suggestion: TItem) => string
        onSuggestionSelected: (suggestion: TItem) => void
        renderSuggestion: (suggestion: TItem) => React.ReactNode

        lazyLoadHook: (baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TData, TVariables>) => QueryTuple<TData, TVariables>

        getItems: (data: TData, value: string) => TItem[]
        getVariables: (search: string) => TVariables

        className: string | ((value: string) => string)
        placeholder: string
    },
): ReactElement => {

    const [text, setText] = useState<string>("");
    const [override, setOverride] = useState<boolean>(true);
    const [getSuggestions, {data}] = props.lazyLoadHook();

    return <Autosuggest<TItem>
        suggestions={override || !data ? [] : props.getItems(data, text)}
        onSuggestionsFetchRequested={async (request) => {
            getSuggestions({variables: props.getVariables(request.value)});
            setOverride(false);
        }}
        onSuggestionsClearRequested={async () => setOverride(true)}
        getSuggestionValue={props.getSuggestionValue}
        onSuggestionSelected={async (_, data) => {
            const suggestion = data.suggestion;
            props.onSuggestionSelected(suggestion);
            setText("");
        }}
        renderSuggestion={props.renderSuggestion}
        inputProps={{
            className: typeof props.className === "string" ? props.className : props.className(text),
            placeholder: props.placeholder,
            value: text,
            onChange: async (event, data) => {
                setText(
                    data.method === "click"
                    || data.method === "enter"
                    || data.method === "escape"
                        ? ""
                        : data.newValue,
                );
            },
            type: "search",
        }}
    />;

};