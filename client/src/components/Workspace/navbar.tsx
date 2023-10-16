import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQueryClient } from "react-query";
import { addUserToWorkspace } from "./workspaceApi";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";

/* eslint-disable @typescript-eslint/no-explicit-any */
function NavBar(props: { workspace: any, workspaceId: string }) {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const handleAddUser = async () => {
    const { value: email } = await Swal.fire({
      title: "User Email",
      input: "text",
      showCancelButton: true,
      confirmButtonColor: theme.palette.secondary.main,
      background: theme.palette.primary.main,
      color: "white",
      confirmButtonText: "Add",
      inputValidator: (value) => {
        if (!value) {
          return "Please Enter the User Email";
        }
        if (!value.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
          return "please enter a valid email";
        }
      },
    });
    if (email) {
      mutation.mutate({ workspaceId: props.workspaceId, userEmail: email});
    }
  };
  const mutation = useMutation({
    mutationFn: addUserToWorkspace,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["workspace", props.workspace.id],
        (old: any) => {
          return {
            getWorkspace: {
              workspace: {
                ...old.getWorkspace.workspace,
                users: [
                  ...old.getWorkspace.workspace.users,
                  {
                    user: {
                      ...data.addUserToWorkspace,
                    },
                  },
                ],
              },
            },
          };
        }
      );
    },
  });

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
      <div className="navbar">
        <div className="workspace-name">{props.workspace.title}</div>
        <div className="users">
          <div className="add-user">
            <AddIcon onClick={handleAddUser} />
          </div>
          <AvatarGroup max={4} onClick={() => console.log("avatar")}>
            {props.workspace.users.map((user: any) => (
              <Avatar key={user.user.id} {...stringAvatar(user.user.name)} />
            ))}
          </AvatarGroup>
        </div>
      </div>
    </>
  );
}

export default NavBar;
