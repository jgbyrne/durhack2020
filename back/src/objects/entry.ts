import {gql} from "apollo-server-express";
import {MutationResolvers, QueryResolvers} from "../generated/graphql";

export const entryTypes = gql`

    type Query {
        flow(_id: ID!): Flow!
        user(_id: ID!): User!
        item(_id: ID!): Item!

        searchItem(name: String!): [Item!]!

    }

    type Mutation {

        createDive(user: ID!, flow: ID!): Dive!
        createFlow(flow: InputFlow!): Flow! # this also creates FlowItems and FlowConnections
        createItem(item: InputItem!): Item!
        createUser(user: InputUser): User!
        createUserItem(user: InputUser): User!

    }
`

export const queryResolver: QueryResolvers = {}
export const mutationResolver: MutationResolvers = {}
