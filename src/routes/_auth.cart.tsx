import { useAuth } from "@/context/AuthContext";
import { getUsersCartById } from "@/services/users";
import type { Product } from "@/types";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import CartItem from "@/components/CartItem";
import { Box, Typography } from "@mui/material";
import { queryOptions } from "@tanstack/react-query";

export const Route = createFileRoute("/_auth/cart")({
  component: RouteComponent,
  loader: async ({ context }) => {
    return await context?.queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["cart", context.user?.id],
        queryFn: () => getUsersCartById(context.user?.id),
        staleTime: 1000 * 60 * 5, // 5 minutes
      })
    );
  },
  head: () => ({
    meta: [
      {
        title: "Cart",
      },
    ],
  }),
});

function RouteComponent() {
  const { user } = useAuth();
  const cart = useLoaderData({ from: "/_auth/cart" });

  return (
    <Box className="cart-container">
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {user?.firstName}'s Cart
      </Typography>
      {cart.products.length ? (
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
          Total: ${cart.total}
        </Typography>
      )}
    </Box>
  );
}
