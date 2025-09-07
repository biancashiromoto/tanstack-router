import { Box, Typography } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/unauthenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box>
      <Typography className="subtitle">Unauthenticated</Typography>
      <Typography className="text">
        Please <Link to="/">sign in</Link> to access this page.
      </Typography>
    </Box>
  );
}
