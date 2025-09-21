import Link from "@/components/Link";
import { useAuth } from "@/context/AuthContext";
import { Box } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { RxAvatar } from "react-icons/rx";
import useResponsive from "@/hooks/useResponsive";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDesktop } = useResponsive();

  const handleLogout = () => logout();

  const NavbarLinks = () => {
    if (!user) {
      return (
        <Link.Root to="/login">
          <Link.Icon icon={<VscSignIn />} />
          <Link.Label>Login</Link.Label>
        </Link.Root>
      );
    }
    return (
      <>
        {isDesktop && (
          <Link.Root to="/cart">
            <Link.Icon icon={<AiOutlineShoppingCart />} />
            <Link.Label>Cart</Link.Label>
          </Link.Root>
        )}
        <Link.Root to="/" handleClick={handleLogout}>
          <Link.Icon icon={<VscSignOut />} />
          <Link.Label>Logout</Link.Label>
        </Link.Root>
      </>
    );
  };

  return (
    <Box
      className="navbar"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: user ? "space-between" : "flex-end",
      }}
    >
      {user && isDesktop && (
        <Link.Root to="/profile">
          <Link.Icon icon={<RxAvatar />} />
          <Link.Label>Profile</Link.Label>
        </Link.Root>
      )}
      {isDesktop && (
        <Link.Root to="/">
          <Link.Icon icon={<GoHome />} />
          <Link.Label>Home</Link.Label>
        </Link.Root>
      )}
      <NavbarLinks />
    </Box>
  );
};

export default Navbar;
