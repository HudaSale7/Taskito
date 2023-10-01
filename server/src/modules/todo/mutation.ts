import {
  checkAuthentication,
  checkForServerError,
} from "../../util/errorMessage";
import service from "./service";

export const todoMutation = {
  createTodo: async (
    _: any,
    args: { todo: { content: string; taskId: string } },
    contextValue: any
  ) => {
    checkAuthentication(contextValue);
    const todo = await service.createTodo(
      Number(args.todo.taskId),
      args.todo.content
    );
    checkForServerError(todo);
    return todo;
  },

  markAsCompleted: async (_: any, args: { id: string }, contextValue: any) => {
    checkAuthentication(contextValue);
    const todo = await service.markAsCompleted(Number(args.id));
    checkForServerError(todo);
    return todo;
  },

  deleteTodo: async (_: any, args: { id: string }, contextValue: any) => {
    checkAuthentication(contextValue);
    const todo = await service.deleteTodo(Number(args.id));
    checkForServerError(todo);
    return todo;
  },
};
