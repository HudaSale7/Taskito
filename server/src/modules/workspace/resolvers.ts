import { checkForServerError } from "../../util/errorMessage";
import service from "./service";

export const workspaceResolvers = {
  users: async (parent: any) => {
    const users = await service.getAllUser(Number(parent.id));
    checkForServerError(users);
    return users;
  },
  statuses: async (parent: any) => {
    const statuses = await service.getAllStatus(Number(parent.id));
    checkForServerError(statuses);
    return statuses;
  },
};
