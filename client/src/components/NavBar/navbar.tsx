import { Outlet } from "react-router";
import "./navbar.css";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

function NavBar() {
  const theme = useTheme();
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
        <LoadingButton variant="contained" color="secondary" size="small">
          Create
        </LoadingButton>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
