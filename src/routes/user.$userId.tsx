import { getUserById } from "@/services/users";
import type { User } from "@/types";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import useResponsive from "@/hooks/useResponsive";

export const Route = createFileRoute("/user/$userId")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { userId } = params;
    if (!userId) throw new Error("User ID is required");

    const user: User = await context.queryClient.ensureQueryData(
      queryOptions({
        queryKey: [userId],
        queryFn: () => getUserById(userId),
        staleTime: 1000 * 60 * 5, // 5 minutes
      })
    );

    return user;
  },
  errorComponent: ({ error }) => {
    return <p>Error loading user profile: {error.message}</p>;
  },
  head: () => {
    return {
      meta: [
        {
          title: "User Profile",
        },
      ],
    };
  },
});

function RouteComponent() {
  const user = useLoaderData({ from: "/user/$userId" });
  const { isMobile } = useResponsive();

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 800,
        mx: "auto",
        p: isMobile ? 2 : 3,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", mb: 2 }}
      >
        User Profile
      </Typography>

      <Card sx={{ boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: 3,
              mb: 4,
            }}
          >
            <Avatar
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{
                width: isMobile ? 100 : 120,
                height: isMobile ? 100 : 120,
                border: "3px solid #1976d2",
              }}
            />

            <Box sx={{ textAlign: isMobile ? "center" : "left", flexGrow: 1 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {user.firstName} {user.lastName}
              </Typography>

              <Chip
                label={`@${user.username}`}
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Typography variant="body1" color="text.secondary">
                {user.gender}
              </Typography>
            </Box>
          </Box>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
              >
                📧 Contact Information
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
}
