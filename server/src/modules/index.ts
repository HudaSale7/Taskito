import { userMutation, userTypes } from "./user/index.js";
import {
  workspaceQuery,
  workspaceMutation,
  workspaceTypes,
} from "./workspace/index.js";

export const typeDefs = `#graphql
  type Query
  type Mutation
  ${userTypes}
  ${workspaceTypes}
`;

export const resolvers = {
  Query: {
    ...workspaceQuery,
  },
  Mutation: {
    ...userMutation,
    ...workspaceMutation,
  },
};
