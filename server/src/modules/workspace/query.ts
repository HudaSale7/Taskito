import { checkAuthentication, checkForServerError } from "../../util/errorMessage";
import service from "./service";

export const workspaceQuery = {
  getWorkspace: async (_: any, args: { id: any }, contextValue: any) => {
    checkAuthentication(contextValue);
    const workspace = await service.getWorkspace(
      Number(args.id),
      contextValue.user.id
    );
    checkForServerError(workspace);
    return workspace;
  },
  getAllWorkspace: async (_: any, __: any, contextValue: any) => {
    checkAuthentication(contextValue);
    const workspaces = await service.getAllWorkspace(contextValue.user.id);
    checkForServerError(workspaces);
    return workspaces;
  },
};
