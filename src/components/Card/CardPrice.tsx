import { Box, Typography } from "@mui/material";
import { useCardContext } from "./context/CardContext";
import Chip from "../Chip";

const CardPrice = () => {
  const { shouldShowDiscount, product } = useCardContext();

  const price = shouldShowDiscount
    ? product.price - ((product.discountPercentage ?? 0) / 100) * product.price
    : product.price;

  return (
    <Box
      mt={1}
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "column",
      }}
    >
      {shouldShowDiscount && product.discountPercentage && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexDirection: "row",
          }}
        >
          <Typography variant="body1" sx={{ textDecoration: "line-through" }}>
            U${product.price.toFixed(2)}
          </Typography>
          <Chip
            label={`${product.discountPercentage ?? 0}% OFF`}
            color="error"
            size="small"
          />
        </Box>
      )}
      <Typography variant="body1" component="h3">
        U${price.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default CardPrice;
