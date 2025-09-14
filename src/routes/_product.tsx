import { getProductsByCategory } from "@/services/products";
import type { LoaderData, LoaderParams } from "@/types/_product.types";
import { Box } from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_product")({
  component: () => (
    <Box sx={{ mx: "auto", py: 2, maxWidth: 1200 }}>
      <Outlet />
    </Box>
  ),
  loader: async ({ params }: LoaderParams): Promise<LoaderData> => {
    const category = params.category;
    const { products } = await getProductsByCategory(category);
    return { category, products };
  },
});
