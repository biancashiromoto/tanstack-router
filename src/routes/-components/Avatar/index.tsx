import type { User } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { RxAvatar } from "react-icons/rx";

const Avatar = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  return (
    <div
      className="avatar-container"
      onClick={() => navigate({ to: `/profile` })}
      role="link"
    >
      {user.image ? (
        <img className="avatar-img" src={user.image} alt="User Avatar" />
      ) : (
        <RxAvatar />
      )}
      <p className="avatar-email">{user.email}</p>
    </div>
  );
};

export default Avatar;
