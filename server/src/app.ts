import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
];

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }
    type Query {
    books: [Book]
  }
  `;
const resolvers = {
  Query: {
    books: () => books,
  },
};

const graphQlServer = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await graphQlServer.start();

app.use(cors());
app.use(express.json());

app.use("/graphql", () => console.log("graphql"));

httpServer.listen(4000, () => {
  console.log("🚀 Server is running on port 4000");
});
