import {ApolloError, gql} from "apollo-server-express";
import {MutationResolvers, QueryResolvers} from "../generated/graphql";
import fetch from "node-fetch"
import {IUser} from "./user";

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
        createUser(user: InputUser!): User!
        createUserItem(user: InputUser!, item: Item!): UserItem!

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
    user: async (_, {_id}, {db}) =>
        await db.collection("users").findOne({_id}) ?? (() => {
            throw new ApolloError("Couldn't find")
        })(),
    flow: async (_, {_id}, {db}) =>
        await db.collection("flows").findOne({_id}) ?? (() => {
            throw new ApolloError("Couldn't find Flow")
        })(),

};

export const mutationResolver: MutationResolvers = {
    createDive: async (_, {user, flow}, {db}) =>
        (await db.collection("dives").insertOne({...user, createdAt: new Date().toISOString()}))?.ops[0] ?? (() => {
            throw new ApolloError("Couldn't insert Dive")
        })(),

    createUser: async (_, {user}, {db}) =>
        (await db.collection("users").insertOne({user}))?.ops[0] ?? (() => {
            throw new ApolloError("Couldn't insert User")
        })(),

    createFlow: async (_, {flow}, {db}) => {
	const items = db.collection("flowItems").insert(flow.flowItems);
	const conns = db.collection("flowItemCollections").insert(flow.flowConnections);
	const result = [await items, await conns];
	return await db.collection("flows").insertOne(flow)?.ops[0] ?? (() => {
            throw new ApolloError("Couldn't insert")
        })();
    }

    createUserItem: async (_, {user, item}, {db}) =>
        (await db.collection("userItems").insertOne({user, item}))?.ops[0] ?? (() => {
            throw new ApolloError("Couldn't insert User Item")
        })(),

   };
