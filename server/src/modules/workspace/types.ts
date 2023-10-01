export const workspaceTypes = /* GraphQL */ `
  type Workspace {
    id: ID!
    title: String
    users: [UsersGetType]!
    tasks: [Task]!
    statuses: [StatusGetType]!
  }
  type WorkspaceAccessType {
    workspace: Workspace
    accessType: String
  }
  type WorkspacesGetType {
    workspace: Workspace
  }
  type StatusGetType {
    status: Status
  }
  type UsersGetType {
    user: User
  }
  extend type Query {
    getWorkspace(id: ID!): WorkspaceAccessType!
    getAllWorkspace: [WorkspacesGetType]!
  }
  extend type Mutation {
    createWorkspace(workspace: WorkspaceCreateInput!): Workspace!
    deleteWorkspace(id: ID!): Workspace!
    addUserToWorkspace(userEmail: String!, workspaceId: ID!): Workspace!
  }
  input WorkspaceCreateInput {
    title: String!
  }
`;
