import { checkAuthentication, checkForServerError } from "../../util/errorMessage";
import service from "./service.js";

export const workspaceMutation = {
  createWorkspace: async (
    _: any,
    args: { workspace: { title: string } },
    contextValue: any
  ) => {
    checkAuthentication(contextValue);
    const workspace = await service.createWorkspace(
      args.workspace,
      contextValue.user.id
    );
    checkForServerError(workspace);
    return workspace;
  },

  deleteWorkspace: async (_: any, args: { id: any }, contextValue: any) => {
    checkAuthentication(contextValue);
    const workspace = await service.deleteWorkspace(
      Number(args.id),
      contextValue.user.id
    );
    checkForServerError(workspace);
    return workspace;
  },

  addUserToWorkspace: async (
    _: any,
    args: { userEmail: string; workspaceId: any },
    contextValue: any
  ) => {
    checkAuthentication(contextValue);
    const result = await service.addUser(
      args.userEmail,
      Number(args.workspaceId)
    );
    checkForServerError(result);
    return result;
  },
};
