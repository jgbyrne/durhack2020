import React, {FC} from "react";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {LoginProvider} from "./LoginContext";

export const AppWrapper: FC<unknown> = props => {

    const client = new ApolloClient<object>({
        cache: new InMemoryCache({}),
        link: createHttpLink({
            uri: "localhost:4000/graphql"
        }),
    });

    return <ApolloProvider client={client}>
        <LoginProvider>
            {props.children}
        </LoginProvider>
    </ApolloProvider>

}