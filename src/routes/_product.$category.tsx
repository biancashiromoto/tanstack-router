import { getProductsByCategory } from "@/services/products";
import type { Product } from "@/types";
import { Box, List, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { queryOptions } from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useRouterState,
  useSearch,
} from "@tanstack/react-router";
import React from "react";
import CustomCard from "./-components/Card";
import Loader from "./-components/Loader";

export const Route = createFileRoute("/_product/$category")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page) || 1,
      limit: Number(search?.limit) || 15,
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
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
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

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ mx: "auto", py: 2, maxWidth: 1200 }}>
      {!isProductSelected && (
        <>
          <Typography variant="body1" className="text">
            {products.length} products found - Showing page {page} of{" "}
            {totalPages}
          </Typography>
          <List
            className="product-list"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
              justifyContent: "center",
            }}
          >
            {currentProducts?.map((product: Product) => (
              <CustomCard product={product} key={product.id} />
            ))}
          </List>
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
    </Box>
  );
}
