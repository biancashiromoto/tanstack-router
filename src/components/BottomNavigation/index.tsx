import { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  bottomNavigationRoutes,
  type BottomNavigationRoute,
} from "./index.constants";

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState<BottomNavigationRoute["value"] | null>(
    null
  );

  useEffect(() => {
    const routeIndex = bottomNavigationRoutes.findIndex(
      (route) => route.path === location.pathname
    );
    setValue(routeIndex !== -1 ? routeIndex : null);
  }, [location.pathname]);

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
      {bottomNavigationRoutes.map((route) => (
        <BottomNavigationAction
          key={route.value}
          label={route.label}
          icon={<route.icon size={22} />}
          onClick={() => navigate({ to: route.path })}
          style={{
            color: value === route.value ? "primary.main" : "text.secondary",
          }}
        />
      ))}
    </BottomNavigation>
  );
}
