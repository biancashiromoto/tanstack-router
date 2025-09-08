import { getProductsByCategory } from "@/services/products";
import { Box } from "@mui/material";
import {
  createFileRoute,
  Outlet,
  useParams,
  useRouterState,
} from "@tanstack/react-router";
import BreadcrumbProducts from "@/components/BreadcrumbProducts";
import Loader from "@/components/Loader";
import type { LoaderData, LoaderParams } from "@/types/_product.types";

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

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ mx: "auto", p: 1 }}>
      <BreadcrumbProducts category={category} productId={id} />
      <Outlet />
    </Box>
  );
}
