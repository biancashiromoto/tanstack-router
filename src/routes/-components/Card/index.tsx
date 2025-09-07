import type { Product } from "@/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";

export interface CustomCardProps {
  product: Product;
}

export default function CustomCard({ product }: CustomCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() =>
        navigate({
          to: `/${product.category}/${product.id}`,
        })
      }
      sx={{
        maxWidth: 250,
        width: "100%",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="img"
        alt={product.title}
        image={product.images[0]}
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          U${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
