import { Box } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";

const Images = () => {
  const product = useLoaderData({
    from: "/_product/$category/$productId",
  });

  if (!product || !product.images.length) return null;

  return (
    <Box
      className="product-images"
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {product.images.map((image: string, index: number) => (
        <Box
          key={index}
          component="img"
          src={image}
          alt={`${product.title} ${index + 1}`}
          width="35dvw"
          sx={{ aspectRatio: "1 / 1" }}
        />
      ))}
    </Box>
  );
};

export default Images;
