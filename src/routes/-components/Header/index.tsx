import { useAuth } from "@/context/AuthContext";
import { Box, Divider, Typography } from "@mui/material";
import { Link, useRouteContext } from "@tanstack/react-router";
import Avatar from "../Avatar";
import CustomDrawer from "../CustomDrawer";
import SearchBar from "../SearchBar";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const { user, logout } = useAuth();
  const { categories } = useRouteContext({ from: "__root__" });

  const handleLogout = () => logout();

  return (
    <Box
      role="banner"
      className="header"
      sx={{
        position: "sticky",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "80% auto",
        gridTemplateRows: "auto auto auto",
        alignItems: "center",
        gap: 1,
      }}
    >
      {!user && (
        <Typography
          variant="body1"
          component="span"
          sx={{ gridColumn: 2, gridRow: 1, textAlign: "right", mr: 2 }}
        >
          <Link className="link-button login" to="/">
            Login
          </Link>
        </Typography>
      )}
      {user && (
        <Box
          sx={{
            gridColumn: "span 2",
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Avatar user={user} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link to="/cart">
              <Typography
                variant="body1"
                component="span"
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <FaShoppingCart />
                Cart
              </Typography>
            </Link>
            <Link onClick={handleLogout} to="/">
              <Typography
                variant="body1"
                component="span"
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <MdLogout />
                Logout
              </Typography>
            </Link>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "85% auto",
          gridColumn: "span 2",
          gridRow: 2,
          py: 1,
        }}
      >
        <SearchBar />
        {categories && <CustomDrawer />}
      </Box>
      <Divider sx={{ gridRow: 3, gridColumn: "span 2", my: 1 }} />
    </Box>
  );
};

export default Header;
