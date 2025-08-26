import { useAuth } from "@/context/AuthContext";
import { Outlet } from "@tanstack/react-router";
import useFetchCategories from "@/hooks/useFetchCategories";
import { HeadContent } from "@tanstack/react-router";
import CategoriesMenu from "./CategoriesMenu";
import Header from "./Header";

export function App() {
  const { user } = useAuth();
  const { data: categories } = useFetchCategories();

  return (
    <>
      <HeadContent />
      <main className={`main ${user ? "auth" : ""}`}>
        <Header />
        {categories && <CategoriesMenu categories={categories} />}
        <Outlet />
      </main>
    </>
  );
}
