import { userMutation, userTypes } from "./user/index.js";
import {
  workspaceQuery,
  workspaceMutation,
  workspaceTypes,
  workspaceResolvers,
} from "./workspace/index.js";
import { statusTypes, statusMutation } from "./status/index.js";
import { taskTypes, taskMutation, taskQuery, taskResolvers} from "./task/index.js";
import { todoTypes, todoMutation } from "./todo/index.js";

export const typeDefs = `#graphql
  type Query
  type Mutation
  ${userTypes}
  ${workspaceTypes}
  ${statusTypes}
  ${taskTypes}
  ${todoTypes}
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
    ...todoMutation,
  },
  Workspace: workspaceResolvers,
  Task: taskResolvers,
};
