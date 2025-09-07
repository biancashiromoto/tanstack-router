import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/routes/-components/LoginForm";
import { Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { user } = useAuth();

  return <Box className="home-container">{!user && <LoginForm />}</Box>;
}
