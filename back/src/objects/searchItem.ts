import {ApolloError, gql} from "apollo-server-express";
import {SearchItem, SearchItemResolvers} from "../generated/graphql";
import fetch from "node-fetch";

export const searchItemTypes = gql`

    type SearchItem {
        id: ID!

        title: String!
        subtitle: String!

        type: ItemType!

        item: Item!

    }

`;

export type ISearchItem = SearchItem; // define in terms of gql types

export const searchItemResolvers: SearchItemResolvers = {
    item: async searchItem => {

        const request = await fetch(`${process.env.CONTENT_SRV_URL}/item/${searchItem.id}`);

        if (request.status === 200) {
            return await request.json();
        } else {
            throw new ApolloError("Failed to fetch");
        }
    }
};
