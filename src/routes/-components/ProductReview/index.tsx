import type { Review } from "@/types";

const ProductReview = ({ review }: { review: Review }) => {
  const productRating = review.rating
    ? new Array(Math.ceil(review.rating)).fill("⭐")
    : null;

  return (
    <div key={review.date} className="review">
      <div className="review__header">
        {productRating && <p>{productRating}</p>}
        <p className="review__author">{review.reviewerName} -</p>
        <p className="review__date">
          {new Date(review.date).toLocaleDateString()}
        </p>
      </div>
      <p className="review__comment">{review.comment}</p>
    </div>
  );
};

export default ProductReview;
