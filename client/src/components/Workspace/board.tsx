/* eslint-disable @typescript-eslint/no-explicit-any */
import "./workspace.css";
import { useMutation, useQueryClient } from "react-query";
import { createStatus } from "./workspaceApi";
import { Status } from "./types";
import { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { modalContext } from "./modalContext";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

function Board(props: { workspaceId: string; workspace: any }) {
  const queryClient = useQueryClient();
  const context = useContext(modalContext);
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

  const handleOpenTask = (taskId: string, statusId: string) => {
    context.setModal(true);
    context.setTaskStatusId({taskId: taskId, statusId: statusId});
  };
  return (
    <>
      <div className="board">
        <div className="status-list">
          {props.workspace.statuses.map((status: any) => (
            <div className="status" key={status.id}>
              <div className="status-header">
                <div className="status-type">{status.type}</div>
                <IconButton>
                  <MoreHorizIcon fontSize="small" color="secondary" />
                </IconButton>
              </div>
              <div className="task-list">
                {status.tasks &&
                  status.tasks.map((task: any) => (
                    <div
                      className="task"
                      key={task.id}
                      onClick={() => handleOpenTask(task.id, status.id)}
                    >
                      <div className="title">
                        <h3>{task.title}</h3>
                      </div>
                      <div className="priority">{task.priority}</div>
                    </div>
                  ))}
              </div>
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
        <Button
          onClick={() => context.setModal(true)}
          color="secondary"
          variant="contained"
        >
          <AddIcon fontSize="small" />
          Task
        </Button>
      </div>
    </>
  );
}

export default Board;
