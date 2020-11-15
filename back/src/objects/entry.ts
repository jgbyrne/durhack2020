import {ApolloError, gql} from "apollo-server-express";
import {MutationResolvers, QueryResolvers} from "../generated/graphql";
import fetch from "node-fetch"

export const entryTypes = gql`

    type Query {
        flow(_id: ID!): Flow!
        user(_id: ID!): User!
        item(_id: ID!): Item!

        searchItem(name: String!, itemType: ItemType!): [SearchItem!]!
    }

    type Mutation {

        createDive(user: ID!, flow: ID!): Dive!
        createFlow(flow: InputFlow!): Flow! # this also creates FlowItems and FlowConnections
        createItem(item: InputItem!): Item!
        createUser(user: InputUser): User!
        createUserItem(user: InputUser): User!

    }
`;

export const queryResolver: QueryResolvers = {
    item: async (_, {_id}) => {
        const url = `${process.env.CONTENT_SRV_URL}/item/${_id}`;
        const request = await fetch(url)

        if (request.status === 200) {
            return await request.json()
        } else {
            throw new ApolloError("Failed to fetch")
        }
    },
    searchItem: async (_, {name, itemType}) => {
        const url = `${process.env.CONTENT_SRV_URL}/search/${itemType.toLowerCase()}?q=${name}`;
        const request = await fetch(url)

        if (request.status === 200) {
            return await request.json()
        } else {
            throw new ApolloError("Failed to search")
        }
    },
    // user: async (_, {_id}, {db}) => {
    // 	return await db.collection("users").findOne({_id});
    // }
};

export const mutationResolver: MutationResolvers = {
    // createUser: async (_, {user}, {db}) => {
    //     return await db.collection("users").insertOne({name: user?.name});
    // }
};


