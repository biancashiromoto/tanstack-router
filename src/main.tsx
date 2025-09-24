import { StrictMode, Suspense, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import reportWebVitals from "./reportWebVitals.ts";
import Loader from "@/components/Loader/index.tsx";
import "./index.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

function RouterWithContext() {
  const { user, isLoading } = useAuth();

  const router = useMemo(
    () =>
      createRouter({
        routeTree,
        context: {
          user,
          queryClient,
          categories: [],
          dailyDeals: [],
        },
        defaultPreload: "intent", // Habilita preload no hover
        defaultPreloadDelay: 300, // 300ms de delay antes do preload
        scrollRestoration: true,
        defaultStructuralSharing: true,
        defaultPreloadStaleTime: 5 * 60 * 1000, // 5 minutos de cache
        defaultPreloadGcTime: 10 * 60 * 1000, // 10 minutos para garbage collection
      }),
    [user?.accessToken]
  );

  if (isLoading) return <Loader />;

  return <RouterProvider router={router} />;
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <AuthProvider>
          <RouterWithContext />
        </AuthProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
