import {gql} from "apollo-server-express";
import {FlowItemConnection, FlowItemConnectionResolvers, InputFlowItemConnection, Scalars} from "../generated/graphql";

export const flowItemConnectionTypes = gql`

    input InputFlowItemConnection {
        description: String!
        from: Int # index from 0
        to: Int # index from 0

    }

    type FlowItemConnection {
        _id: ID!
        flow: Flow

        description: String!

        from: FlowItem!
        to: FlowItem!

    }
`

export type IFlowItemConnection =
    Omit<FlowItemConnection, "from" | "to" | "flow">
    & { flow: Scalars["ID"], from: Scalars["ID"], to: Scalars["ID"] }
export type IInputFlowItemConnection = InputFlowItemConnection

export const flowItemConnectionResolvers: FlowItemConnectionResolvers = {}
