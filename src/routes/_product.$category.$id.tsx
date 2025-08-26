import { getProductById } from "@/services/products";
import type { Product, Review } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import {
  createFileRoute,
  useLoaderData,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { useState } from "react";
import ProductReview from "./-components/ProductReview";

export const Route = createFileRoute("/_product/$category/$id")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const queryClient = context?.queryClient;
    const { id } = params;
    if (!id) throw new Error("Product ID is required");
    return queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["product", id],
        queryFn: async () => {
          const product = await getProductById(Number(id));
          if (!product) throw new Error("Product not found");
          return product;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
      })
    );
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

  const productRating = product.rating
    ? new Array(Math.ceil(product.rating)).fill("⭐")
    : null;

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <div className="product-detail-content">
        <div className="product-images">
          {product.images.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} ${index + 1}`}
              className="product-image"
            />
          ))}
        </div>
        <div className="product-info">
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-category">Category: {product.category}</p>
          {product.brand && (
            <p className="product-brand">Brand: {product.brand}</p>
          )}

          {product.rating && (
            <>
              <div className="product-rating-container">
                <p className="product-rating">Rating: {productRating}</p>
                <button
                  onClick={() => setShowReviews((prev) => !prev)}
                  type="button"
                  className="button toggle-reviews"
                >
                  {product.reviews && (
                    <>
                      {!showReviews ? <span>Show </span> : <span>Hide </span>} (
                      {product.reviews.length} reviews)
                    </>
                  )}
                </button>
              </div>
              <div className="product-reviews">
                {showReviews &&
                  product.reviews.map((review: Review, index: number) => (
                    <ProductReview
                      key={`${review.date}-${index}`}
                      review={review}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      {showReviews && <Outlet />}
    </div>
  );
}
