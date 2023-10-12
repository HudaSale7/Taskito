import { checkForServerError } from "../../util/errorMessage";
import service from "./service";

export const statusResolvers = {
  tasks: async (parent: any) => {
    const tasks = await service.getAllTask(Number(parent.id));
    checkForServerError(tasks);
    return tasks;
  }
}