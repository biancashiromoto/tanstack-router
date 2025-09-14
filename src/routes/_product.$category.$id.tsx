import Loader from "@/components/Loader";
import ProductReview from "@/components/ProductReview";
import useResponsive from "@/hooks/useResponsive";
import { getProductById } from "@/services/products";
import type { Product, Review } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import { queryOptions } from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  useLoaderData,
  useRouterState,
} from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_product/$category/$id")({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    if (!params.id || typeof params.id !== "string")
      throw new Error("Product ID is required");
  },
  loader: async ({ params, context }) => {
    const product = await context?.queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["product", params.id],
        queryFn: () => getProductById(params.id),
        staleTime: 1000 * 60 * 5, // 5 minutes
      })
    );
    if (!product) throw new Error("Failed to load product or reviewers");
    return product;
  },
  errorComponent: ({ error }) => {
    return <p>Error loading product details: {error.message}</p>;
  },
  head: ({ loaderData }: { loaderData?: Product }) => {
    if (!loaderData) return { meta: [{ title: "Product not found" }] };
    return {
      meta: [
        {
          title: loaderData.title,
        },
      ],
    };
  },
});

function RouteComponent() {
  const product = useLoaderData({ from: "/_product/$category/$id" });
  const [showReviews, setShowReviews] = useState(false);
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const { isMobile, isTablet } = useResponsive();

  const productRating = product.rating
    ? new Array(Math.ceil(product.rating)).fill("⭐")
    : null;

  if (isLoading) return <Loader />;

  return (
    <Box className="product-detail">
      <Typography variant="h6">{product.title}</Typography>
      <Box
        className="product-detail-content"
        sx={{
          display: "flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          position: "relative",
          gap: 2,
          alignItems: isMobile || isTablet ? "center" : "flex-start",
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

          {product.rating && (
            <Box sx={{ position: "relative" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography className="product-rating">
                  Rating: {productRating}
                </Typography>
                <Button
                  onClick={() => setShowReviews((prev) => !prev)}
                  className="button toggle-reviews"
                  variant="text"
                >
                  {product.reviews && (
                    <>
                      {!showReviews ? <span>Show </span> : <span>Hide </span>} (
                      {product.reviews.length} reviews)
                    </>
                  )}
                </Button>
              </Box>
              <Box className="product-reviews">
                {showReviews &&
                  product.reviews.map((review: Review, index: number) => (
                    <ProductReview
                      key={`${review.date}-${index}`}
                      review={review}
                    />
                  ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {showReviews && <Outlet />}
    </Box>
  );
}
