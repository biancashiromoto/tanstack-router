import { Rating as MUIRating } from "@mui/material";

const Rating = ({ value }: { value: number }) => (
  <MUIRating value={value} readOnly precision={0.5} />
);

export default Rating;
