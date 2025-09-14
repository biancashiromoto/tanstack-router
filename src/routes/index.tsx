import LoginForm from "@/components/LoginForm";
import DailyDeals from "@/components/DailyDeals";
import { useAuth } from "@/context/AuthContext";
import { Box, Container, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <LoginForm />
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box
        className="hero-section"
        sx={{
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Welcome, {user.firstName}!
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Discover the best deals and amazing products
          </Typography>
        </Container>
      </Box>
      <DailyDeals />
    </Box>
  );
}
