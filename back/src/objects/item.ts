import {gql} from "apollo-server-express";

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
        
        url: String!
        type: ItemType!
        
        thumbnail: String!
        image: String!

        flowItems: [FlowItem!]!
        flowItem(flow: ID): FlowItem

    }


    enum ItemType {
        Album
        #    Song
        #    YouTube
    }

`

type IItem = any // define in terms of gql types
type IInputItem = any

export const itemResolvers = {}