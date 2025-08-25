import { useAuth } from "@/context/AuthContext";
import Avatar from "../Avatar";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const currentLocation = useLocation();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  if (currentLocation.pathname === "/" && !user) return null;

  return (
    <header>
      {user && (
        <>
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
        </>
      )}
      {!user && (
        <Link className="link-button login" to="/">
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
