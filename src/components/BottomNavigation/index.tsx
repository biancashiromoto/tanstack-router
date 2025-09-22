import { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { bottomNavigationRoutes, RouteValue } from "./index.constants";
import { useAuth } from "@/context/AuthContext";

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOutUser } = useAuth();

  const [value, setValue] = useState<number | null>(null);

  const filteredRoutes = bottomNavigationRoutes.filter((route) => {
    if (route.value === RouteValue.all) return true;
    if (route.value === RouteValue.authenticated) return !!user;
    if (route.value === RouteValue.unauthenticated) return !user;
    return false;
  });

  useEffect(() => {
    const matchingRouteIndex = filteredRoutes.findIndex(
      (route) => route.path === location.pathname
    );
    setValue(matchingRouteIndex !== -1 ? matchingRouteIndex : null);
  }, [location.pathname, filteredRoutes]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_event, newValue) => {
        const selectedRoute = filteredRoutes[newValue];
        if (selectedRoute) {
          setValue(selectedRoute.value);
          navigate({ to: selectedRoute.path });
        }
      }}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        zIndex: 1000,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {filteredRoutes.map((route, index) => (
        <BottomNavigationAction
          key={index}
          label={route.label}
          icon={<route.icon size={24} />}
          onClick={() => {
            if (route.label === "Logout") signOutUser();
          }}
          value={index}
        />
      ))}
    </BottomNavigation>
  );
}
