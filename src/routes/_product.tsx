import {
  createFileRoute,
  Outlet,
  useParams,
  useRouterState,
} from "@tanstack/react-router";
import Loader from "./-components/Loader";
import { getProductsByCategory } from "@/services/products";
import type { Product } from "@/types";
import BreadcrumbProducts from "./-components/BreadcrumbProducts";
import { Box } from "@mui/material";

export type LoaderData = {
  products: {
    products: Product[];
  };
  category: Product["category"];
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
    return { category, products };
  },
});

function RouteComponent() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const { category, id } = useParams({ from: "" });

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <BreadcrumbProducts category={category} productId={id} />
          <Outlet />
        </>
      )}
    </Box>
  );
}
