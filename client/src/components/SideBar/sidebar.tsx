import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router";
import "./sidebar.css";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useQuery } from "react-query";
import { getWorkspaces } from "./sidebarApi";

function SideBar() {
  const theme = useTheme();
  const query = useQuery(["workspaces"], getWorkspaces);
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
                sx={{ "&:hover": { bgcolor: theme.palette.primary.light } }}
                key={workspace.workspace.id}
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
