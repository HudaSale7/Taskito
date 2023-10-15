import request, { gql } from "graphql-request";
import { WorkspaceContent } from "./types";

export const getWorkspace = async (workspaceId: string) => {
  const query = gql`
    query getWorkspaceQuery($getWorkspaceId: ID!) {
      getWorkspace(id: $getWorkspaceId) {
        workspace {
          statuses {
            id
            type
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
