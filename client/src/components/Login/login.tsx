import { Outlet, useNavigate } from "react-router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useMutation } from "react-query";
import { loginApi } from "./loginApi";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.token = data.login.token;
      localStorage.userId = data.login.id;
      localStorage.name = data.login.name;
      navigate(`/workspace/${data.login.id}`);
    },
  });
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="#9FADBC">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            color="secondary"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              mutation.mutate({ email, password });
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default Login;
