import {ApolloError, gql} from "apollo-server-express";
import {Flow, FlowResolvers, InputFlow, Scalars} from "../generated/graphql";
import {ObjectId} from "mongodb";

export const flowTypes = gql`

    scalar Date # transmitted as a ISO formatted string

    input InputFlow {

        name: String!
        description: String!

        owner: ID
        flowItems: [InputFlowItem!]! # first is the root
        flowItemConnections: [InputFlowItemConnection!]! # first is the root

    }

    type Flow {
        _id: ID!

        name: String
        description: String

        rootSize: Int!
        flowItems: [FlowItem!]! # in order
        flowItemConnections: [FlowItemConnection!]!

        owner: User

    }
`;

export type IFlow = Omit<Flow, "flowItemConnections" | "flowItem" | "owner"> & { owner: Scalars["ID"] };
export type IInputFlow = InputFlow;

export const flowResolvers: FlowResolvers = {

    flowItems: async (flow, _, {db}) =>
        await db.collection("flowItems").find({flow: flow._id}).toArray() ?? (() => {
            throw new ApolloError("Couldn't find FlowItem")
        })(),

    flowItemConnections: async (flow, _, {db}) =>
        await db.collection("flowItemConnections").find({flow: flow._id}).toArray() ?? (() => {
            throw new ApolloError("Couldn't find flowItemConnections")
        })(),

    owner: async (flow, _, {db}) =>
        await db.collection("users").findOne({_id: new ObjectId(flow.owner)}) ?? (() => {
            throw new ApolloError("Couldn't find Owner")
        })()

};
