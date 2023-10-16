/* eslint-disable @typescript-eslint/no-explicit-any */
import "./workspace.css";
import { useMutation, useQueryClient } from "react-query";
import { createStatus } from "./workspaceApi";
import { Status } from "./types";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Board(props: { workspaceId: string; workspace: any }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");
  const mutation = useMutation({
    mutationFn: createStatus,
    onSuccess: (data: Status) => {
      queryClient.setQueryData(
        ["workspace", props.workspaceId],
        (oldData: any) => {
          return {
            getWorkspace: {
              workspace: {
                ...oldData.getWorkspace.workspace,
                statuses: [
                  ...oldData.getWorkspace.workspace.statuses,
                  data.createStatus,
                ],
              },
            },
          };
        }
      );
    },
  });

  const handleCreateStatus = (id: string, type: string) => {
    if (!type) return;
    setStatus("");
    mutation.mutate({ workspaceId: id, type: type });
  };
  return (
    <>
      <div className="board">
        <div className="status-list">
          {props.workspace.statuses.map((status: any) => (
            <div className="status" key={status.id}>
              <div className="status-header">
                <div className="status-type">{status.type.toLocaleUpperCase()}</div>
                <IconButton>
                  <MoreHorizIcon fontSize="small" color="secondary"/>
                </IconButton>
              </div>
              <div className="status-body"></div>
            </div>
          ))}
          <div className="status">
            <input
              type="text"
              placeholder="Add Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              onBlur={(e) =>
                handleCreateStatus(props.workspaceId, e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleCreateStatus(
                  props.workspaceId,
                  (e.target as HTMLTextAreaElement).value
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
