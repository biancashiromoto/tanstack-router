import useResponsive from "@/hooks/useResponsive";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useRouteContext } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { FiMenu } from "react-icons/fi";
import CustomDrawerItem from "./CustomDrawerItem";

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
          <CustomDrawerItem key={category} category={category} />
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: "primary.main",
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
