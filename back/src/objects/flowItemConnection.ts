import {gql} from "apollo-server-express";

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

type IFlowConnection = any // define in terms of gql types
type IInputFlowItemConnection = any

export const flowItemConnectionResolvers = {}
