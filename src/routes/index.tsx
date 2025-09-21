import DailyDeals from "@/components/DailyDeals";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { getMetaHeader } from "@/helpers";
import { Box, Container, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  pendingComponent: () => <Loader />,
  head: () => getMetaHeader(),
});

function App() {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", pt: 5 }}>
      <Box
        className="hero-section"
        sx={{
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          {user && (
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Welcome, {user.firstName}!
            </Typography>
          )}
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Discover the best deals and amazing products
          </Typography>
        </Container>
      </Box>
      <DailyDeals />
    </Box>
  );
}
