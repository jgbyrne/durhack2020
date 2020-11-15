import {ApolloServer} from "apollo-server-express";
import {ExpressContext} from "apollo-server-express/dist/ApolloServer";
import {Db, MongoClient} from "mongodb";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import {gqlSchema} from "./gqlScheme";
import {config} from "dotenv";

config()

const app = express();

app.use(cookieParser());
// app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.disable("x-powered-by");

if (!process.env.MONGO_URL) {
    throw new Error("env.MONGO_URL is undefined, please configure the environment variables");
}

if (!process.env.CONTENT_SRV_URL) {
    throw new Error("env.CONTENT_SRV_URL is undefined!");
}

if (!process.env.DB_NAME) {
    throw new Error("env.DB_NAME is undefined!");
}

const database = new MongoClient(process.env.MONGO_URL);

export type MongoContext = { db: Db }
export type GraphQLContext = ExpressContext & MongoContext

database.connect().then((client) => {
    console.log("Connected to MongoDB...");

    const db = client.db(process.env.DB_NAME);

    const apolloServer = new ApolloServer({
        schema: gqlSchema,
        context: async (context): Promise<GraphQLContext> => ({
            ...context,
            ...{db: db},
        }),
    });
    apolloServer.applyMiddleware({app, path: "/graphql"});

    if (!process.env.PORT) {
        console.warn("env.PORT is not defined, defaulting to 4000");
    }

    if (!process.env.CONTENT_SRV_URL) {
        console.error("env.CONTENT_SRV_URL is not defined!");
    }

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Starting server on port ${port}`);
    });
});
