import type { IUser } from "@/types";
import { List } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { memo } from "react";

const UsersList = memo(({ data }: { data: IUser[] }) => {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "space-between",
      }}
    >
      {data &&
        data.map((user: IUser) => (
          <Link
            /**
             * Rota de destino com parâmetro dinâmico userId
             * O parâmetro userId será substituído pelo id do usuário
             */
            to="/teste/$userId"
            params={{ userId: user.id }}
            key={user.id}
            /**
             * Propriedades de pré-carregamento para melhorar a experiência do usuário
             * preload: "intent" - pré-carrega quando o usuário demonstra intenção (hover, foco)
             * preload: "render" - pré-carrega imediatamente ao renderizar o link
             * preload: "viewport" - pré-carrega quando o link entra na viewport
             * preloadDelay: 10000 - atraso de 10 segundos antes de iniciar o pré-carregamento
             * mask: { to: `/teste/${user.username}` } - URL exibida na barra de endereços
             */
            preload="intent"
            preloadDelay={500}
            mask={{ to: `/teste/${user.username}` }}
          >
            {user.firstName} {user.lastName}
          </Link>
        ))}
    </List>
  );
});

export default UsersList;
