import { useAuth } from "@/context/AuthContext";
import { getUsersCartById } from "@/services/users";
import type { Product } from "@/types";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import CartItem from "@/components/CartItem";
import { Box, Typography } from "@mui/material";
import { getProductById } from "@/services/products";
import { queryOptions } from "@tanstack/react-query";

export const Route = createFileRoute("/_auth/cart")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const {
      queryClient,
      user: { id },
    } = context;
    const userId = context.user?.id;
    const cart = await getUsersCartById(userId);

    const products = await queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["product", id],
        queryFn: async () =>
          await Promise.all(
            cart[0]?.products?.map(async (product) => {
              if (!product.category) {
                const fullProduct = await getProductById(product.id);
                return { ...product, category: fullProduct.category };
              }
              return product;
            }) || []
          ),
        staleTime: 1000 * 60 * 5, // 5 minutes
      })
    );

    return {
      cart: {
        ...cart[0],
        products,
      },
    };
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
  const {
    cart: { products, total },
  } = useLoaderData({ from: "/_auth/cart" });

  return (
    <Box className="cart-container">
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {user?.firstName}'s Cart
      </Typography>
      {products ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {products.length > 0 ? (
            products.map((item: Product) => (
              <CartItem key={item.id} item={item} />
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </Box>
      ) : (
        <Typography>No cart data available</Typography>
      )}
      {products.length > 0 && (
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: 2,
            marginLeft: "calc(100% - 150px)",
            textAlign: "right",
          }}
        >
          Total: ${total}
        </Typography>
      )}
    </Box>
  );
}
