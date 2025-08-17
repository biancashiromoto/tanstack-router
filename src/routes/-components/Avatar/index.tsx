import type { User } from "@/types"
import { RxAvatar } from "react-icons/rx"

const Avatar = ({ user }: { user: User }) => {
  return (
    <div className="avatar-container">
      {user.image ? <img className="avatar-img" src={user.image} alt="User Avatar" /> : <RxAvatar />}
      <p className="avatar-name">{user.email}</p>
    </div>
  )
}

export default Avatar