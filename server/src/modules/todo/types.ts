export const todoTypes = /* GraphQL */ `
  type Todo {
    id: ID!
    content: String!
    completed: Boolean
  }
  extend type Mutation {
    createTodo(todo: createTodoInput!): Todo!
    markAsCompleted(id: ID!): Todo!
    deleteTodo(id: ID!): Todo!
  }
  input createTodoInput {
    content: String!
    taskId: ID!
  }
`;