import { Box, Typography } from "@mui/material";
import { useCardContext } from "./context/CardContext";
import CardPrice from "./CardPrice";
import Rating from "../Rating";

const CardContent = () => {
  const { product } = useCardContext();

  return (
    <Box sx={{ p: 2, height: 150 }}>
      <Typography variant="h6" component="h3">
        {product.title}
      </Typography>
      <CardPrice />
      {product.rating && <Rating value={product.rating} />}
    </Box>
  );
};
export default CardContent;
