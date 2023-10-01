import {
  checkAuthentication,
  checkForServerError,
} from "../../util/errorMessage";
import service from "./service";

export const statusMutation = {
  createStatus: async (
    _: any,
    args: { workspaceId: string; status: string },
    contextValue: any
  ) => {
    checkAuthentication(contextValue);
    const status = await service.createStatus(Number(args.workspaceId), {
      type: args.status,
    });
    checkForServerError(status);
    return status;
  },
  
  deleteStatus: async (
    _: any,
    args: { statusId: string; workspaceId: string },
    contextValue: any
  ) => {
    checkAuthentication(contextValue);
    const status = await service.deleteStatus(
      Number(args.statusId),
      Number(args.workspaceId)
    );
    checkForServerError(status);
    return status;
  },
};
