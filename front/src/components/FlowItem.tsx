import React, {FC} from 'react';
import './FlowItem.css';

type FlowItem = {
    description: string,
    thumbnail: string,
    name: string,
    x: number,
    y: number
}

const FlowItem: FC<FlowItem> = props => {
    return <div className="FlowItem" style={{left: props.x, top: props.y}}>
        <img src={props.thumbnail + "?" + Math.random().toString()}/>
        <div className="floaty-text">
            <div className="name">{props.name}</div>
            <div>{props.description}</div>
        </div>
    </div>;
};


export default FlowItem;