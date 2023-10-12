export const statusTypes = /* GraphQL */ `
  type Status {
    id: ID!
    type: String!
    tasks: [Task]!
  }
  extend type Mutation {
    createStatus(workspaceId: ID!, status: String!): Status!
    deleteStatus(statusId: ID!): Status!
  }
`;
