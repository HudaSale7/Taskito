export const workspaceTypes = /* GraphQL */ `
  type Workspace {
    id: ID!
    title: String
  }
  type WorkspaceAccessType {
    workspace: Workspace
    accessType: String
  }
  type WorkspacesGetType {
    workspace: Workspace
  }
  extend type Query {
    getWorkspace(id: ID!): WorkspaceAccessType!
    getAllWorkspace: [WorkspacesGetType]!
  }
  extend type Mutation {
    createWorkspace(workspace: WorkspaceCreateInput!): Workspace!
    deleteWorkspace(id: ID!): Workspace!
  }
  input WorkspaceCreateInput {
    title: String!
  }
`;
