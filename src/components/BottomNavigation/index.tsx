import { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  bottomNavigationRoutes,
  RouteValue,
  type BottomNavigationRoute,
} from "./index.constants";
import { useAuth } from "@/context/AuthContext";

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [value, setValue] = useState<BottomNavigationRoute["value"] | null>(
    null
  );

  useEffect(() => {
    const routeIndex = bottomNavigationRoutes.findIndex(
      (route) => route.path === location.pathname
    );
    setValue(routeIndex !== -1 ? routeIndex : null);
  }, [location.pathname]);

  const filteredRoutes = bottomNavigationRoutes.filter((route) => {
    if (route.value === RouteValue.all) return true;
    if (route.value === RouteValue.authenticated) return !!user;
    if (route.value === RouteValue.unauthenticated) return !user;
    return false;
  });

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_event, newValue) => setValue(newValue)}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#fff",
      }}
    >
      {filteredRoutes.map((route) => (
        <BottomNavigationAction
          key={route.value}
          label={route.label}
          icon={<route.icon size={24} />}
          onClick={() => navigate({ to: route.path })}
          value={route.value}
        />
      ))}
    </BottomNavigation>
  );
}
