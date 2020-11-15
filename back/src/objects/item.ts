import {ApolloError, gql} from "apollo-server-express";
import {InputItem, Item, ItemResolvers} from "../generated/graphql";

export const itemTypes = gql`

    input InputItem {

        name: String!
        url: String!
        type: ItemType!

    }

    type Item {
        _id: ID!

        title: String!
        subtitle: String!

        url: String
        type: ItemType!

        thumbnail: String!
        image: String!

        flowItems: [FlowItem!]!
        flowItem(flow: ID): FlowItem

    }


    enum ItemType {
        Album
        YouTube
        #    Song
    }

`;

export type IItem = Omit<Item, "flowItem" | "flowItems">; // define in terms of gql types
export type IInputItem = InputItem;

export const itemResolvers: ItemResolvers = {

    flowItems: async (item, _, {db}) =>
        await db.collection("flowItems").find({item: item._id}).toArray() ?? (() => {
            throw new ApolloError("Couldn't find to Item")
        })(),

    flowItem: async (item, {flow}, {db}) =>
        await db.collection("flowItems").findOne({item: item._id, flow}) ?? (() => {
            throw new ApolloError("Couldn't find to Item")
        })(),

};