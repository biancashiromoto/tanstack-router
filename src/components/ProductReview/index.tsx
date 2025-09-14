import { getProductRating } from "@/helpers";
import type { Review } from "@/types";
import { Box, Typography } from "@mui/material";

const ProductReview = ({ review }: { review: Review }) => {
  const productRating = getProductRating(review.rating);
  return (
    <Box key={review.date} className="review">
      <Box
        className="review__header"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Typography className="review__author" variant="body2">
          {review.reviewerName} -
        </Typography>
        <Typography className="review__date" variant="body2">
          {new Date(review.date).toLocaleDateString()}
        </Typography>
        <Typography
          className="review__rating"
          sx={{ transform: "translateY(-2px)" }}
          variant="body2"
        >
          {productRating && <p>{productRating}</p>}
        </Typography>
      </Box>
      <Typography variant="body2" className="review__comment">
        {review.comment}
      </Typography>
    </Box>
  );
};

export default ProductReview;
