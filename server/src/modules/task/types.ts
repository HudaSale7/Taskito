export const taskTypes = /* GraphQL */ `
  type Task {
    id: ID!
    title: String!
    priority: String!
    users: [UsersGetType]!
    todos: [Todo]!
  }
  type UsersGetType {
    user: User!
  }
  extend type Query {
    getTask(id: ID!): Task!
  }
  extend type Mutation {
    createTask(task: CreateTaskInput!): Task!
    deleteTask(id: ID!): Task!
    addUserToTask(taskId: ID!, userEmail: String!): Task!
    updateTask(taskId: ID!, task: CreateTaskInput!): Task!
  }
  input CreateTaskInput {
    title: String!
    priority: String!
    statusId: ID!
    todos: [TodosInput]
    users: [String]
  }
  input TodosInput {
    content: String
    completed: Boolean
  }
`;
