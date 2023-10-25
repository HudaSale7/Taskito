/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState, useContext, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { createTask, deleteTask, getTask } from "./workspaceApi";
import { Todo } from "./types";
import { modalContext } from "./modalContext";
const priorityOptions = ["Urgent", "High", "Normal", "Low"];

function TaskForm(props: { workspaceId: string; workspace: any }) {
  const context = useContext(modalContext);
  const taskId = context.taskStatusId.taskId;
  const query = useQuery(["task", taskId], () => getTask(taskId), {
    enabled: taskId !== "-1",
  });

  const [title, setTitle] = useState("");
  const [statusId, setStatusId] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const theme = useTheme();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (query.data) {
      setTitle(query.data.getTask.title);
      setStatusId(context.taskStatusId.statusId);
      setPriority(query.data.getTask.priority);
      setUsers(query.data.getTask.users.map((user: any) => user.user.email));
      setTodos(query.data.getTask.todos);
      setStatus(
        props.workspace.statuses.find(
          (status: any) => status.id === context.taskStatusId.statusId
        )?.type || ""
      );
    }
  }, [context.taskStatusId.statusId, props.workspace, query.data]);

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["workspace", props.workspaceId],
        (oldData: any) => {
          return {
            getWorkspace: {
              workspace: {
                ...oldData.getWorkspace.workspace,
                statuses: oldData.getWorkspace.workspace.statuses.map(
                  (status: any) => {
                    if (status.id === statusId) {
                      status.tasks.unshift(data.createTask);
                      return status;
                    }
                    return status;
                  }
                ),
              },
            },
          };
        }
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      handleCreateTask();
    },
  });

  const handleCreateTask = () => {
    if (!title) return;
    if (!statusId) return;
    if (!priority) return;

    createMutation.mutate({
      title,
      statusId,
      priority,
      users,
      todos,
    });

    handleCloseModal();
  };

  const handleCompleteTodo = (checked: boolean, i: number) => {
    todos[i].completed = checked;
    setTodos([...todos]);
  };

  const handleCloseModal = () => {
    context.setModal(false);
    context.setTaskStatusId({ taskId: "-1", statusId: "-1" });
    setTitle("");
    setStatus("");
    setPriority("");
    setUsers([]);
    setTodos([]);
    setTodo("");
  };

  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(100% - 400px)",
    maxHeight: "100%",
    bgcolor: theme.palette.primary.light,
    color: "#e8ecf0",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "12px",
      bgcolor: "#313a45",
    },
    "&::-webkit-scrollbar-thumb": {
      bgcolor: "#e8ecf0",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track-piece": {
      bgcolor: "#1f262e",
    },
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(name: string, userName: readonly string[]) {
    return {
      backgroundColor:
        userName.indexOf(name) === -1
          ? theme.palette.primary.main
          : theme.palette.primary.light,
    };
  }

  return (
    <div className="task-form">
      <Modal
        open={context.modal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Task title"
            name="title"
            color="secondary"
            sx={{ mb: 0, mt: 0 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                required={true}
                sx={{ color: "#e8ecf0", borderColor: "#9fadbc" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {props.workspace.statuses.map((status: any) => (
                  <MenuItem
                    value={status.type}
                    key={status.id}
                    onClick={() => setStatusId(status.id)}
                    sx={{ "&:hover": { bgcolor: theme.palette.primary.light } }}
                  >
                    {status.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Priority"
                sx={{ color: "#e8ecf0", borderColor: "#9fadbc" }}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {priorityOptions.map((p: any, i: any) => (
                  <MenuItem
                    value={p}
                    key={i}
                    sx={{ "&:hover": { bgcolor: theme.palette.primary.light } }}
                  >
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Users</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              sx={{ color: "#e8ecf0" }}
              multiple
              value={users}
              onChange={(e) => {
                setUsers(e.target.value as string[]);
              }}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{
                        color: "#e8ecf0",
                        bgcolor: theme.palette.primary.main,
                      }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {props.workspace.users.map((user: any) => (
                <MenuItem
                  key={user.user.id}
                  value={user.user.email}
                  style={getStyles(user.user.email, users)}
                >
                  {user.user.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <h2>ToDos</h2>
          <Box sx={{ display: "flex", gap: "1rem", width: "100%" }}>
            <textarea
              className="textarea"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ maxHeight: "44px" }}
              onClick={() => {
                setTodos([...todos, { content: todo, completed: false }]);
                setTodo("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormGroup>
            {todos.map((todo: any, i: any) => (
              <FormControlLabel
                key={i}
                onChange={(_, checked) => handleCompleteTodo(checked, i)}
                checked={todo.completed}
                control={
                  <Checkbox
                    color="secondary"
                    sx={{
                      color: theme.palette.secondary.main,
                    }}
                  />
                }
                label={todo.content}
              />
            ))}
          </FormGroup>
          <LoadingButton
            variant="contained"
            color="secondary"
            size="small"
            sx={{ width: "90px", height: "40px", alignSelf: "flex-end" }}
            loading={createMutation.isLoading || deleteMutation.isLoading}
            onClick={() => {
              taskId === "-1"
                ? handleCreateTask
                : deleteMutation.mutate(taskId);
            }}
          >
            {taskId !== "-1" ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}

export default TaskForm;
