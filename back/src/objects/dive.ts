import {gql} from "apollo-server-express";

export const diveTypes = gql`

    input InputDive { # Othersie InputUserFlow

        user: ID!
        flow: ID!

        createdAt: Date!

    }

    type Dive { # Othersie UserFlow
        _id: ID!
        user: User!
        flow: Flow!

        createdAt: Date!

    }
`

type IDive = any // define in terms of gql types
type IInputDive = any

export const diveResolvers = {}