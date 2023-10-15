export interface WorkspaceContent {
  getWorkspace: {
    workspace: {
      statuses: {
        id: string;
        type: string;
      }[];
    };
  };
}
