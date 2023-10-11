import request, { gql } from "graphql-request";
import { Workspaces } from "./types";

export const getWorkspaces = async () => {
  const query = gql`
    query workspacesQuery {
      getAllWorkspace {
        workspace {
          id
          title
        }
      }
    }
  `;

  const headers = {
    authorization: localStorage.token || "",
  };

  const data: Workspaces = await request(
    import.meta.env.VITE_API as string,
    query,
    {},
    headers
  );

  return data;
};
