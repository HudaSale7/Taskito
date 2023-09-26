import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { typeDefs, resolvers } from "./modules/index.js";
import { getUser } from "./middleware/getUser.js";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);

const graphQlServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await graphQlServer.start();

app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  expressMiddleware(graphQlServer, {
    context: getUser,
  })
);

httpServer.listen(4000, () => {
  console.log("🚀 Server is running on port 4000");
});
