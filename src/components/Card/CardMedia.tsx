import { useCardContext } from "./context/CardContext";
import { CardMedia as MUICardMedia } from "@mui/material";

const CardMedia = () => {
  const { product } = useCardContext();

  return (
    <MUICardMedia
      component="img"
      image={product.images?.[0] || product.thumbnail}
      alt={product.title}
      sx={{ width: "100%", height: "auto" }}
    />
  );
};

export default CardMedia;
