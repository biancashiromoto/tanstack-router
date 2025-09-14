import type { Product } from "@/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";

export interface CustomCardProps {
  product: Product;
}

export default function CustomCard({ product }: CustomCardProps) {
  return (
    <Link
      to="/$category/$id"
      params={{ category: product.category, id: String(product.id) }}
      style={{ textDecoration: "none" }}
      preloadDelay={500}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      >
        <CardMedia
          component="img"
          alt={product.title}
          image={product.images[0]}
        />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gridTemplateRows: "auto auto",
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{ gridColumn: "span 2", height: 50 }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              gridRow: 2,
              gridColumn: 2,
              justifySelf: "end",
            }}
          >
            U${product.price}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
