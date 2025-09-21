import { Box, Button, Typography, Rating as MUIRating } from "@mui/material";
import type { ProductReview } from "@/types";
import { useState } from "react";
import Review from "./Review";
import { useRouteContext } from "@tanstack/react-router";

const Reviews = () => {
  const { selectedProduct } = useRouteContext({
    from: "/_product/$category/$productId",
  });

  if (!selectedProduct || !selectedProduct.reviews?.length) return null;

  const [showReviews, setShowReviews] = useState(false);

  const toggleDisplayReviews = () => setShowReviews((prev) => !prev);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography className="product-rating">Rating:</Typography>
        <MUIRating value={selectedProduct.rating} readOnly precision={0.5} />
        <Button
          onClick={toggleDisplayReviews}
          className="button toggle-reviews"
          variant="text"
          sx={{ textWrap: "nowrap" }}
        >
          {selectedProduct.reviews && (
            <>
              {!showReviews ? <span>Show </span> : <span>Hide </span>} (
              {selectedProduct.reviews.length} reviews)
            </>
          )}
        </Button>
      </Box>
      <Box className="product-reviews">
        {showReviews &&
          selectedProduct.reviews.map(
            (review: ProductReview, index: number) => (
              <Review key={`${review.date}-${index}`} review={review} />
            )
          )}
      </Box>
    </Box>
  );
};

export default Reviews;
