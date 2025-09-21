import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export default function CardDiscount({
  price,
  discountPercentage,
}: {
  price: number;
  discountPercentage: number;
}) {
  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    2
  );

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
        {discountedPrice}
      </Typography>

      <Chip
        label={`-${discountPercentage}%`}
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
