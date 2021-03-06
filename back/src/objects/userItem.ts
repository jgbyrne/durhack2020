import {ApolloError, gql} from "apollo-server-express";
import {InputUserItem, Scalars, UserItem, UserItemResolvers} from "../generated/graphql";
import {IUser} from "./user";

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
`;

export type IUserItem = Omit<UserItem, "user" | "item"> & { user: Scalars["ID"], item: Scalars["ID"] };
export type IInputUserItem = InputUserItem;

export const userItemResolvers: UserItemResolvers = {
    user: async (userItem, _, {db}) =>
        await db.collection("users").findOne({_id: userItem.user}) ?? (() => {
            throw new ApolloError("Couldn't insert")
        })(),

    item: async (userItem, _, {db}) => {
        const url = `${process.env.CONTENT_SRV_URL}/item/${userItem.item}`;
        const request = await fetch(url);

        if (request.status === 200) {
            return await request.json();
        } else {
            throw new ApolloError("Failed to fetch for userItem");
        }
    },
}
