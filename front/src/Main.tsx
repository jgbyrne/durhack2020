import React, {FC, useContext, useState} from "react";
import {Scalars, useWholeFlowQuery} from "./generated/graphql";
import {FlowMap} from "./components/FlowMap";
import {LoginContext} from "./LoginContext";
import {LoginPanel} from "./LoginPanel";


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

    // if (loading || error || !data) {
    //     return <div className="App">
    //         <LoadingSpinner/>
    //     </div>
    // }

    // if (!data) {
    //     return <div className="App">
    //         <LoadingSpinner/>
    //     </div>
    // }

    return <div className="App">
        <FlowMap
            flow={data?.flow ?? {
                _id: "",
                name: "lol",
                description: "lols",
                rootSize: 3,
                owner: {
                    name: "Big Boi"
                },
                flowItems: [
                    {
                        _id: "A",
                        description: "A more complex piece, ideal for the initiated",
                        item: {
                            _id: "A",
                            title: "Moonlight Sonata 1",
                            image: "https://picsum.photos/200/200",
                            thumbnail: "https://picsum.photos/200/200",
                            url: "https://picsum.photos/200/200",
                            subtitle: "lmao, good music",
                        },
                    },
                    {
                        _id: "B",
                        description: "A gentle and melancholy introduction to Beethoven",
                        item: {
                            _id: "B",
                            url: "https://picsum.photos/200/200",
                            title: "Moonlight Sonata 1",
                            subtitle: "A gentle and melancholy introduction to Beethoven",
                            thumbnail: "https://picsum.photos/200/200",
                            image: "https://picsum.photos/200/200",
                        },
                    }, {
                        _id: "C",
                        description: "A gentle and melancholy introduction to Beethoven",
                        item: {
                            _id: "C",
                            url: "https://picsum.photos/200/200",
                            title: "Moonlight Sonata 1",
                            subtitle: "A gentle and melancholy introduction to Beethoven",
                            thumbnail: "https://picsum.photos/200/200",
                            image: "https://picsum.photos/200/200",
                        },
                    }

                ],
                flowConnections: [
                    {_id: "0", from: {_id: "A"}, to: {_id: "B"}},
                    {_id: "1", from: {_id: "B"}, to: {_id: "C"}},
                    {_id: "2", from: {_id: "C"}, to: {_id: "A"}}
                ]
            }}
        />
    </div>;
};