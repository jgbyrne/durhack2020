import {gql} from "apollo-server-express";

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
        _id: ID

        name: String
        description: String

        rootSize: Int!
        flowItems: [FlowItem!]! # in order
        flowConnections: [FlowItemConnection!]!

        owner: User

    }
`

type IFlow = any // define in terms of gql types
type IInputFlow = any

export const flowResolvers = {}