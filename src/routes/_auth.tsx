import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Loader from "@/components/Loader";

export const Route = createFileRoute("/_auth")({
  component: () => <Outlet />,
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/unauthenticated" });
  },
  pendingComponent: () => <Loader />,
  wrapInSuspense: true,
});
