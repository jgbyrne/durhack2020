import {ApolloServer} from "apollo-server-express";
import {ExpressContext} from "apollo-server-express/dist/ApolloServer";
import compression from "compression";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import {gqlSchema} from "./gqlScheme";


const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === "development")
    app.use(morgan("dev"));

app.disable("x-powered-by");

const database = null;

if (!process.env.MONGO_URL) {
    throw new Error("env.MONGO_URL is undefined, please configure the environment variables");
}
export type MongoContext = { mongo: any } //todo

export type GraphQLContext = ExpressContext & MongoContext
const apolloServer = new ApolloServer({
    schema: gqlSchema,
    context: async (context): Promise<GraphQLContext> => ({
        ...context,
        ...{mongo: await database},
    }),
});
apolloServer.applyMiddleware({app, path: "/graphql"});

if (!process.env.PORT) {
    console.warn("env.PORT is not defined, defaulting to 4000");
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});
