import { useAuth } from '@/context/AuthContext'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import '@/App.scss'
import { IoIosReturnLeft } from 'react-icons/io';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  }

  return (
    <nav className='navbar'>
      {!isHome && (
        <button type='button' className="link-button return" onClick={() => navigate({ to: '..' })}>
          <IoIosReturnLeft />
          Return
        </button>
      )}
      {isAuthenticated && <button className="link-button logout" type="button" onClick={handleLogout}>Logout</button>}
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
        {isAuthenticated && <li><Link to="/cart">Cart</Link></li>}
      </ul>
    </nav>
  )
}

export default Navbar