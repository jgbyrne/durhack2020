import {gql} from "apollo-server-express";

export const userItemTypes = gql`

    input InputUserItem {

        user: ID!
        item: ID!

        createdAt: Date!

    }

    type UserItem {
        _id: ID!
        user: User!
        item: Item!

        createdAt: Date!

    }
`

type IUserItem = any // define in terms of gql types
type IInputUserItem = any

export const userItemResolvers = {}