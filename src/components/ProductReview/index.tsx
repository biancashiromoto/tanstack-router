import type { Review } from "@/types";
import { Box, Typography } from "@mui/material";

const ProductReview = ({ review }: { review: Review }) => {
  const productRating = review.rating
    ? new Array(Math.ceil(review.rating)).fill("⭐")
    : null;

  return (
    <Box key={review.date} className="review">
      <Box className="review__header">
        {productRating && <p>{productRating}</p>}
        <Typography className="review__author">
          {review.reviewerName} -
        </Typography>
        <Typography className="review__date">
          {new Date(review.date).toLocaleDateString()}
        </Typography>
      </Box>
      <p className="review__comment">{review.comment}</p>
    </Box>
  );
};

export default ProductReview;
