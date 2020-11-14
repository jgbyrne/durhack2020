import React, {FC, useMemo, useState} from 'react';
import './FlowMap.css';
import FlowItem from "./FlowItem";
import {springLayout} from "../logic/layout";

type FlowItem = {
    _id: string,
    description: string,
    thumbnail: string,
    name: string,
}

type FlowMap = {
    flowItemData: FlowItem[],
}


const FlowMap: FC<FlowMap> = props => {
    let [zoomLevel, setZoomLevel] = useState<number>(1.0);

    let flowItemPositions = useMemo(() =>
            springLayout(props.flowItemData.map(e => e._id), [
                    {from: "A", to: "B"},
                    {from: "B", to: "C"},
                    {from: "B", to: "D"}
                ]
            ),
        [props.flowItemData]
    );


    return <div
        className="FlowMap"
    >
        <div className={"FlowMap-inner"}>
            {props.flowItemData.map((a, i) =>
                <FlowItem key={i} {...{...a, ...flowItemPositions[i]}}/>
            )}
        </div>

    </div>;
};

export default FlowMap;
