import {ApolloError, gql} from "apollo-server-express";
import {InputFlow, Scalars, UserFlow, UserFlowResolvers} from "../generated/graphql";


export const userFlowTypes = gql`

    input InputUserFlow {
        user: ID!
        flow: ID!
    }

    type UserFlow {
        _id: ID!
        user: User!
        flow: Flow!
    }
`;

export type IUserFlow = Omit<UserFlow, "user" | "flow"> & { user: Scalars["ID"], flow: Scalars["ID"] };
export type IInputUserFlow = InputFlow;

export const userFlowResolvers: UserFlowResolvers = {
    user: async (userFlow, _, {db}) =>
        await db.collection("users").findOne({_id: userFlow.user}) ?? (() => {
            throw new ApolloError("Couldn't insert")
        })(),
};
