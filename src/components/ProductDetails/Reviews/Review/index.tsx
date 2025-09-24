import Rating from "@/components/Rating";
import type { IProductReview } from "@/types";
import { Box, Divider, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

const Review = ({ review }: { review: IProductReview }) => {
  return (
    <Box key={review.date} className="review" sx={{ my: 2 }}>
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
            {review.reviewer?.username}
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
      <Divider sx={{ my: 1 }} />
    </Box>
  );
};

export default Review;
