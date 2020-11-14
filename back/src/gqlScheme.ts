import {DocumentNode, GraphQLScalarType} from "graphql";
import {GraphQLContext} from "./index";
import {makeExecutableSchema} from "graphql-tools";
import {diveResolvers, diveTypes} from "./objects/dive";
import {entryTypes, mutationResolver, queryResolver} from "./objects/entry";
import {flowResolvers, flowTypes} from "./objects/flow";
import {flowItemResolvers, flowItemTypes} from "./objects/flowItem";
import {flowItemConnectionResolvers, flowItemConnectionTypes} from "./objects/flowItemConnection";
import {itemResolvers, itemTypes} from "./objects/item";
import {userResolvers, userTypes} from "./objects/user";
import {userItemResolvers, userItemTypes} from "./objects/userItem";

type Resolvers = any;
type IResolvers = any;

const typeDefs: DocumentNode[] = [
    diveTypes,
    flowTypes,
    flowItemTypes,
    flowItemConnectionTypes,
    itemTypes,
    userTypes,
    userItemTypes,
    entryTypes,
];

const resolvers: Resolvers = {
    Dive: diveResolvers,
    Flow: flowResolvers,
    FlowItem: flowItemResolvers,
    FlowItemConnection: flowItemConnectionResolvers,
    Item: itemResolvers,
    User: userResolvers,
    UserItem: userItemResolvers,

    Query: queryResolver,
    Mutation: mutationResolver,

    Date: new GraphQLScalarType({
        name: "Date",
        description: "A timestamp",
        parseValue(value) {
            return value;
        },
        serialize(value) {
            return value;
        },
        parseLiteral(ast) {
            if (ast.kind === "IntValue") {
                return ast.value;
            }
            return null;
        },
    }),
};

export const gqlSchema = makeExecutableSchema<GraphQLContext>({
    typeDefs: typeDefs,
    resolvers: resolvers as IResolvers,
});
