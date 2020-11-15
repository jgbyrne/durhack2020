import {gql} from "apollo-server-express";
import {InputUserItem, Scalars, UserItem, UserItemResolvers} from "../generated/graphql";

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

export type IUserItem = Omit<UserItem, "user" | "item"> & { user: Scalars["ID"], item: Scalars["ID"] }
export type IInputUserItem = InputUserItem

export const userItemResolvers: UserItemResolvers = {
    user: async (userItem, _, {mongo}) => {
	mongo.db("app_db").collection("users")
	     .findOne({_id : userItem.user}).then(result => {
	        return result;
	     })
	     .catch(err => _);
    },
}
