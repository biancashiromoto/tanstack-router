import { formatProductPrice } from "@/helpers";
import { Box, Chip, Typography } from "@mui/material";
import { useLoaderData, useSearch } from "@tanstack/react-router";

const Price = () => {
  const product = useLoaderData({
    from: "/_product/$category/$productId",
  });
  const search = useSearch({ from: "/_product/$category/$productId" });
  const previousRoute = decodeURIComponent(search.from || "");
  const shouldNotRender =
    !product.discountPercentage || product.discountPercentage <= 0;

  if (shouldNotRender) return null;

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const formattedPrice = formatProductPrice(product.price);

  const DiscountedPrice = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
        <Typography
          className="product-discount-price"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
          ${discountedPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textDecoration: "line-through",
            fontSize: "1.1rem",
          }}
        >
          ${formattedPrice}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
        <Chip
          label={`-${product.discountPercentage}%`}
          size="small"
          color="error"
          sx={{
            fontSize: "1rem",
            height: "18px",
            "& .MuiChip-label": {
              px: 1,
              py: 0.5,
            },
            width: "fit-content",
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: "success.main", fontSize: "0.75rem" }}
        >
          Especial discount!
        </Typography>
      </Box>
    </Box>
  );

  if (previousRoute === "/") return <DiscountedPrice />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          fontSize: "1.1rem",
        }}
      >
        ${product.price}
      </Typography>
    </Box>
  );
};

export default Price;
