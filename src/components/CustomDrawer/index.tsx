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
      <List sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ pl: 1.5, textDecoration: "underline" }}>
          Categories
        </Typography>
        {categories.map((category: string) => (
          <ListItem key={category}>
            <Link
              to="/$category"
              params={{ category }}
              search={{ page: 1, limit: 15 }}
              style={{
                width: "100%",
                textDecoration: "none",
                textTransform: "capitalize",
                color: "inherit",
                borderRadius: "4px",
                display: "block",
              }}
              activeProps={{
                style: {
                  fontWeight: "bold",
                  color: "#0662be",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              }}
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
