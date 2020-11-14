import {gql} from "apollo-server-express";
import {Dive, DiveResolvers, InputDive, Scalars} from "../generated/graphql";

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

export type IDive = Omit<Dive, "user" | "flow"> & { user: Scalars["ID"], flow: Scalars["ID"] }
export type IInputDive = InputDive

export const diveResolvers: DiveResolvers = {}