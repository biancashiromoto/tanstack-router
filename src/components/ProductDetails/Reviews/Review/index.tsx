import Rating from "@/components/Rating";
import type { ProductReview } from "@/types";
import { Box, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

const Review = ({ review }: { review: ProductReview }) => {
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
        <Rating value={review.rating} />
      </Box>
      <Typography variant="body2" className="review__comment">
        {review.comment}
      </Typography>
    </Box>
  );
};

export default Review;
