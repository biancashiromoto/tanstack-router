import Loader from "@/components/Loader";
import { Products } from "@/services/products";
import type { LoaderData, LoaderParams } from "@/types/_product.types";
import { Box } from "@mui/material";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const productsService = new Products();

export const Route = createFileRoute("/_product")({
  component: () => (
    <Box sx={{ mx: "auto", py: 2, maxWidth: 1200 }}>
      <Outlet />
    </Box>
  ),
  pendingComponent: () => <Loader />,
  wrapInSuspense: true,
  loader: async ({ params, context }: LoaderParams): Promise<LoaderData> => {
    const queryClient = context?.queryClient;
    const { category, productId } = params;

    const products = await queryClient?.ensureQueryData(
      queryOptions({
        queryKey: ["products", category],
        queryFn: async () =>
          await productsService.getProductsByCategory(category),
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: Boolean(category),
      })
    );

    const selectedProduct = productId
      ? (products?.products.find((p) => p.id === Number(productId)) ?? null)
      : null;

    return {
      category: category ?? null,
      products: products?.products ?? [],
      selectedProduct,
    };
  },
});
