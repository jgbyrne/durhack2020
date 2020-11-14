// @ts-ignore
import React, {FC} from "react";

type LayoutFlowItemConnection = {
    from: string,
    to: string,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
};

const FlowItemConnection: FC<LayoutFlowItemConnection> = props => {
    const lowerX = Math.min(props.fromX, props.toX);
    const upperX = Math.min(props.fromX, props.toX);
    const lowerY = Math.max(props.fromX, props.toX);
    const upperY = Math.max(props.fromX, props.toX);

    return <svg className="FlowItemConnection" style={{position: "absolute"}}>

    </svg>;
};
