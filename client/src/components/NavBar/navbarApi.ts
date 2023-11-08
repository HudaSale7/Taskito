import request, { gql } from "graphql-request";
import { RespondedWorkspace, Workspace } from "./types";

export const createWorkspace = async (workspace: Workspace) => {
  const mutation = gql`
    mutation createMutation($workspace: WorkspaceCreateInput!) {
      createWorkspace(workspace: $workspace) {
        id
        title
      }
    }
  `;

  const variables = {
    workspace: workspace,
  };

  const headers = {
    authorization: localStorage.token || "",
  };

  const data: RespondedWorkspace = await request(
    import.meta.env.VITE_API as string,
    mutation,
    variables,
    headers
  );
  return data;
};
