import UsersList from "@/components/UsersList";
import { User } from "@/services/user";
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
  /**
   * Função executada antes de carregar a rota
   * Pode ser usada para redirecionar ou carregar dados adicionais
   * Recebe os mesmos argumentos que a função loader
   */
  beforeLoad: async (args) => console.log("Passou no beforeLoad", args),
  /**
   * Função loader para buscar dados necessários para a rota
   * Pode retornar qualquer tipo de dado, que será acessível via useLoaderData
   * Pode ser assíncrona e retornar uma Promise
   */
  loader: async () => {
    const response = await userService.getAllUsers();
    console.log("Passou no loader");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 1000);
      // throw new Error("Passou aqui!!");
    });
  },
  /**
   * Configurações de cache para os dados carregados pela função loader
   */
  staleTime: 5 * 60 * 1000, // 5 minutos
  /**
   * Tempo para manter os dados em cache após ficarem obsoletos
   */
  gcTime: 10 * 60 * 1000, // 10 minutos - garbage collection
  /**
   * Componente exibido em caso de erro no carregamento da rota
   */
  errorComponent: ({ error }) => (
    <Box>
      <Typography>Error: {error.message}</Typography>
    </Box>
  ),
  /**
   * Componente exibido enquanto o loader está em andamento
   */
  pendingComponent: () => (
    <Box>
      <Typography>Carregando lista de usuários...</Typography>
    </Box>
  ),
  /**
   * Configurações de cabeçalho para a rota
   * Pode ser uma função que retorna um objeto com meta tags ou um objeto estático
   * Usado para SEO e informações da página
   */
  head: () => ({
    meta: [{ title: "TESTE" }],
  }),
  /**
   * Componente exibido quando a rota não é encontrada
   */
  notFoundComponent: () => <div>Not found</div>,
  /**
   * Função executada ao sair da rota
   * Pode ser usada para limpar estados ou exibir mensagens
   */
  onLeave: () => {
    alert("You are leaving the Teste page!");
  },
});

function RouteComponent() {
  /**
   * Uso do hook useLoaderData para acessar os dados carregados pela função loader
   */
  const data = useLoaderData({ from: "/teste" });

  // const routeContext = useRouteContext({ from: "/teste" });
  // console.log("routeContext: ", routeContext);

  /**
   * Exemplo de uso do hook useRouterState para acessar o estado global do roteador
   * Pode ser usado para monitorar mudanças de estado, como carregamento, navegação, etc.
   */
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
