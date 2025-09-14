import type { Product } from "@/types";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

type CartItemProps = {
  item: Product;
};

const CartItem = ({ item }: CartItemProps) => {
  const navigate = useNavigate();

  const handleClick = () =>
    navigate({
      to: "/cart/$id",
      params: { category: item.category, id: item.id.toString() },
    });

  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 1,
        border: "1px solid #ccc",
        borderRadius: 1,
        justifyContent: "space-between",
      }}
    >
      <Box
        component="img"
        src={item.thumbnail}
        alt={item.title}
        className="cart-thumbnail"
        width="75px"
        height="75px"
        sx={{ objectFit: "cover", borderRadius: 1 }}
      />
      <Typography variant="body2" sx={{ flexGrow: 1, maxWidth: "150px" }}>
        {item.title}
      </Typography>
      <Typography>${item.price}</Typography>
      <Typography sx={{ padding: "0 16px" }}>{item.quantity}</Typography>
    </Box>
  );
};

export default CartItem;
