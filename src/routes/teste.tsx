import UsersList from "@/components/UsersList";
import { User } from "@/services/user";
import type { IUser } from "@/types";
import { Box, Typography } from "@mui/material";
import {
  createFileRoute,
  Outlet,
  useLoaderData,
  // useRouteContext,
  // useRouterState,
} from "@tanstack/react-router";

const userService = new User();

export const Route = createFileRoute("/teste")({
  component: RouteComponent,
  beforeLoad: async (args) => console.log("1️⃣ Passou no beforeLoad", args),
  loader: async (): Promise<IUser[]> => {
    console.log("2️⃣ Passou no loader");
    const response = await userService.getAllUsers();
    return new Promise<IUser[]>((resolve) => {
      // setTimeout(() => {
        resolve(response);
      // }, 1000);
      // throw new Error("Passou aqui!!");
    });
  },
  staleTime: 5 * 60 * 1000, // Configurações de cache para os dados carregados pela função loader (5 minutos)
  gcTime: 10 * 60 * 1000, // Tempo para manter os dados em cache após ficarem obsoletos (10 min)
  errorComponent: ({ error }) => (
    <Box>
      <Typography>Error: {error.message}</Typography>
    </Box>
  ),
  head: () => ({
    meta: [{ title: "TESTE" }],
  }),
  notFoundComponent: () => <div>Not found</div>,
  onLeave: () => {
    alert("You are leaving the Teste page!");
  },
  wrapInSuspense: true,
});

function RouteComponent() {
  const data = useLoaderData({ from: "/teste" }) as IUser[];

  // const routeContext = useRouteContext({ from: "/teste" });
  // console.log("routeContext: ", routeContext);

  // const routerState = useRouterState({ select: (state) => state });
  // console.log("routerState: ", routerState);

  return (
    <Box>
      <Typography variant="h4">Rota teste</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        <UsersList data={data} />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
