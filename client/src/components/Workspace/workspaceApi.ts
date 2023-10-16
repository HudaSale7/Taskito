import request, { gql } from "graphql-request";
import { Status, User, WorkspaceContent } from "./types";

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
