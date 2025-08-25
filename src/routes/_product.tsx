import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import Loader from "./-components/Loader";
import { getProductsByCategory } from "@/services/products";
import type { Product } from "@/types";

export type LoaderData = {
  products: {
    products: Product[];
  };
};

export type LoaderParams = {
  params: {
    category: Product["category"];
  };
};

export const Route = createFileRoute("/_product")({
  component: RouteComponent,
  loader: async ({ params }: LoaderParams): Promise<LoaderData> => {
    const category = params.category;
    const products = await getProductsByCategory(category);
    return { products };
  },
});

function RouteComponent() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return isLoading ? <Loader /> : <Outlet />;
}
