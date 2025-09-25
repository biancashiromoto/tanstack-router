import useResponsive from "@/hooks/useResponsive";
import type { IProduct } from "@/types";
import { Box, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

type CartItemProps = {
  item: IProduct;
};

const CartItem = ({ item }: CartItemProps) => {
  const { isMobile } = useResponsive();

  const renderCartItem = () => {
    if (!isMobile) {
      return (
        <>
          <Typography variant="body2" sx={{ flexGrow: 1, maxWidth: "150px" }}>
            {item.title}
          </Typography>
          <Typography>${item.price}</Typography>
          <Typography sx={{ padding: "0 16px" }}>{item.quantity}</Typography>
        </>
      );
    }
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}
      >
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {item.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}>
          <Typography>${item.price}</Typography>
          <Typography sx={{ paddingRight: "16px" }}>{item.quantity}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Link
      to="/$category/$productId"
      params={{ productId: item.id, category: item.category }}
      mask={{ to: "/$category/$productId", params: { category: item.category, productId: item.title as any } }}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 1,
          border: "1px solid #ccc",
          borderRadius: 1,
          justifyContent: `${isMobile ? "flex-start" : "space-between"}`,
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
        {renderCartItem()}
      </Box>
    </Link>
  );
};

export default CartItem;
