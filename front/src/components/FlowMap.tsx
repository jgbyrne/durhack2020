import {FlowItemComponent} from "./FlowItemComponent"
import React, {FC, useMemo} from 'react';
import './FlowMap.css';
import {springLayout} from "../logic/layout";
import {useGesture} from 'react-use-gesture'
import {animated, useSpring} from 'react-spring'
import SearchBar from "./ui/SearchBar";
import UserMenu from "./ui/UserMenu";
import Brand from "./ui/Brand";
import ArrowButton from "./ui/ArrowButton";
import {WholeFlowQuery} from "../generated/graphql";
import {FlowItemConnectionComponent} from "./FlowItemConnection";

type FlowItemConnection = {
    _id: string,
    from: string,
    to: string
}

type FlowMapProps = & {
    flow: WholeFlowQuery["flow"]
    // flowItemData: FlowItem[],
    // flowItemConnectionData: FlowItemConnection[],
};


type OffsetSpring = {
    left: number,
    top: number,
}

export const FlowMap: FC<FlowMapProps> = props => {

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

    const flowItemPositions = useMemo(() =>
            springLayout(
                props.flow.flowItems.map(e => e._id),
                props.flow.flowConnections.map(c => ({
                    from: c.from._id,
                    to: c.to._id
                }))
            ),
        [props.flow]
    );

    let indicesFrom = props.flow.flowConnections.map(c => props.flow.flowItems.findIndex(a => c.from._id == a._id));
    let indicesTo = props.flow.flowConnections.map(c => props.flow.flowItems.findIndex(a => c.to._id == a._id));

    return <div {...bind()} className="FlowMap">
        <div className="top-bar"><Brand/>
            <SearchBar/>
            <UserMenu/></div>

        <ArrowButton direction={"Bottom"}/>
        <ArrowButton direction={"Left"}/>
        <ArrowButton direction={"Right"}/>

        {props.flow.name}
        {props.flow.description}
        {props.flow.owner?.name}
        {props.flow}

        <animated.div className={"FlowMap-inner"} style={springOffset}>
            {props.flow.flowItems.map((item, i) =>
                <FlowItemComponent
                    key={i}
                    {...item}
                    {...item.item}
                    {...flowItemPositions[i]}
                />
            )}
            {props.flow.flowConnections.map((a, i) =>
                <FlowItemConnectionComponent
                    fromX={flowItemPositions[indicesFrom[i]].x}
                    toX={flowItemPositions[indicesTo[i]].x}
                    fromY={flowItemPositions[indicesFrom[i]].y}
                    toY={flowItemPositions[indicesTo[i]].y}
                />)}
        </animated.div>

    </div>;
};
