import {ApolloError, gql} from "apollo-server-express";
import {Flow, FlowResolvers, InputFlow, Scalars} from "../generated/graphql";

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
        flowConnections: [FlowItemConnection!]!

        owner: User

    }
`;

export type IFlow = Omit<Flow, "flowConnections" | "flowItem" | "owner"> & { owner: Scalars["ID"] };
export type IInputFlow = InputFlow;

export const flowResolvers: FlowResolvers = {

    flowItems: async (flow, _, {db}) =>
        await db.collection("flowItems").find({flow: flow._id}).toArray() ?? (() => {
            throw new ApolloError("Couldn't find FlowItem")
        })(),

    flowConnections: async (flow, _, {db}) =>
        await db.collection("flowConnections").find({flow: flow._id}).toArray() ?? (() => {
            throw new ApolloError("Couldn't find FlowConnection")
        })(),

    owner: async (flow, _, {db}) =>
        await db.collection("user").findOne({_id: flow.owner}) ?? (() => {
            throw new ApolloError("Couldn't find Owner")
        })(),
};
