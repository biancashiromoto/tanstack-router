import Loader from "@/components/Loader";
import { Products } from "@/services/products";
import type { ILoaderData, LoaderParams } from "@/types/_product.types";
import { Box } from "@mui/material";
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
  loader: async ({ params, context }: LoaderParams): Promise<ILoaderData> => {
    const queryClient = context?.queryClient;
    const { category, productId } = params;

    const products = await queryClient?.ensureQueryData(
      productsService.productsByCategoryQueryOptions(category || "all")
    );

    const selectedProduct = productId
      ? (products?.products.find((p) => p.id === Number(productId)) ??
        undefined)
      : undefined;

    return {
      category: category ?? null,
      products: products?.products ?? [],
      selectedProduct,
    };
  },
});
