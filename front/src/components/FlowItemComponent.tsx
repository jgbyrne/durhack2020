import React, {FC} from 'react';
import './FlowItem.css';

type FlowItemProps = {
    title: string,
    description: string,
    thumbnail: string,

    x: number,
    y: number,
}

export const FlowItemComponent: FC<FlowItemProps> = props =>
    <div className="FlowItem" style={{left: props.x, top: props.y}}>
        <img src={props.thumbnail + "?" + Math.random().toString()}/>
        <div className="floaty-text">
            <div className="name">{props.title}</div>
            <div className="description">{props.description}</div>
        </div>
    </div>;
