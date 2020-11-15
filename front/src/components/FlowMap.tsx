import React, {FC, useMemo} from 'react';
import './FlowMap.css';
import FlowItem from "./FlowItem";
import FlowItemConnection from "./FlowItemConnection";
import {springLayout} from "../logic/layout";
import {useGesture} from 'react-use-gesture'
import {animated, useSpring} from 'react-spring'
import SearchBar from "./ui/SearchBar";
import UserMenu from "./ui/UserMenu";
import Brand from "./ui/Brand";
import ArrowButton from "./ui/ArrowButton";

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
};

const FlowMap: FC<FlowMap> = props => {

    type OffsetSpring = {
        left: number,
        top: number,
    }
    type SpringType = {
        wheelOffset: number
    }

    const [springOffset, setSpringOffset] = useSpring((): OffsetSpring => ({left: 0, top: 0,}));
    const [wheelOffset, setWheelOffset] = useSpring(() => 0);


    const bind = useGesture({
        onDrag: ({offset: [x, y], vxvy: [vx]}) => {
            setSpringOffset({left: x, top: y});
            // return vx && ((dragOffset.current = -x))
        },
        onWheel: ({offset: [, y], vxvy: [, vy]}) => {
            if (vy) {
                //setSpringOffset({transform: ""});
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
    let indicesTo = props.flowItemConnectionData.map(c => props.flowItemData.findIndex((a) => c.to == a._id));

    console.log(indicesFrom, indicesTo);

    return <div {...bind()} className="FlowMap">
        <div className="top-bar"><Brand/>
            <SearchBar/>
            <UserMenu/></div>

        <ArrowButton direction={"Bottom"}/>
        <ArrowButton direction={"Left"}/>
        <ArrowButton direction={"Right"}/>

        <animated.div className={"FlowMap-inner"} style={springOffset}>
            {props.flowItemData.map((a, i) =>
                <FlowItem key={i} {...{...a, ...flowItemPositions[i]}}/>
            )}
            {props.flowItemConnectionData.map((a, i) =>
                <FlowItemConnection
                    {...a}
                    fromX={flowItemPositions[indicesFrom[i]].x}
                    toX={flowItemPositions[indicesTo[i]].x}
                    fromY={flowItemPositions[indicesFrom[i]].y}
                    toY={flowItemPositions[indicesTo[i]].y}
                />)}
        </animated.div>

    </div>;
};

export default FlowMap;
