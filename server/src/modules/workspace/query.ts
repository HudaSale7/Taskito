import { handleError } from "../../util/errorHandler";
import service from "./service";

export const workspaceQuery = {
  getWorkspace: async (_: any, args: { id: any }, contextValue: any) => {
    if (!contextValue.user) {
      handleError({ message: "Not Authenticated", code: 422 });
    }
    const workspace = await service.getWorkspace(
      Number(args.id),
      contextValue.user.id
    );
    if (!workspace) {
      handleError({ message: "server error", code: 500 });
    }
    return workspace;
  },
  getAllWorkspace: async (_: any, __: any, contextValue: any) => {
    if (!contextValue.user) {
      handleError({ message: "Not Authenticated", code: 422 });
    }
    const workspaces = await service.getAllWorkspace(contextValue.user.id);
    if (!workspaces) {
      handleError({ message: "server error", code: 500 });
    }
    console.log(...workspaces);
    return [...workspaces];
  },
};
