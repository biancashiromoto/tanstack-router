import { useAuth } from "@/context/AuthContext";
import {
  Button,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate({ to: "/profile" });
    }
  }, [user, isAuthenticated]);

  // const { data: users } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: getAllUsers,
  //   enabled: true
  // });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate({ to: "/profile" });
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper className="login-container" sx={{ px: 4, py: 3, mt: 2 }}>
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
        {error && (
          <FormHelperText className="error-message">{error}</FormHelperText>
        )}
        <TextField
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          variant="outlined"
          label="Username"
        />
        <TextField
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          label="Password"
        />
        <Button type="submit" disabled={isLoading} variant="contained">
          {isLoading ? "Signing in..." : "Login"}
        </Button>
      </FormControl>
    </Paper>
  );
};

export default LoginForm;
