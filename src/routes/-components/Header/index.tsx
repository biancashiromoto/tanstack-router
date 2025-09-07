import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";
import Avatar from "../Avatar";
import SearchBar from "../SearchBar";
import { Box, Divider, Typography } from "@mui/material";
import CustomDrawer from "../CustomDrawer";

export interface HeaderProps {
  search: string;
  handleSearchChange: (value: string) => void;
  options: any[];
}

const Header = ({ search, handleSearchChange, options }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { categories } = useRouteContext({ from: "__root__" });

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <Box
      role="banner"
      className="header"
      sx={{
        position: "sticky",
        width: "100%",
        pt: 2,
        display: "grid",
        gridTemplateColumns: "80% auto",
        gridTemplateRows: "auto auto auto",
        alignItems: "center",
        gap: 2,
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
        <Box sx={{ gridColumn: 2 }}>
          <Avatar user={user} />
          <Link className="link-button cart" to="/cart">
            Cart
          </Link>
          <button
            className="link-button logout"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </Box>
      )}
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "85% 40px",
          gridColumn: "span 2",
          gridRow: 2,
        }}
      >
        <SearchBar
          search={search}
          handleSearchChange={handleSearchChange}
          options={options}
        />
        {categories && <CustomDrawer />}
      </Box>
      <Divider sx={{ gridRow: 3, gridColumn: "span 2" }} />
    </Box>
  );
};

export default Header;
