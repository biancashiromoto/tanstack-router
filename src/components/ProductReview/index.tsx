import { getProductRating } from "@/helpers";
import type { Review } from "@/types";
import { Box, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

const ProductReview = ({ review }: { review: Review }) => {
  const productRating = getProductRating(review.rating);

  return (
    <Box key={review.date} className="review">
      <Box
        className="review__header"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Typography variant="body2">
          <Link
            to="/user/$userId"
            params={{ userId: review.reviewer?.id }}
            mask={{ to: `/user/${review.reviewer?.username}` }}
          >
            {review.reviewer?.firstName} {review.reviewer?.lastName} (
            {review.reviewer?.username})
          </Link>
        </Typography>
        <Typography className="review__date" variant="body2">
          {new Date(review.date).toLocaleDateString()}
        </Typography>
        <Typography
          className="review__rating"
          sx={{ transform: "translateY(-2px)" }}
          variant="body2"
        >
          {productRating && <span>{productRating}</span>}
        </Typography>
      </Box>
      <Typography variant="body2" className="review__comment">
        {review.comment}
      </Typography>
    </Box>
  );
};

export default ProductReview;
