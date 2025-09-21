import CartItem from "@/components/CartItem";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { getMetaHeader } from "@/helpers";
import useCart from "@/hooks/useCart";
import type { Product } from "@/types";
import { Box, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/cart")({
  component: RouteComponent,
  head: () => getMetaHeader(),
});

function RouteComponent() {
  const { user } = useAuth();
  const { cart, isLoading, totalPrice } = useCart();

  if (isLoading) return <Loader />;

  if (!cart) return <Typography>No cart data available</Typography>;

  return (
    <Box className="cart-container">
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {user?.firstName}'s Cart
      </Typography>
      {cart?.products.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cart.products.length > 0 ? (
            cart.products.map((item: Product) => (
              <CartItem key={item.id} item={item} />
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </Box>
      ) : (
        <Typography>No cart data available</Typography>
      )}
      {cart.products.length > 0 && (
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: 2,
            marginLeft: "calc(100% - 150px)",
            textAlign: "right",
          }}
        >
          Total: ${totalPrice.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
}
