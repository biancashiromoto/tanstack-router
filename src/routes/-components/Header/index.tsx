import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import Avatar from "../Avatar";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

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
