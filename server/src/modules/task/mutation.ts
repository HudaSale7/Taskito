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
  workspaceId: string;
  statusId: string;
  todos: Todo[];
  usersId: string[];
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
};
