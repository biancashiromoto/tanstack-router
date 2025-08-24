import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_product")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
