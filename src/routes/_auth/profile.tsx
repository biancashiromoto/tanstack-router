import { useAuth } from '@/context/AuthContext'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  loader: () => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
      throw redirect({
        to: '/unauthenticated',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      {user && (
        <div className="user-info">
          <p><strong>Welcome, {user.firstName}!</strong></p>
          <img src={user.image} alt="User Avatar" className="avatar" />
        </div>
      )}
    </div>
  )
}
