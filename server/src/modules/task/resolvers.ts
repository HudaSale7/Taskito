import {
  checkAuthentication,
  checkForServerError,
} from "../../util/errorMessage";
import service from "./service";

export const taskResolvers = {
  todos: async (parent: any) => {
    const todos = await service.getAllTodo(Number(parent.id));
    checkForServerError(todos);
    return todos;
  },
  users: async (parent: any) => {
    const users = await service.getAllUser(Number(parent.id));
    checkForServerError(users);
    return users;
  },
};
