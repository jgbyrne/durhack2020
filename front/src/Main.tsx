import React, {FC, useContext, useState} from "react";
import {Scalars, useWholeFlowQuery} from "./generated/graphql";
import {FlowMap} from "./components/FlowMap";
import {LoginContext} from "./LoginContext";
import {LoginPanel} from "./LoginPanel";
import {LoadingSpinner} from "./LoadingSpinner";

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

    if (loading || error || !data) {
        return <div className="App">
            <LoadingSpinner/>
        </div>
    }

    if (!data) {
        return <div className="App">
            <LoadingSpinner/>
        </div>
    }

    return <div className="App">
        <FlowMap
            flow={data.flow}
        />
    </div>;
};