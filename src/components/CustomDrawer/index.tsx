import { formatCategoryName } from "@/helpers";
import useResponsive from "@/hooks/useResponsive";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link, useRouteContext } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function CustomDrawer() {
  const [open, setOpen] = useState(false);
  const { categories } = useRouteContext({ from: "__root__" });
  const { isMobile } = useResponsive();

  const toggleDrawer = useCallback(
    (newOpen: boolean) => () => setOpen(newOpen),
    [setOpen]
  );

  const DrawerList = (
    <Box
      sx={{ width: 250, p: 1 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {categories.map((category: string) => (
          <ListItem key={category}>
            <Link
              to="/$category"
              params={{ category }}
              search={{ page: 1, limit: 15 }}
              preload="intent"
              style={{
                width: "100%",
                textDecoration: "none",
                textTransform: "capitalize",
                color: "inherit",
                borderRadius: "4px",
                display: "block",
                padding: "8px 12px",
                transition: "all 0.2s ease-in-out",
              }}
              activeProps={{
                style: {
                  fontWeight: "bold",
                  color: "#0662be",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
              preloadDelay={500}
            >
              <ListItemText primary={formatCategoryName(category)} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: "black",
          fontSize: isMobile ? 30 : 36,
          transform: "translateX(6px)",
        }}
      >
        <FiMenu />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
