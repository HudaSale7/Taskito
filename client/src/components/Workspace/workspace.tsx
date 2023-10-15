import { useParams } from "react-router";
import "./workspace.css";
import { useQuery } from "react-query";
import { getWorkspace } from "./workspaceApi";

function Workspace() {
  const { id } = useParams();
  const workspaceId = id as string;
  const query = useQuery(["workspace", id], () => getWorkspace(workspaceId));
  return (
    <>
      <div className="workspace">
        <div className="board">
          <div className="status-list">
            {query.data?.getWorkspace.workspace.statuses.map((status) => (
              <div className="status" key={status.id}>
                <div className="status-header">{status.type}</div>
                <div className="status-body"></div>
              </div>
            ))}
            <div className="status">
              <input type="text" placeholder="Add Status" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Workspace;
