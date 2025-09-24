import { Box, Button, Typography, Rating as MUIRating } from "@mui/material";
import type { IProductReview } from "@/types";
import { useCallback, useMemo, useState } from "react";
import Review from "./Review";
import { useRouteContext } from "@tanstack/react-router";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

const Reviews = () => {
  const { selectedProduct } = useRouteContext({
    from: "/_product/$category/$productId",
  });

  if (!selectedProduct || !selectedProduct.reviews?.length) return null;

  const [showReviews, setShowReviews] = useState(false);

  const toggleDisplayReviews = useCallback(
    () => setShowReviews((prev) => !prev),
    []
  );

  const toggleDisplayReviewsButtonLabel = useMemo(
    () => `${showReviews ? "Hide" : "Show"} reviews (
              ${selectedProduct.reviews.length} reviews)`,
    [showReviews]
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}
      >
        <Typography className="product-rating">Rating:</Typography>
        <MUIRating value={selectedProduct.rating} readOnly precision={0.5} />
        <Typography variant="body2">({selectedProduct.rating})</Typography>
        <Button
          onClick={toggleDisplayReviews}
          className="button toggle-reviews"
          variant="text"
          sx={{
            textWrap: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {showReviews ? <FaAngleUp /> : <FaAngleDown />}
          {toggleDisplayReviewsButtonLabel}
        </Button>
      </Box>
      <Box className="product-reviews">
        {showReviews &&
          selectedProduct.reviews.map(
            (review: IProductReview, index: number) => (
              <Review key={`${review.date}-${index}`} review={review} />
            )
          )}
      </Box>
    </Box>
  );
};

export default Reviews;
