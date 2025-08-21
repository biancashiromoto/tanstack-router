import { useAuth } from '@/context/AuthContext';
import { Outlet } from '@tanstack/react-router';
import Avatar from './Avatar';
import Navbar from './Navbar';
import { HeadContent } from '@tanstack/react-router';

export function App() {
  const { user } = useAuth();

  return (
    <>
      <HeadContent />
      <div>
        {user && <Avatar user={user} />}
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}
