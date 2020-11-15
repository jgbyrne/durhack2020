import {gql} from "apollo-server-express";
import {Dive, DiveResolvers, InputDive, Scalars} from "../generated/graphql";
import {IUser} from "./user";

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
`;

export type IDive = Omit<Dive, "user" | "flow"> & { user: Scalars["ID"], flow: Scalars["ID"] };
export type IInputDive = InputDive;

export const diveResolvers: DiveResolvers = {
    // user: async (dive, _, {db}) => {
    //     return await db.collection("users").findOne({_id: dive.user});
    // },
}
