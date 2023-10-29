import { Outlet, useNavigate } from "react-router";
import "./navbar.css";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useQueryClient, useMutation } from "react-query";
import { createWorkspace } from "./navbarApi";

function NavBar() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleCreateWorkspace = async () => {
    const { value: title } = await Swal.fire({
      title: "Workspace Title",
      input: "text",
      showCancelButton: true,
      confirmButtonColor: theme.palette.secondary.main,
      background: theme.palette.primary.main,
      color: "white",
      confirmButtonText: "Create",
      inputValidator: (value) => {
        if (!value) {
          return "Please Enter the Workspace Title";
        }
        if (value.match(/^\d/)) {
          return "Workspace Title should not start with a number";
        }
      },
    });
    if (title) {
      mutation.mutate({ title: title });
    }
  };

  const mutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["workspaces"]);
      navigate(`/workspace/${data.createWorkspace.id}`);
    },
  });

  return (
    <>
      <div
        className="navbar"
        style={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <div className="logo">
          <h4>Taskito</h4>
        </div>
        <LoadingButton
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleCreateWorkspace}
          loading={mutation.isLoading}
        >
          Create
        </LoadingButton>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
