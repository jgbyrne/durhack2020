import React, {FC} from 'react';
import './FlowItem.css';
import {animated} from "react-spring";

type FlowItemProps = {
    title: string,
    description: string,
    thumbnail: string,

    left: number,
    top: number,

    onClickAdd: () => void
}

export const FlowItemComponent: FC<FlowItemProps> = props =>
    <animated.div className="FlowItem" style={{left: props.left, top: props.top}}>
        <div className="edit-button" onClick={props.onClickAdd}/>
        <img src={props.thumbnail}/>
        <div className="floaty-text">
            <div className="name">{props.title}</div>
            <div className="description">{props.description}</div>
        </div>
    </animated.div>;
