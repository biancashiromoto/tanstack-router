import { getMetaHeader } from "@/helpers";
import { User } from "@/services/user";
import type { IUser } from "@/types";
import { Box, Typography } from "@mui/material";
import {
  createFileRoute,
  useLoaderData,
  // useParams,
} from "@tanstack/react-router";

const userService = new User();

export const Route = createFileRoute("/teste/$userId")({
  component: RouteComponent,
  /**
   * Função loader para buscar dados necessários para a rota
   * Pode retornar qualquer tipo de dado, que será acessível via useLoaderData
   * Pode ser assíncrona e retornar uma Promise
   */
  loader: async ({ params }) => {
    if (!params.userId) return null;
    const response: IUser = await userService.getUserById(params.userId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 2500);
      // throw new Error("Passou aqui!!");
    });
  },
  /**
   * Função para definir os metadados da página
   * Pode usar dados carregados pelo loader
   * Útil para SEO e compartilhamento em redes sociais
   */
  head: (ctx) =>
    getMetaHeader(
      `${(ctx.loaderData as IUser)?.firstName} ${
        (ctx.loaderData as IUser)?.lastName
      }`
    ),
  /**
   * Componente exibido enquanto o loader está em andamento
   */
  pendingComponent: () => (
    <Box>
      <Typography>Carregando informações do usuário...</Typography>
    </Box>
  ),
  /**
   * Componente exibido quando ocorre um erro no loader
   */
  errorComponent: ({ error }) => (
    <Box>
      <Typography>Erro: {error.message}</Typography>
      <Typography>Usuário não encontrado</Typography>
    </Box>
  ),
});

function RouteComponent() {
  const data: IUser = useLoaderData({ from: "/teste/$userId" });
  // const { userId } = useParams({ from: "" });
  // console.log(userId);

  return (
    <Box
      sx={{
        backgroundColor: "lightcyan",
        padding: 1,
      }}
    >
      <Typography>
        {data.firstName} {data.lastName}
      </Typography>
      <Typography>@{data.username}</Typography>
      <Typography>{data.email}</Typography>
    </Box>
  );
}
