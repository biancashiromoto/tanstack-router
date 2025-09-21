import AppLayout from "@/components/AppLayout";
import { AuthProvider } from "@/context/AuthContext";
import { categoriesQueryOptions } from "@/services/categories";
import { Products } from "@/services/products";
import type { Product, User } from "@/types";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export interface RouterContext {
  user: User | null;
  queryClient: QueryClient | null;
  categories: string[];
  selectedProduct?: Product;
  dailyDeals: Product[];
}

const productsService = new Products();

function RootComponent() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HeadContent />
          <AppLayout>
            <Outlet />
          </AppLayout>
        </QueryClientProvider>
      </AuthProvider>
      <TanstackDevtools
        config={{
          position: "bottom-left",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

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
});
