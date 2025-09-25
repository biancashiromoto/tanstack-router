import Card from "@/components/Card";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import usePagination from "@/components/Pagination/hooks/usePagination";
import { formatCategoryName, getMetaHeader } from "@/helpers";
import type { IProduct } from "@/types";
import { Box, List, Typography } from "@mui/material";
import {
  createFileRoute,
  Outlet,
  useLoaderData,
  useParams,
  useRouterState,
} from "@tanstack/react-router";

/**
 * Rota com parâmetro dinâmico
 */
export const Route = createFileRoute("/_product/$category")({
  component: RouteComponent,
  pendingComponent: () => <Loader />,
  errorComponent: ({ error }) => <p>Error loading products: {error.message}</p>,
  head: ({ params }) =>
    getMetaHeader(`Products in ${formatCategoryName(params.category, false)}`),
  validateSearch: (search) => ({
    page: search.page ? Number(search.page) : 1,
    limit: search.limit ? Number(search.limit) : 15,
  }),
  staleTime: 5 * 60 * 1000, // 5 minutos de cache
});

function RouteComponent() {
  const { isLoading } = useRouterState();
  const { products } = useLoaderData({
    from: "/_product",
  });
  const { productId } = useParams({ from: "/_product" });

  const { page, currentProducts, totalPages } = usePagination();

  if (isLoading) return <Loader />;

  if (!!productId) return <Outlet />;

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
          {currentProducts?.map((product: IProduct) => (
            <Card.Root product={product} shouldShowDiscount key={product.id}>
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
