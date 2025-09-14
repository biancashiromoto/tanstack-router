import CustomCard from "@/components/Card";
import Loader from "@/components/Loader";
import type { Product } from "@/types";
import { Box, List, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
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

export const Route = createFileRoute("/_product/$category")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page) || 1,
      limit: Number(search?.limit) || 15,
    };
  },
  errorComponent: ({ error }) => <p>Error loading products: {error.message}</p>,
  head: ({ params }) => {
    return {
      meta: [
        {
          title: `Products in ${params.category}`,
        },
      ],
    };
  },
});

function RouteComponent() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const { category, products, selectedProduct } = useLoaderData({
    from: "/_product",
  });
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

  if (!!selectedProduct) return <Outlet />;

  return (
    <Box>
      <Box>
        <Typography variant="body1" className="text">
          {products.length} products found - Showing page {page} of {totalPages}
        </Typography>
        <List
          className="product-list"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 2,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {currentProducts?.map((product: Product) => (
            <CustomCard product={product} key={product.id} />
          ))}
        </List>
      </Box>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, newPage) => handlePageChange(e, newPage)}
          showFirstButton
          showLastButton
          className="pagination"
          sx={{ my: 2, display: "flex", justifyContent: "center" }}
        />
      )}
    </Box>
  );
}
