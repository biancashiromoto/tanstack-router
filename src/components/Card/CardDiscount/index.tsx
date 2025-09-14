import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export default function CardDiscount({
  price,
  showDiscount = false,
  discountPercentage,
}: {
  price: number;
  showDiscount?: boolean;
  discountPercentage: number;
}) {
  const calculatedDiscount =
    showDiscount &&
    (Math.round(((price - price * (discountPercentage / 100)) / price) * 100) ||
      0);

  const discountedPrice = price - (price * discountPercentage) / 100;

  return (
    <Box
      sx={{
        gridRow: 2,
        gridColumn: 2,
        justifySelf: "end",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 0.5,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          textDecoration: "line-through",
          fontSize: "0.75rem",
        }}
      >
        U$
        {price}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          fontSize: "0.875rem",
        }}
      >
        U$
        {discountedPrice.toFixed(2)}
      </Typography>

      <Chip
        label={`-${calculatedDiscount}%`}
        size="small"
        color="error"
        sx={{
          fontSize: "1rem",
          height: "18px",
          "& .MuiChip-label": {
            px: 1,
            py: 0.5,
          },
        }}
      />
    </Box>
  );
}
