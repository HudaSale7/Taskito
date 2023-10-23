import {
  checkAuthentication,
  checkForServerError,
} from "../../util/errorMessage";
import service from "./service";

type Todo = {
  content: string;
  completed: boolean;
};

interface CreateTaskArgs {
  title: string;
  priority: string;
  statusId: string;
  todos: Todo[];
  users: string[];
}

export const taskMutation = {
  createTask: async (
    _: any,
    args: { task: CreateTaskArgs },
    contextValue: any
  ) => {
    checkAuthentication(contextValue);
    const task = await service.createTask(args.task);
    checkForServerError(task);
    return task;
  },

  deleteTask: async (_: any, args: { id: any }, contextValue: any) => {
    checkAuthentication(contextValue);
    const task = await service.deleteTask(Number(args.id));
    checkForServerError(task);
    return task;
  },

  addUserToTask: async (
    _: any,
    args: { taskId: string; userEmail: string },
    contextValue: any
  ) => {
    checkAuthentication(contextValue);
    const result = await service.addUserToTask(
      args.userEmail,
      Number(args.taskId)
    );
    checkForServerError(result);
    return result;
  },
};
