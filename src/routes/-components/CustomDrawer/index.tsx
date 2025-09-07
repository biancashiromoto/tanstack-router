import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link, useRouteContext } from "@tanstack/react-router";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function CustomDrawer() {
  const [open, setOpen] = useState(false);
  const { categories } = useRouteContext({ from: "__root__" });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Typography variant="h6">Categories</Typography>
        {categories.map((category: string) => (
          <ListItem
            key={category}
            className="category-item"
            sx={{ p: 0.25, pl: 3 }}
          >
            <Link
              to={`/${category}`}
              params={{ category }}
              style={{ width: "100%" }}
              preloadDelay={1000}
            >
              <ListItemText primary={category} />
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: "black",
          fontSize: 36,
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
