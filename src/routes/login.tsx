import Loader from "@/components/Loader";
import LoginForm from "@/components/LoginForm";
import { getMetaHeader } from "@/helpers";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: () => <LoginForm />,
  pendingComponent: () => <Loader />,
  head: () => getMetaHeader("Login"),
  beforeLoad: ({ context }) => {
    if (context?.user?.accessToken) throw redirect({ to: "/profile" });
  },
});
