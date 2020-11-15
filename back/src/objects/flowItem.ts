import {ApolloError, gql} from "apollo-server-express";
import {FlowItem, FlowItemResolvers, InputFlowItem, Scalars} from "../generated/graphql";

export const flowItemTypes = gql`

    input InputFlowItem {
        flow: ID
        item: ID
    }

    type FlowItem {
        _id: String!

        flow: Flow!
        item: Item!

        description: String!

    }
`;

export type IFlowItem = Omit<FlowItem, "flow" | "item"> & { flow: Scalars["ID"], item: Scalars["ID"] };
export type IInputFlowItem = InputFlowItem;

export const flowItemResolvers: FlowItemResolvers = {
    item: async (flowItem, _, {db}) => {
        const url = `${process.env.CONTENT_SRV_URL}/item/${flowItem.item}`;
        const request = await fetch(url)

        if (request.status === 200) {
            return await request.json();
        } else {
            throw new ApolloError("Failed to fetch for flowItem");
        }
    },
};
