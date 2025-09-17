import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Loader from "@/components/Loader";

export const Route = createFileRoute("/_auth")({
  component: () => <Outlet />,
  pendingComponent: () => <Loader />,
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/unauthenticated" });
  },
});
