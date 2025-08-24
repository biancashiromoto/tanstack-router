import type { Review } from "@/types";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import ProductReview from "./-components/ProductReview";

export const Route = createFileRoute("/_product/$category/$id/reviews")({
  component: RouteComponent,
});

function RouteComponent() {
  const product = useLoaderData({ from: "/_product/$category/$id" });

  return (
    <>
      {product.reviews.map((review: Review) => (
        <ProductReview key={review.date} review={review} />
      ))}
    </>
  );
}
