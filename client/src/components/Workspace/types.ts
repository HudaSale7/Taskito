export interface WorkspaceContent {
  getWorkspace: {
    workspace: {
      title: string;
      statuses: {
        id: string;
        type: string;
      }[];
      users: {
        user: {
          id: string;
          email: string;
          name: string;
        };
      }[];
    };
  };
}

export interface Status {
  createStatus: {
    id: string;
    type: string;
  };
}

export interface User {
  addUserToWorkspace: {
    id: string;
    email: string;
    name: string;
  };
}
