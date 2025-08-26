import ProductItem from "@/routes/-components/ProductItem";
import { getProductsCategories } from "@/services/categories";
import { getProductsByCategory } from "@/services/products";
import type { Product } from "@/types";
import Pagination from "@mui/material/Pagination";
import { queryOptions } from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_product/$category")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page) || 1,
      limit: Number(search?.limit) || 5,
    };
  },
  loader: async ({ params, context }) => {
    const queryClient = context?.queryClient;
    const category = params.category;
    if (!category) throw new Error("Category is required");
    return queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["products", category],
        queryFn: async () => {
          const { products } = await getProductsByCategory(category);
          return { products, category };
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
      })
    );
  },
  beforeLoad: async ({ params }) => {
    const category = params.category;
    const categories = await getProductsCategories();
    if (!categories.includes(category))
      throw new Error(`Category ${category} not found`);
  },
  errorComponent: ({ error }) => <p>Error loading products: {error.message}</p>,
  head: ({ loaderData: { category } }: { loaderData?: any }) => {
    return {
      meta: [
        {
          title: `Products in ${category}`,
        },
      ],
    };
  },
});

function RouteComponent() {
  const { products } = useLoaderData({ from: "/_product/$category" });
  const { category } = useLoaderData({ from: "/_product" });
  const { id } = useParams({ from: "" });
  const isProductSelected = !!id;
  const { page, limit } = useSearch({ from: "/_product/$category" });
  const navigate = useNavigate();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / limit);

  const handlePageChange = (
    _e: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    navigate({
      to: "/$category",
      params: { category },
      search: { page: newPage, limit },
    });
  };

  return (
    <>
      {!isProductSelected && (
        <>
          <p className="text">
            {products.length} products found - Showing page {page} of{" "}
            {totalPages}
          </p>
          <ul className="product-list">
            {currentProducts?.map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
        </>
      )}
      {isProductSelected && <Outlet />}
      {!isProductSelected && totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, newPage) => handlePageChange(e, newPage)}
          showFirstButton
          showLastButton
          className="pagination"
        />
      )}
    </>
  );
}
