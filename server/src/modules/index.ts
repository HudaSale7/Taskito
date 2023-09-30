import { userMutation, userTypes } from "./user/index.js";
import {
  workspaceQuery,
  workspaceMutation,
  workspaceTypes,
  workspaceResolvers,
} from "./workspace/index.js";
import { statusTypes, statusMutation } from "./status/index.js";
import { taskTypes, taskMutation, taskQuery } from "./task/index.js";

export const typeDefs = `#graphql
  type Query
  type Mutation
  ${userTypes}
  ${workspaceTypes}
  ${statusTypes}
  ${taskTypes}
`;

export const resolvers = {
  Query: {
    ...workspaceQuery,
    ...taskQuery,
  },
  Mutation: {
    ...userMutation,
    ...workspaceMutation,
    ...statusMutation,
    ...taskMutation,
  },
  Workspace: workspaceResolvers,
};
