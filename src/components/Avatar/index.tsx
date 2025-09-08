import type { User } from "@/types";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { RxAvatar } from "react-icons/rx";

const Avatar = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate({ to: `/profile` })}
      role="link"
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 1,
        gridColumn: 1,
      }}
    >
      {user.image ? (
        <Box
          sx={{
            borderRadius: "50%",
            overflow: "hidden",
            width: 25,
            height: 25,
          }}
          component="img"
          src={user.image}
          alt="User Avatar"
        />
      ) : (
        <RxAvatar />
      )}
      <Typography variant="body1" className="avatar-email">
        {user.email}
      </Typography>
    </Box>
  );
};

export default Avatar;
