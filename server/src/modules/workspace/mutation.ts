import { handleError } from "../../util/errorHandler";
import service from "./service.js";

export const workspaceMutation = {
  createWorkspace: async (
    _: any,
    args: { workspace: { title: string } },
    contextValue: any
  ) => {
    if (!contextValue.user) {
      handleError({ message: "Not Authenticated", code: 422 });
    }
    const workspace = await service.createWorkspace(
      args.workspace,
      contextValue.user.id
    );
    if (!workspace) {
      handleError({ message: "server error", code: 500 });
    }
    return workspace.workspace;
  },

  deleteWorkspace: async (_: any, args: { id: any }, contextValue: any) => {
    if (!contextValue.user) {
      handleError({ message: "Not Authenticated", code: 422 });
    }
    const workspace = await service.deleteWorkspace(
      Number(args.id),
      contextValue.user.id
    );
    if (!workspace) {
      handleError({ message: "server error", code: 500 });
    }
    return workspace.workspace;
  },
};
