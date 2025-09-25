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
            to="/teste/$userId"
            params={{ userId: user.id }}
            mask={{
              to: "/teste/$userId",
              params: { userId: user.username }
            }}
            key={user.id}
            preload="intent"
            preloadDelay={500}
          >
            {user.firstName} {user.lastName}
          </Link>
        ))}
    </List>
  );
});

export default UsersList;
