import { useTheme } from "@mui/material/styles";
import { Outlet, useNavigate, useParams } from "react-router";
import "./sidebar.css";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useQuery } from "react-query";
import { getWorkspaces } from "./sidebarApi";
import { useEffect, useState } from "react";

function SideBar() {
  const theme = useTheme();
  const { id } = useParams();
  const workspaceId = id ? id : "-1";
  const query = useQuery(["workspaces"], getWorkspaces);
  const [selected, setSelected] = useState(workspaceId);
  const navigate = useNavigate();

  useEffect(() => {
    setSelected(workspaceId);
  }, [workspaceId]);

  const navigateToWorkspace = (id: string) => {
    navigate(`/workspace/${id}`);
  };

  return (
    <>
      <div
        className="sidebar"
        style={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <div className="header">
          <h5>Your Workspaces</h5>
        </div>
        <div className="workspace-list">
          <List>
            {query.data?.getAllWorkspace.map((workspace) => (
              <ListItemButton
                sx={{
                  "&:hover": { bgcolor: theme.palette.primary.light },
                  bgcolor:
                    selected === workspace.workspace.id
                      ? theme.palette.primary.light
                      : theme.palette.primary.main,
                }}
                key={workspace.workspace.id}
                onClick={() => {
                  navigateToWorkspace(workspace.workspace.id);
                }}
              >
                <ListItemText
                  primary={workspace.workspace.title}
                  primaryTypographyProps={{
                    fontSize: 18,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default SideBar;
