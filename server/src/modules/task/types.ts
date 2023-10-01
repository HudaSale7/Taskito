export const taskTypes = /* GraphQL */ `
  type Task {
    id: ID!
    title: String!
    priority: String!
    users: [UsersGetType]!
    todos: [TodosGetType]!
  }
  type UsersGetType {
    user: User!
  }
  type TodosGetType {
    content: String!
    completed: Boolean!
  }
  extend type Query {
    getTask(id: ID!): Task!
  }
  extend type Mutation {
    createTask(task: CreateTaskInput!): Task!
    deleteTask(id: ID!): Task!
    addUserToTask(taskId: ID!, userEmail: String!): Task!
  }
  input CreateTaskInput {
    title: String!
    priority: String!
    workspaceId: ID!
    statusId: ID!
    todos: [TodosInput]
    usersId: [ID]
  }
  input TodosInput {
    content: String
    completed: Boolean
  }
`;
