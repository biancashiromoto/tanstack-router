import { Box } from "@mui/material";
import { HeadContent, Outlet } from "@tanstack/react-router";
import Header from "./Header";

export function App() {
  return (
    <Box sx={{ px: 2, py: 1 }}>
      <HeadContent />
      <Header />
      <Outlet />
    </Box>
  );
}
