import { useAuth } from "@/context/AuthContext";
import Avatar from "../Avatar";
import { useNavigate } from "@tanstack/react-router";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  }

  if (!user) return null;

  return (
    <header>
      <Avatar user={user} />
      <button className="link-button logout" type="button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  )
}

export default Header