import {gql} from "apollo-server-express";
import {FlowItem, FlowItemResolvers, InputFlowItem, Scalars} from "../generated/graphql";

export const flowItemTypes = gql`

    input InputFlowItem {
        flow: ID
        item: ID
    }

    type FlowItem {
        _id: String!

        flow: Flow!
        item: Item!

        description: String!

    }
`

export type IFlowItem = Omit<FlowItem, "flow" | "item"> & { flow: Scalars["ID"], item: Scalars["ID"] }
export type IInputFlowItem = InputFlowItem

export const flowItemResolvers: FlowItemResolvers = {}