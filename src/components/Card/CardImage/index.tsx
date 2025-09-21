import CardMedia from "@mui/material/CardMedia";

interface CardImageProps {
  src: string;
  alt: string;
}

export default function CardImage({ src, alt }: CardImageProps) {
  return (
    <CardMedia
      component="img"
      alt={alt}
      image={src}
      sx={{ aspectRatio: "1 / 1" }}
    />
  );
}
