import {gql} from "apollo-server-express";
import {InputUser, User, UserResolvers} from "../generated/graphql";

export const userTypes = gql`

    input InputUser {
        name: String!
    }


    type User {
        _id: ID!
        name: String!

        flows: [Flow!]!

    }

`

export type IUser = Omit<User, "flows"> // define in terms of gql types
export type IInputUser = InputUser

export const userResolvers: UserResolvers = {}