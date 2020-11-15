import {FlowItemComponent} from "./FlowItemComponent"
import React, {FC, useEffect, useState} from 'react';
import './FlowMap.css';
import {randomLayout, Position} from "../logic/layout";
import {useGesture} from 'react-use-gesture'
import {animated, useSpring, useSprings} from 'react-spring'
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

    const [cameraSpring, setCameraSpring] = useSpring((): OffsetSpring => ({
        left: 0,
        top: 0,
        transform: `translate(0px, 0px), scale(1), translate(0px, 0px)`
    }));
    const [targetZoom, setTargetZoom] = useState(1);

    useKeyPress(e => {
        props.addItem()
        return true;
    })

    const {width, height} = useWindowSize()

    const [itemPositions, setItemPositions] = useState(() =>
        randomLayout(
            props.flow.flowItems.length,
            width,
            height,
        )
    )

    const springs = useSprings<Position, Position>(itemPositions.length, itemPositions)

    const bind = useGesture({
        onDrag: ({offset: [x, y], vxvy: [vx]}) =>
            setCameraSpring({left: x, top: y}),
        onWheel: (state) => {
            const a = 100;
            const newTargetZoom = a / (state.offset[1] + a);

            setCameraSpring({transform: `translate(${width / 2}px, ${height / 2}px), scale(${newTargetZoom}), translate(-${width / 2}px, -${height / 2}px)`})
        }
    });

    let indicesFrom = props.flow.flowConnections.map(c => props.flow.flowItems.findIndex(a => c.from._id === a._id));
    let indicesTo = props.flow.flowConnections.map(c => props.flow.flowItems.findIndex(a => c.to._id === a._id));

    return <div {...bind()} className="FlowMap">
        <div className="top-bar"><Brand/>
            <SearchBar/>
            <UserMenu/></div>

        <ArrowButton direction={"Bottom"}/>
        <ArrowButton direction={"Left"}/>
        <ArrowButton direction={"Right"}/>

        <animated.div className={"FlowMap-inner"} style={cameraSpring}>
            {props.flow.flowItems.map((item, i) =>
                <FlowItemComponent
                    key={i}
                    {...item}
                    {...item.item}
                    {...springs[i]}
                />
            )}
            {props.flow.flowConnections.map((a, i) =>
                <FlowItemConnectionComponent
                    key={i}
                    fromX={itemPositions[indicesFrom[i]].left}
                    toX={itemPositions[indicesTo[i]].left}
                    fromY={itemPositions[indicesFrom[i]].top}
                    toY={itemPositions[indicesTo[i]].top}
                />)}
        </animated.div>
    </div>;
};
