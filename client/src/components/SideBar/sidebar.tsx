import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router";
import "./sidebar.css";
import { List, ListItemButton, ListItemText } from "@mui/material";

function SideBar() {
  const theme = useTheme();
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
        <List>
          <ListItemButton
            sx={{ "&:hover": { bgcolor: theme.palette.primary.light } }}
          >
            <ListItemText
              primary="Workspace 1"
              primaryTypographyProps={{
                fontSize: 18,
                fontWeight: "medium",
                letterSpacing: 0,
              }}
            />
          </ListItemButton>
        </List>
      </div>
      <Outlet />
    </>
  );
}

export default SideBar;
