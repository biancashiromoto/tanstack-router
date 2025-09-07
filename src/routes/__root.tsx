import { AuthProvider } from "@/context/AuthContext";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { User } from "@/types";
import { App } from "./-components/app";
import { getProductsCategories } from "@/services/categories";

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
          <App />
        </QueryClientProvider>
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
      </AuthProvider>
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
