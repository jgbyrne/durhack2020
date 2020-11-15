// @ts-ignore
import React, {FC} from "react";
import "./ArrowButton.css";

type Direction = "Left" | "Right" | "Top" | "Bottom";

type ArrowButtonProps = {
    direction: Direction
}

const ArrowButton: FC<ArrowButtonProps> = props => {
    return <div className="ArrowButton" style={{["margin" + props.direction]: "10px"}}>
    </div>
};

export default ArrowButton;