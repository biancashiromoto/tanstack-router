import Link from "@/components/Link";
import { useAuth } from "@/context/AuthContext";
import { Box } from "@mui/material";
import {
  bottomNavigationRoutes,
  RouteValue,
} from "@/components/BottomNavigation/index.constants";
import useResponsive from "@/hooks/useResponsive";

const Navbar = () => {
  const { user } = useAuth();
  const { isDesktop } = useResponsive();

  if (!isDesktop) return null;

  const filteredRoutes = bottomNavigationRoutes.filter((route) => {
    if (route.value === RouteValue.all) return true;
    if (route.value === RouteValue.authenticated) return !!user;
    if (route.value === RouteValue.unauthenticated) return !user;
    return false;
  });

  return (
    <Box
      className="navbar"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: user ? "space-between" : "flex-end",
      }}
    >
      {filteredRoutes.map((route) => (
        <Link.Root key={route.path} to={route.path}>
          <Link.Icon icon={<route.icon />} />
          <Link.Label>{route.label}</Link.Label>
        </Link.Root>
      ))}
    </Box>
  );
};

export default Navbar;
