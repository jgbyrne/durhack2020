import React, {FC} from "react";
import "./FlowItemConnection.scss"

type LayoutFlowItemConnectionComponentProps = {
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
};

export const FlowItemConnectionComponent: FC<LayoutFlowItemConnectionComponentProps> = props => {
    const lowerX = Math.min(props.fromX, props.toX);
    const upperX = Math.max(props.fromX, props.toX);
    const lowerY = Math.min(props.fromY, props.toY);
    const upperY = Math.max(props.fromY, props.toY);

    const flipX = Math.sign(props.toX - props.fromX);
    const flipY = Math.sign(props.toY - props.fromY);

    const width = upperX - lowerX;
    const height = upperY - lowerY;


    return <svg
        className="FlowItemConnection"
        style={{
            left: `${lowerX + 50}px`,
            top: `${lowerY + 50}px`,
            width: `${width}px`,
            height: `${height}px`
        }}
        width={width}
        height={height}
    >
        <path
            d={`M ${(.5 + .5 * flipX) * width} ${(.5 + .5 * flipY) * height} 
            C ${(.5 + .35 * flipX) * width} ${(.5 - .35 * flipY) * height}, 
              ${(.5 - .35 * flipX) * width} ${(.5 + .35 * flipY) * height},
              ${(.5 - .5 * flipX) * width} ${(.5 - .5 * flipY) * height}`}

            fill="transparent"
        />

    </svg>;
};