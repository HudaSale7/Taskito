import { checkForServerError } from "../../util/errorMessage";
import service from "./service";

export const workspaceResolvers = {
  users: async (parent: any) => {
    const users = await service.getAllUser(Number(parent.id));
    checkForServerError(users);
    return users;
  },
  tasks: async (parent: any) => {
    const tasks = await service.gatAllTask(Number(parent.id));
    checkForServerError(tasks);
    return tasks;
  },
  statuses: async (parent: any) => {
    const statuses = await service.getAllStatus(Number(parent.id));
    checkForServerError(statuses);
    return statuses;
  },
};
