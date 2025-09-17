import Typography from "@mui/material/Typography";

interface CardPriceProps {
  price: number;
  currency?: string;
  showDiscount?: boolean;
}

export default function CardPrice({
  price,
  currency = "U$",
  showDiscount = false,
}: CardPriceProps) {
  return (
    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        gridRow: 2,
        gridColumn: 2,
        justifySelf: "end",
        textDecoration: showDiscount ? "line-through" : "none",
      }}
    >
      {currency}
      {price}
    </Typography>
  );
}
