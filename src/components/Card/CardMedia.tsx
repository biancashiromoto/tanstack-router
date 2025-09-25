import { useCardContext } from "./context/CardContext";
import { CardMedia as MUICardMedia, Skeleton } from "@mui/material";
import { Suspense } from "react";

const LazyImage = ({ src, alt }: { src: string; alt: string }) => (
  <MUICardMedia
    component="img"
    image={src}
    alt={alt}
    loading="lazy"
    sx={{
      width: "100%",
      height: 200,
      objectFit: "contain",
      objectPosition: "center",
    }}
  />
);

const CardMedia = () => {
  const { product } = useCardContext();
  const imageUrl = product.images?.[0] || product.thumbnail;

  return (
    <Suspense
      fallback={
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
        />
      }
    >
      <LazyImage src={imageUrl || ""} alt={product.title} />
    </Suspense>
  );
};

export default CardMedia;
