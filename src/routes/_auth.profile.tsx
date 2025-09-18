import { useAuth } from "@/context/AuthContext";
import { createFileRoute } from "@tanstack/react-router";
import Loader from "@/components/Loader";
import { Box, Typography } from "@mui/material";

export const Route = createFileRoute("/_auth/profile")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Profile",
      },
    ],
  }),
  errorComponent: () => <p>Error loading profile.</p>,
});

function RouteComponent() {
  const { user: authUser } = useAuth();

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" className="subtitle">
        Profile Page
      </Typography>
      {authUser ? (
        <Box
          className="user-info"
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            aspectRatio: "1 / 1",
          }}
        >
          <Typography variant="h6" className="text">
            <strong>Welcome, {authUser.firstName}!</strong>
          </Typography>
          <img src={authUser.image} alt="User Avatar" className="avatar" />
          {authUser.address && (
            <Typography variant="body1" className="text">
              <>Address:</> {authUser.address.address} - {authUser.address.city}
              , {authUser.address.state} - {authUser.address.country}
            </Typography>
          )}
          <Typography variant="body1" className="text">
            <strong>Email:</strong> {authUser.email}
          </Typography>
          {authUser.phone && (
            <Typography variant="body1" className="text">
              <strong>Phone:</strong> {authUser.phone}
            </Typography>
          )}
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
}
