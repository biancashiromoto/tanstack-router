import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { user } = useAuth();

  return <Box>{!user && <LoginForm />}</Box>;
}
