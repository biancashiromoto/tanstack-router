import AppLayout from "@/components/AppLayout";
import Loader from "@/components/Loader";
import { categoriesQueryOptions } from "@/services/categories";
import { Products } from "@/services/products";
import type { IProduct, IUser } from "@/types";
import { Box, Typography } from "@mui/material";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export interface RouterContext {
  user: IUser | null;
  queryClient: QueryClient | null;
  categories: string[];
  selectedProduct?: IProduct;
  dailyDeals: IProduct[];
}

const productsService = new Products();

function RootComponent() {
  return (
    <>
      <HeadContent />
      <AppLayout>
        <Outlet />
      </AppLayout>
      <TanstackDevtools
        config={{
          position: "bottom-left",
        }}
        plugins={[
          {
            name: "Tanstack Market",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: async ({ context }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const { queryClient } = context;

    if (!queryClient) {
      throw new Error("QueryClient not found in context");
    }

    const categories = await queryClient.ensureQueryData(
      categoriesQueryOptions()
    );

    const dailyDeals = await queryClient.ensureQueryData(
      productsService.dailyDealsQueryOptions()
    );

    return {
      user,
      queryClient,
      categories,
      selectedProduct: undefined,
      dailyDeals,
    };
  },
  pendingComponent: () => <Loader />,
  notFoundComponent: () => (
    <Box sx={{ padding: 2 }}>
      <Typography>Page Not Found</Typography>
    </Box>
  ),
});
