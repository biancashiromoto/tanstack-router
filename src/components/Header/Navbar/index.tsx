import Avatar from "@/components/Avatar";
import Link from "@/components/Link";
import { useAuth } from "@/context/AuthContext";
import { Box } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { VscSignIn, VscSignOut } from "react-icons/vsc";

const Navbar = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => logout();

  if (!user) {
    return (
      <Box
        sx={{
          gridColumn: "span 2",
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Link to="/" label="Home" icon={<GoHome />} />
        <Link to="/login" label="Login" icon={<VscSignIn />} />
      </Box>
    );
  }

  return (
    <Box
      className="header-user"
      sx={{
        gridColumn: "span 2",
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      <Avatar user={user} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Link to="/" label="Home" icon={<GoHome />} />
        <Link to="/cart" label="Cart" icon={<AiOutlineShoppingCart />} />
        <Link
          to="/"
          label="Logout"
          icon={<VscSignOut />}
          handleClick={handleLogout}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
