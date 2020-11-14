import {gql} from "apollo-server-express";

export const userTypes = gql`

    input InputUser {
        name: String
    }


    type User {
        _id: ID!
        name: String!

        flows: [Flow!]!

    }

`

type IUser = any // define in terms of gql types
type IInputUser = any

export const userResolvers = {}