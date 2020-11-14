import {gql} from "apollo-server-express";

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

type IItemFlow = any // define in terms of gql types
type IInputItemFlow = any

export const flowItemResolvers = {}