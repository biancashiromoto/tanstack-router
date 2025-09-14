import AppLayout from "@/components/AppLayout";
import { AuthProvider } from "@/context/AuthContext";
import { getProductsCategories } from "@/services/categories";
import type { User } from "@/types";
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

interface RouterContext {
  user: User | null;
  queryClient: QueryClient | null;
  categories: string[];
}

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
    const categories = await getProductsCategories();
    return { user, queryClient, categories };
  },
});
