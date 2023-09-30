import {
  checkAuthentication,
  checkForServerError,
} from "../../util/errorMessage";
import service from "./service";

export const taskQuery = {
  getTask: async (_: any, args: { id: any }, contextValue: any) => {
    checkAuthentication(contextValue);
    const task = await service.getTask(Number(args.id));
    checkForServerError(task);
    return task;
  },
};
