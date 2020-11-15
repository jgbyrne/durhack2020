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
    const upperX = Math.max(props.fromX, props.toX);
    const lowerY = Math.min(props.fromY, props.toY);
    const upperY = Math.max(props.fromY, props.toY);

    const flipX = Math.sign(props.toX - props.fromX);
    const flipY = Math.sign(props.toY - props.fromY);

    return <svg className="FlowItemConnection"
                style={{
                    position: "absolute",
                    zIndex: -1,
                    left: `${lowerX + 50}px`,
                    top: `${lowerY + 50}px`,
                    width: `${upperX - lowerX}px`,
                    height: `${upperY - lowerY}px`
                }}>
        <line x1={`${50 + 50 * flipX}%`} y1={`${50 + 50 * flipY}%`} x2={`${50 - 50 * flipX}%`}
              y2={`${50 - 50 * flipY}%`} style={{width: "100%", stroke: "rgb(128,205,255)", strokeWidth: "5"}}/>
    </svg>;
};

export default FlowItemConnection;