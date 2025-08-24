import { useAuth } from "@/context/AuthContext";
import { Outlet, useParams } from "@tanstack/react-router";
// import Navbar from './Navbar';
import useFetchCategories from "@/hooks/useFetchCategories";
import { HeadContent } from "@tanstack/react-router";
import CategoriesMenu from "./CategoriesMenu";
import Header from "./Header";
import BreadcrumbProducts from "./BreadcrumbProducts";

export function App() {
  const { user } = useAuth();
  const { data: categories, isLoading, error } = useFetchCategories();
  const { category, id } = useParams({ from: "" });

  return (
    <>
      <HeadContent />
      <main className={`main ${user ? "auth" : ""}`}>
        <Header />
        {/* <Navbar /> */}
        {category && <BreadcrumbProducts category={category} productId={id} />}
        {isLoading && <div>Loading categories...</div>}
        {error && <div>Error loading categories</div>}
        {categories && <CategoriesMenu categories={categories} />}
        <Outlet />
      </main>
    </>
  );
}
