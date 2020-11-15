import React, {FC} from 'react';
import './FlowItem.css';

type LayoutFlowItem = {
    description: string,
    thumbnail: string,
    name: string,
    x: number,
    y: number,
}

const FlowItem: FC<LayoutFlowItem> = props => {
    return <div className="FlowItem" style={{left: props.x, top: props.y}}>
        <img src={props.thumbnail + "?" + Math.random().toString()}/>
        <div className="floaty-text">
            <div className="name">{props.name}</div>
            <div className="description">{props.description}</div>
        </div>
    </div>;
};


export default FlowItem;