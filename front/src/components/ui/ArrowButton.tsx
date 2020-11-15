// @ts-ignore
import React, {FC} from "react";
import "./ArrowButton.css";
import arrowIcon from "./img/arrow-icon.svg";

type Direction = "Left" | "Right" | "Top" | "Bottom";

type ArrowButtonProps = {
    direction: Direction
}

const ArrowButton: FC<ArrowButtonProps> = props => {
    return <div className={"ArrowButton " + props.direction} style={{["margin" + props.direction]: "10px"}}>
        <img src={arrowIcon}/>
    </div>
};

export default ArrowButton;