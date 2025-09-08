import { getProductsByCategory } from "@/services/products";
import type { LoaderData, LoaderParams } from "@/types/_product.types";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_product")({
  component: () => <Outlet />,
  loader: async ({ params }: LoaderParams): Promise<LoaderData> => {
    const category = params.category;
    const { products } = await getProductsByCategory(category);
    return { category, products };
  },
});
