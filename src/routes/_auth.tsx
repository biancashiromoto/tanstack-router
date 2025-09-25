import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Loader from "@/components/Loader";

export const Route = createFileRoute("/_auth")({
  /**
   * Componente que renderiza as rotas filhas
   */
  component: () => <Outlet />,
  beforeLoad: async ({ context }) => {
    /**
     * Redireciona para /unauthenticated se o usuário não estiver autenticado
     */
    if (!context.user) throw redirect({ to: "/unauthenticated" });
  },
  /**
   * Componente exibido enquanto a rota está carregando
   */
  pendingComponent: () => <Loader />,
  /**
   * Envolve o componente em um Suspense para carregamento assíncrono
   */
  wrapInSuspense: true,
});
