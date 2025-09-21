import { Box, Typography } from "@mui/material";
import { useCardContext } from "./context/CardContext";
import CardPrice from "./CardPrice";

const CardContent = () => {
  const { product } = useCardContext();

  return (
    <Box sx={{ p: 2, height: 150 }}>
      <Typography variant="h6" component="h3">
        {product.title}
      </Typography>
      <CardPrice />
    </Box>
  );
};
export default CardContent;
