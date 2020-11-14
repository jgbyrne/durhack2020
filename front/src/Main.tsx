import React, {FC, useState} from "react";
import {Scalars} from "./generated/graphql";
import FlowMap from "./components/FlowMap";

let flowItemData = [{
    name: "Tempest Sonata",
    description: "A more complex piece, ideal for the initiated",
    thumbnail: "https://picsum.photos/200/200",
    _id: "A",
}, {
    name: "Moonlight Sonata 1",
    description: "A gentle and melancholy introduction to Beethoven",
    thumbnail: "https://picsum.photos/200/200",
    _id: "B",
}, {
    name: "Moonlight Sonata 1",
    description: "A gentle and melancholy introduction to Beethoven",
    thumbnail: "https://picsum.photos/200/200",
    _id: "C",
}];

let flowItemConnectionData = [
    {_id: "0", from: "A", to: "B"},
    {_id: "1", from: "B", to: "C"},
    {_id: "2", from: "B", to: "D"}
];

export const Main: FC<unknown> = () => {

    const [currentFlowId, setCurrentFlowId] = useState<Scalars["ID"]>()

    return <div className="App">
        <FlowMap
            flowItemData={flowItemData}
            flowItemConnectionData={flowItemConnectionData}
        />
    </div>;
};