import { useAuth } from '@/context/AuthContext';
import { Outlet } from '@tanstack/react-router';
import Avatar from './Avatar';
// import Navbar from './Navbar';
import { HeadContent } from '@tanstack/react-router';
import useFetchCategories from '@/hooks/useFetchCategories';
import CategoriesMenu from './CategoriesMenu';

export function App() {
  const { user } = useAuth();
  const { data: categories, isLoading, error } = useFetchCategories();

  return (
    <>
      <HeadContent />
      <main className={`main ${user ? 'auth' : ''}`}>
        {user && <Avatar user={user} />}
        {/* <Navbar /> */}
        {isLoading && <div>Loading categories...</div>}
        {error && <div>Error loading categories</div>}
        {categories && <CategoriesMenu categories={categories} />}
        <Outlet />
      </main>
    </>
  );
}
