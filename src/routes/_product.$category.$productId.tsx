import Loader from "@/components/Loader";
import ProductRating from "@/components/ProductRating";
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
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const { isDesktop } = useResponsive();

  if (isLoading) return <Loader />;

  return (
    <Box className="product-detail">
      <Typography variant="h6">{product.title}</Typography>
      <Box
        className="product-detail-content"
        sx={{
          display: "flex",
          flexDirection: !isDesktop ? "column" : "row",
          position: "relative",
          gap: 2,
          alignItems: !isDesktop ? "center" : "flex-start",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Box
          className="product-images"
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {product.images.map((image: string, index: number) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`${product.title} ${index + 1}`}
              width="35dvw"
              sx={{ aspectRatio: "1 / 1" }}
            />
          ))}
        </Box>
        <Box
          sx={{
            py: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            gridRow: 1,
            gridColumn: 2,
          }}
        >
          <Typography className="product-price">${product.price}</Typography>
          <Typography className="product-description">
            {product.description}
          </Typography>
          {product.brand && (
            <Typography className="product-brand">
              Brand: {product.brand}
            </Typography>
          )}

          <ProductRating product={product} />
        </Box>
      </Box>
    </Box>
  );
}
