import AppLayout from "@/components/AppLayout";
import { categoriesQueryOptions } from "@/services/categories";
import { Products } from "@/services/products";
import type { IProduct, IUser } from "@/types";
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
      {/* Conteúdo do head, como título e meta tags */}
      <HeadContent />
      {/* Layout principal da aplicação */}
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
    /**
     * Dados globais que queremos carregar antes de qualquer rota
     * Esses dados ficam disponíveis em todas as rotas via useRouteContext() e também podem ser usados para proteger rotas (ex: redirecionar se não autenticado)
     */
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
});
