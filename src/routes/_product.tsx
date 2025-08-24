import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import Loader from "./-components/Loader";

export const Route = createFileRoute("/_product")({
  component: RouteComponent,
});

function RouteComponent() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return isLoading ? <Loader /> : <Outlet />;
}
