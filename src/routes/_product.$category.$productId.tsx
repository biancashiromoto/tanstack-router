import Loader from "@/components/Loader";
import Images from "@/components/ProductDetails/Images";
import Info from "@/components/ProductDetails/Info";
import { getMetaHeader } from "@/helpers";
import useResponsive from "@/hooks/useResponsive";
import { Products } from "@/services/products";
import type { Product } from "@/types";
import { Box, Typography } from "@mui/material";
import {
  createFileRoute,
  useLoaderData,
  useRouterState,
} from "@tanstack/react-router";
import type { RouterContext } from "./__root";

export interface ProductRouteLoaderData {
  product: Product;
}

export interface ProductRouteParams {
  category: string;
  productId: Product["id"];
}

const productsService = new Products();

export const Route = createFileRoute("/_product/$category/$productId")({
  component: RouteComponent,
  beforeLoad: async ({
    params,
    context,
  }: {
    params: ProductRouteParams;
    context: RouterContext;
  }) => {
    const product =
      (await context?.queryClient?.ensureQueryData(
        productsService.selectedProductQueryOptions(Number(params.productId))
      )) ?? null;
    if (!product) throw new Error("Product not found");
    context.selectedProduct = product;
  },
  loader: async ({ context }) => context.selectedProduct,
  errorComponent: ({ error }) => (
    <p>Error loading product details: {error.message}</p>
  ),
  head: ({ loaderData }: { loaderData?: Product }) =>
    getMetaHeader(loaderData?.title ?? "Product not found"),
});

function RouteComponent() {
  const product = useLoaderData({ from: "/_product/$category/$productId" });
  const isLoading = useRouterState({
    select: (s) => s.isLoading,
  });
  const { isDesktop } = useResponsive();

  if (isLoading) return <Loader />;

  return (
    <Box className="product-detail">
      <Box
        className="product-detail-content"
        sx={{
          display: "flex",
          flexDirection: !isDesktop ? "column" : "row",
          position: "relative",
          gap: 1,
          alignItems: !isDesktop ? "center" : "flex-start",
          justifyContent: "center",
          mt: 2,
          height: "100dvh",
        }}
      >
        <Images />
        <Box>
          <Typography variant="h6" sx={{ alignSelf: "flex-start" }}>
            {product.title}
          </Typography>
          <Info />
        </Box>
      </Box>
    </Box>
  );
}
