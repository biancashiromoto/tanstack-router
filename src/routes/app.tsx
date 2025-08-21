import { useAuth } from '@/context/AuthContext';
import useFetchCategories from '@/hooks/useFetchCategories';
import { HeadContent, Outlet } from '@tanstack/react-router';
import Avatar from './-components/Avatar';
import CategoriesMenu from './-components/CategoriesMenu';
import Navbar from './-components/Navbar';

export function App() {
  const { user } = useAuth();
  const { data: categories, isLoading, error } = useFetchCategories();

  return (
    <>
      <HeadContent />
      <main className={`main ${user ? 'auth' : ''}`}>
        {user && <Avatar user={user} />}
        <Navbar />
        {isLoading && <div>Loading categories...</div>}
        {error && <div>Error loading categories</div>}
        {categories && <CategoriesMenu categories={categories} />}
        <Outlet />
      </main>
    </>
  );
}
