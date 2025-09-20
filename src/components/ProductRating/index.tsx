import { Box, Button, Typography } from "@mui/material";
import ProductReview from "../ProductReview";
import type { Product, Review } from "@/types";
import { useState } from "react";

const ProductRating = ({ product }: { product: Product }) => {
  if (!product.reviews) return null;

  const [showReviews, setShowReviews] = useState(false);

  const toggleDisplayReviews = () => setShowReviews((prev) => !prev);

  const productRating = product.rating
    ? new Array(Math.ceil(product.rating)).fill("⭐")
    : null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography className="product-rating">
          Rating: {productRating}
        </Typography>
        <Button
          onClick={toggleDisplayReviews}
          className="button toggle-reviews"
          variant="text"
          sx={{ textWrap: "nowrap" }}
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
            <ProductReview key={`${review.date}-${index}`} review={review} />
          ))}
      </Box>
    </Box>
  );
};

export default ProductRating;
