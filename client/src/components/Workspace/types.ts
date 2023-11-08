export interface WorkspaceContent {
  getWorkspace: {
    workspace: {
      title: string;
      statuses: {
        id: string;
        type: string;
        tasks: {
          id: string;
          priority: string;
          title: string;
          todos: {
            completed: boolean;
          }[];
          users: {
            user: {
              id: string;
              name: string;
            };
          }[];
        }[];
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

export interface Task {
  title: string;
  priority: string;
  statusId: string;
  users: string[];
  todos: Todo[];
}

export interface DisplayTask {
  id: string;
  title: string;
  priority: "Urgent" | "High" | "Normal" | "Low";
  statusId: string;
  users: string[];
  todos: Todo[];
}

export interface TaskCreateResponse {
  createTask: {
    id: string;
    title: string;
    priority: string;
    users: {
      user: {
        id: string;
        email: string;
      };
    }[];
    todos: Todo[];
  };
}

export interface TaskGetResponse {
  getTask: {
    id: string;
    title: string;
    priority: string;
    users: {
      user: {
        id: string;
        email: string;
      };
    }[];
    todos: Todo[];
  };
}

export interface Todo {
  completed: boolean;
  content: string;
}

export const PriorityColors = {
  "Urgent": "#FF0000",
  "High": "#FFA500",
  "Normal": "#FFFF00",
  "Low": "#008000",
}

