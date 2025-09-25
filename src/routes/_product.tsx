import Loader from "@/components/Loader";
import { Products } from "@/services/products";
import type { LoaderData, LoaderParams } from "@/types/_product.types";
import { Box } from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const productsService = new Products();

export const Route = createFileRoute("/_product")({
  component: () => (
    <Box sx={{ mx: "auto", py: 2, maxWidth: 1200 }}>
      <Outlet />
    </Box>
  ),
  pendingComponent: () => <Loader />,
  wrapInSuspense: true,
  /**
   * Função responsável por carregar os dados da rota
   * Utiliza o serviço de produtos para buscar produtos por categoria
   * e seleciona o produto específico se o productId estiver presente nos parâmetros
   * Retorna os dados necessários para a rota, incluindo categoria, lista de produtos
   * e o produto selecionado (se aplicável)
   */
  loader: async ({ params, context }: LoaderParams): Promise<LoaderData> => {
    const queryClient = context?.queryClient;
    const { category, productId } = params;

    const products = await queryClient?.ensureQueryData(
      productsService.productsByCategoryQueryOptions(category || "all")
    );

    /**
     * Seleciona o produto específico se o productId estiver presente nos parâmetros
     * Caso contrário, retorna null (caso não haja nenhum produto selecionado)
     */
    const selectedProduct = productId
      ? (products?.products.find((p) => p.id === Number(productId)) ?? null)
      : null;

    return {
      category: category ?? null,
      products: products?.products ?? [],
      selectedProduct,
    };
  },
});
