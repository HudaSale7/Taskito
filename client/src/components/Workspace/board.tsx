/* eslint-disable @typescript-eslint/no-explicit-any */
import "./workspace.css";
import { useMutation, useQueryClient } from "react-query";
import { createStatus, deleteStatus } from "./workspaceApi";
import { Status, DisplayTask } from "./types";
import { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { modalContext } from "./context/modalContext";
import AddIcon from "@mui/icons-material/Add";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import FlagIcon from "@mui/icons-material/Flag";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { PriorityColors } from "./types";

function Board(props: { workspaceId: string; workspace: any }) {
  const queryClient = useQueryClient();
  const context = useContext(modalContext);
  const [inputStatus, setInputStatus] = useState("");
  const [activeMenu, setActiveMenu] = useState("");

  const mutation = useMutation({
    mutationFn: createStatus,
    onSuccess: (data: Status) => {
      const newStatus = {...data.createStatus, tasks: []};
      queryClient.setQueryData(
        ["workspace", props.workspaceId],
        (oldData: any) => {
          return {
            getWorkspace: {
              workspace: {
                ...oldData.getWorkspace.workspace,
                statuses: [
                  ...oldData.getWorkspace.workspace.statuses,
                  newStatus,
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
    setInputStatus("");
    mutation.mutate({ workspaceId: id, type: type });
  };

  const handleOpenTask = (taskId: string, statusId: string) => {
    context.setModal(true);
    context.setTaskStatusId({ taskId: taskId, statusId: statusId });
  };

  const deleteStatusMutation = useMutation({
    mutationFn: deleteStatus,
    onSuccess: (data: any) => {
      queryClient.setQueryData(
        ["workspace", props.workspaceId],
        (oldData: any) => {
          return {
            getWorkspace: {
              workspace: {
                ...oldData.getWorkspace.workspace,
                statuses: [
                  ...oldData.getWorkspace.workspace.statuses.filter(
                    (status: any) => status.id !== data.deleteStatus.id
                  ),
                ],
              },
            },
          };
        }
      );
    },
  });

  const getTodosCount = (todos: any) => {
    const completedTodo = todos.filter((todo: any) => todo.completed);
    return `${completedTodo.length}/${todos.length}`;
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteStatus = (statusId: string) => {
    setAnchorEl(null);
    deleteStatusMutation.mutate(statusId);
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0].toLocaleUpperCase()}`,
    };
  }

  return (
    <>
      <div className="board">
        {deleteStatusMutation.isLoading && (
          <CircularProgress
            color="secondary"
            disableShrink
            sx={{ position: "absolute", top: "5px", left: "50%", zIndex: 99 }}
            size={40}
          />
        )}
        <div className="status-list">
          {props.workspace.statuses.map((status: any) => (
            <div className="status" key={status.id}>
              <div className="status-header">
                <div className="status-type">{status.type}</div>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    setAnchorEl(event.currentTarget);
                    setActiveMenu(status.id);
                  }}
                >
                  <MoreHorizIcon fontSize="small" color="secondary" />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open && activeMenu === status.id}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleDeleteStatus(status.id);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </div>
              <div className="task-list">
                {status.tasks &&
                  status.tasks.map((task: DisplayTask) => (
                    <div
                      className="task"
                      key={task.id}
                      onClick={() => handleOpenTask(task.id, status.id)}
                    >
                      <div className="title">
                        <div className="head">
                          <h4>{task.title}</h4>
                        </div>

                        <AvatarGroup max={3}>
                          {task.users.map((user: any) => (
                            <Avatar
                              key={user.user.id}
                              {...stringAvatar(user.user.name)}
                            />
                          ))}
                        </AvatarGroup>
                      </div>

                      <FlagIcon sx={{ color: PriorityColors[task.priority] }} />
                      {task.todos.length > 0 && (
                        <div className="todosCount">
                          <TaskAltIcon fontSize="small" color="secondary" />
                          {getTodosCount(task.todos)}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
          {mutation.isLoading && (
            <div className="status">
              <div className="status-header">
                <CircularProgress
                  color="secondary"
                  disableShrink
                  sx={{ alignSelf: "center" }}
                  size={30}
                />
              </div>
            </div>
          )}
          <div className="status">
            <input
              type="text"
              placeholder="Add Status"
              value={inputStatus}
              onChange={(e) => setInputStatus(e.target.value)}
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
        <div className="add-task">
          <Button
            onClick={() => context.setModal(true)}
            color="secondary"
            variant="contained"
          >
            <AddIcon fontSize="small" />
            Task
          </Button>
        </div>
      </div>
    </>
  );
}

export default Board;
