import {
  createFileRoute,
  redirect,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import Loader from "@/components/Loader";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/unauthenticated" });
    }
  },
});

function AuthLayout() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  return isLoading ? <Loader /> : <Outlet />;
}
