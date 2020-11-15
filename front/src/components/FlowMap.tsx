import {FlowItemComponent} from "./FlowItemComponent"
import React, {FC, useEffect, useMemo, useState} from 'react';
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

    useKeyPress(e => {
        props.addItem()
        return true;
    })

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

        setItemPositions(springLayout(100, 300, itemIds, width, height, props.flow.flowItemConnections.map(it => ({
            from: it.from._id,
            to: it.from._id
        })), populate(itemIds, itemPositions, width, height)))

    }, [props.flow.flowItems.length])

    type ItemProps = { left: number, top: number }

    const springs = useSprings(itemIds.length, itemIds.map((item): ItemProps => ({
        left: itemPositions[item]?.left ?? 0,
        top: itemPositions[item]?.top ?? 0
    }))) as ItemProps[];

    const bind = useGesture({
        onDrag: ({offset: [x, y], vxvy: [vx]}) =>
            setCameraSpring({left: x, top: y}),
        onWheel: (state) => {

            const maxZoomFactor = 4;
            const minZoomFactor = 0.25;
            const a = 200;
            const newTargetZoom = a / Math.max(state.offset[1] + a, a / maxZoomFactor);

            setTargetZoom(newTargetZoom)

            setCameraSpring({transform: `scale(${newTargetZoom})`});

        }

    });

    const [insertAt, setInsertAt] = useState<string | null>(null)
    const transitions = useTransition(insertAt !== null, null, {
        from: {opacity: 0, transform: "translateY(-100px) scale(.8)"},
        enter: {opacity: 1, transform: "translateY(0) scale(1)"},
        leave: {opacity: 0, transform: "translateY(100px) scale(.8)"},
    })

    return <div {...bind()} className="FlowMap">
        <div className="top-bar">
            <Brand/>
            <SearchBar/>
            <UserMenu/>
        </div>

        {transitions.map(({props,key}) =>
            <animated.div key={key} className={"modal"} style={props}>
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
