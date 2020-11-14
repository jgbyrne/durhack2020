import React, {FC, useMemo, useRef, useState} from 'react';
import './FlowMap.css';
import FlowItem from "./FlowItem";
import FlowItemConnection from "./FlowItemConnection";
import {springLayout} from "../logic/layout";
import {useGesture} from 'react-use-gesture'
import {animated, useSpring} from 'react-spring'

type FlowItem = {
    _id: string,
    description: string,
    thumbnail: string,
    name: string,
}

type FlowItemConnection = {
    _id: string,
    from: string,
    to: string
}

type FlowMap = {
    flowItemData: FlowItem[],
    flowItemConnectionData: FlowItemConnection[]
}

const FlowMap: FC<FlowMap> = props => {
    let [zoomLevel, setZoomLevel] = useState<number>(1.0);
    let [drag, setDrag] = useState<boolean>(false);

    type OffsetSpring = {
        left: number,
        top: number,
    }
    type SpringType = {
        wheelOffset: number,
    }

    const [springOffset, set] = useSpring((): OffsetSpring => ({left: 0, top: 0}));
    // const [spring, set] = useSpring((): SpringType => ({wheelOffset: 1, offset: [0, 0]}));

    const wheelOffset = useSpring(() => 0);
    const dragOffset = useRef([0, 0]);


    const bind = useGesture({
        onDrag: ({offset: [x, y], vxvy: [vx]}) => {
            set({left: x, top: y});
            // return vx && ((dragOffset.current = -x))
        },
        onWheel: ({offset: [, y], vxvy: [, vy]}) => {
            if (vy) {
                // set({wheelOffset: y});
            }
        }
    });

    let flowItemPositions = useMemo(() =>
            springLayout(props.flowItemData.map(e => e._id), props.flowItemConnectionData.map(c => ({
                from: c.from,
                to: c.to
            }))),
        [props.flowItemData]
    );

    let indicesFrom = props.flowItemConnectionData.map(c => props.flowItemData.findIndex((a) => c.from == a._id));
    console.log(indicesFrom);
    let indicesTo = props.flowItemConnectionData.map(c => props.flowItemData.findIndex((a) => c.to == a._id));
    console.log(indicesTo);

    return <div
        {...bind()}
        className="FlowMap"
    >
        <animated.div className={"FlowMap-inner"} style={springOffset}>
            {props.flowItemData.map((a, i) =>
                <FlowItem key={i} {...{...a, ...flowItemPositions[i]}}/>
            )}
            {props.flowItemConnectionData.map((a, i) =>
                <FlowItemConnection
                    {...a}
                    fromX={0}
                    toX={0}
                    fromY={0}
                    toY={0}
                />)}
        </animated.div>

    </div>;
};

export default FlowMap;
