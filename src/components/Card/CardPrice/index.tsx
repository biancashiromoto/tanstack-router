import { formatProductPrice } from "@/helpers";
import Typography from "@mui/material/Typography";

interface CardPriceProps {
  price: number;
  showDiscount?: boolean;
}

export default function CardPrice({
  price,
  showDiscount = false,
}: CardPriceProps) {
  const productPrice = formatProductPrice(price);

  return (
    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        gridRow: 2,
        gridColumn: 2,
        justifySelf: "end",
        textDecoration: showDiscount ? "line-through" : "none",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        fontSize: "1rem",
      }}
    >
      {productPrice}
    </Typography>
  );
}
