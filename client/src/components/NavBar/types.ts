export interface Workspace {
  title: string;
}

export interface RespondedWorkspace {
  createWorkspace: {
    title: string;
    id: string;
  };
}
