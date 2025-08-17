import { useAuth } from '@/context/AuthContext';
import { Outlet } from '@tanstack/react-router';
import Avatar from './-components/Avatar';
import Navbar from './-components/Navbar';

export function App() {
  const { user } = useAuth();

  return (
    <div>
      {user && <Avatar user={user} />}
      <Navbar />
      <Outlet />
    </div>
  )
}
