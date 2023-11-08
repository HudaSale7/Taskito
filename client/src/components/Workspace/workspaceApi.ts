import request, { gql } from "graphql-request";
import {
  Status,
  Task,
  TaskCreateResponse,
  TaskGetResponse,
  User,
  WorkspaceContent,
} from "./types";

export const getWorkspace = async (workspaceId: string) => {
  const query = gql`
    query getWorkspaceQuery($getWorkspaceId: ID!) {
      getWorkspace(id: $getWorkspaceId) {
        workspace {
          id
          title
          statuses {
            id
            type
            tasks {
              id
              priority
              title
              todos {
                completed
              }
              users {
                user {
                  id
                  name
                }
              }
            }
          }
          users {
            user {
              id
              email
              name
            }
          }
        }
      }
    }
  `;

  const variables = {
    getWorkspaceId: workspaceId,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  const data: WorkspaceContent = await request(
    import.meta.env.VITE_API as string,
    query,
    variables,
    headers
  );

  return data;
};

export const createStatus = async (args: {
  workspaceId: string;
  type: string;
}) => {
  const mutation = gql`
    mutation createStatus($workspaceId: ID!, $status: String!) {
      createStatus(workspaceId: $workspaceId, status: $status) {
        id
        type
      }
    }
  `;

  const variables = {
    workspaceId: args.workspaceId,
    status: args.type,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  const data: Status = await request(
    import.meta.env.VITE_API as string,
    mutation,
    variables,
    headers
  );

  return data;
};

export const addUserToWorkspace = async (args: {
  workspaceId: string;
  userEmail: string;
}) => {
  const mutation = gql`
    mutation addUserToWorkspace($userEmail: String!, $workspaceId: ID!) {
      addUserToWorkspace(userEmail: $userEmail, workspaceId: $workspaceId) {
        id
        email
        name
      }
    }
  `;
  const variables = {
    workspaceId: args.workspaceId,
    userEmail: args.userEmail,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  const data: User = await request(
    import.meta.env.VITE_API as string,
    mutation,
    variables,
    headers
  );

  return data;
};

export const createTask = async (task: Task) => {
  const mutation = gql`
    mutation createTask($task: CreateTaskInput!) {
      createTask(task: $task) {
        id
        title
        priority
        todos {
          completed
        }
        users {
          user {
            id
            name
          }
        }
      }
    }
  `;

  const variables = {
    task: task,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  const data: TaskCreateResponse = await request(
    import.meta.env.VITE_API as string,
    mutation,
    variables,
    headers
  );

  return data;
};

export const updateTask = async (args: {taskId: string, task: Task}) => {
  const mutation = gql`
    mutation updateTask($taskId: ID!, $task: CreateTaskInput!) {
      updateTask(taskId: $taskId, task: $task) {
        id
        title
        priority
        todos {
          completed
        }
        users {
          user {
            id
            name
          }
        }
      }
    }
  `;

  const variables = {
    taskId: args.taskId,
    task: args.task,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  const data: TaskCreateResponse = await request(
    import.meta.env.VITE_API as string,
    mutation,
    variables,
    headers
  );

  return data;
};

export const getTask = async (taskId: string) => {
  const query = gql`
    query getTask($taskId: ID!) {
      getTask(id: $taskId) {
        id
        title
        priority
        todos {
          completed
          content
        }
        users {
          user {
            id
            email
          }
        }
      }
    }
  `;

  const variables = {
    taskId: taskId,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  const data: TaskGetResponse = await request(
    import.meta.env.VITE_API as string,
    query,
    variables,
    headers
  );

  return data;
};

export const deleteTask = (taskId: string) => {
  const mutation = gql`
    mutation deleteTask($taskId: ID!) {
      deleteTask(id: $taskId) {
        id
      }
    }
  `;

  const variables = {
    taskId: taskId,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  return request(
    import.meta.env.VITE_API as string,
    mutation,
    variables,
    headers
  );
};

export const deleteStatus = (statusId: string) => {
  const mutation = gql`
    mutation deleteStatus($statusId: ID!) {
      deleteStatus(statusId: $statusId) {
        id
      }
    }
  `;

  const variables = {
    statusId: statusId,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  return request(
    import.meta.env.VITE_API as string,
    mutation,
    variables,
    headers
  );
};

export const deleteWorkspace = async (workspaceId: string) => {
  const mutation = gql`
    mutation deleteWorkspace($deleteWorkspaceId: ID!) {
      deleteWorkspace(id: $deleteWorkspaceId) {
        id
      }
    }
  `;

  const variables = {
    deleteWorkspaceId: workspaceId,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  return request(
    import.meta.env.VITE_API as string,
    mutation,
    variables,
    headers
  );
};
