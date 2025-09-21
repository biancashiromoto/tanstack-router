import {
  Button,
  FormControl,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import { TbLockPassword } from "react-icons/tb";
import useLoginForm from "./useLoginForm";

const LoginForm = () => {
  const { username, password, handleChange, error, isLoading, handleSubmit } =
    useLoginForm();

  return (
    <Paper
      className="login-container"
      sx={{ px: 4, py: 3, mt: 2, width: "80%", maxWidth: 400, mx: "auto" }}
    >
      <Typography variant="h5" className="subtitle">
        Login
      </Typography>
      <FormControl
        onSubmit={handleSubmit}
        component="form"
        className="login-form"
        fullWidth
        sx={{ gap: 2, my: 2, display: "grid" }}
      >
        <TextField
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          required
          variant="outlined"
          label="Username"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <RxAvatar />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          variant="outlined"
          label="Password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <TbLockPassword />
                </InputAdornment>
              ),
            },
          }}
        />
        {error && (
          <Typography className="error-message" variant="caption" color="error">
            {error}
          </Typography>
        )}
        <Button type="submit" disabled={isLoading} variant="contained">
          {isLoading ? "Signing in..." : "Login"}
        </Button>
      </FormControl>
    </Paper>
  );
};

export default LoginForm;
