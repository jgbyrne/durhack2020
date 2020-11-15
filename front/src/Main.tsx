import React, {FC, useContext, useState} from "react";
import {Scalars, useWholeFlowQuery} from "./generated/graphql";
import FlowMap from "./components/FlowMap";
import {LoginContext} from "./LoginContext";
import {LoginPanel} from "./LoginPanel";
import {LoadingSpinner} from "./LoadingSpinner";

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
    {_id: "2", from: "C", to: "A"}
];

export const Main: FC<unknown> = () => {

    const [currentFlowId, setCurrentFlowId] = useState<Scalars["ID"]>()

    const login = useContext(LoginContext)

    const {data, error, loading} = useWholeFlowQuery(currentFlowId ? {
        variables: {_id: currentFlowId}
    } : {
        skip: true
    })

    if (!login?.user) {
        return <div className="App">
            <LoginPanel/>
        </div>
    }

    if (loading) {
        return <div className="App">
            <LoadingSpinner/>
        </div>
    }

    return <div className="App">
        <FlowMap
            flowItemData={flowItemData}
            flowItemConnectionData={flowItemConnectionData}
        />
    </div>;
};