import Card from "@/components/Card";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import usePagination from "@/components/Pagination/hooks/usePagination";
import { getMetaHeader } from "@/helpers";
import type { Product } from "@/types";
import { Box, List, Typography } from "@mui/material";
import {
  createFileRoute,
  Outlet,
  useLoaderData,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_product/$category")({
  component: RouteComponent,
  pendingComponent: () => <Loader />,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page) || 1,
      limit: Number(search?.limit) || 15,
    };
  },
  errorComponent: ({ error }) => <p>Error loading products: {error.message}</p>,
  head: ({ params }) => getMetaHeader(`Products in ${params.category}`),
});

function RouteComponent() {
  const { isLoading } = useRouterState();
  const { products, selectedProduct } = useLoaderData({
    from: "/_product",
  });
  const { page, currentProducts, totalPages } = usePagination();

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
            <Card.Root product={product} shouldShowDiscount>
              <Card.Media />
              <Card.Content />
            </Card.Root>
          ))}
        </List>
      </Box>
      <Pagination />
    </Box>
  );
}
