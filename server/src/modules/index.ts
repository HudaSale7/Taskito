import { userMutation, userTypes } from "./user/index.js";

export const typeDefs = `#graphql
  type Query
  type Mutation
  ${userTypes}
`;

export const resolvers = {
  Query: {},
  Mutation: {
    ...userMutation,
  },
};
