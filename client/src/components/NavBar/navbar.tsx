/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate } from "react-router";
import "./navbar.css";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useQueryClient, useMutation } from "react-query";
import { createWorkspace } from "./navbarApi";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { useState } from "react";
const buttonContent = ["Home", "Login", "Sign Up"]

function NavBar() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selected, setSelected] = useState(0);

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
      queryClient.setQueryData("workspaces", (oldData: any) => {
        const newData = { workspace: data.createWorkspace };
        return {
          getAllWorkspace: [...oldData.getAllWorkspace, newData],
        };
      });
      navigate(`/workspace/${data.createWorkspace.id}`);
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigate = (index: number) => {
    setSelected(index);
    if (index === 0) {
      navigate("/");
    } else if (index === 1) {
      navigate("/login");
    } else {
      navigate("/sign-up");
    }
  }

  return (
    <>
      <div
        className="outside-navbar"
        style={{
          color: theme.palette.primary.contrastText,
        }}
      >
        <div className="logo">
          <h4>Taskito</h4>
          {!token && (
            <div className="button-container">
              {buttonContent.map((content, i) => (
                <Button
                  color="secondary"
                  variant={selected === i ? "contained" : "text"}
                  key={i}
                  onClick={() => handleNavigate(i)}
                >
                  {content}
                </Button>
              ))}
            </div>
          )}
          {token && (
            <LoadingButton
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleCreateWorkspace}
              loading={mutation.isLoading}
            >
              Create
            </LoadingButton>
          )}
        </div>
        {token && (
          <IconButton onClick={handleLogout}>
            <LogoutIcon color="secondary" />
          </IconButton>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
