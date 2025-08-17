import { getUserById } from '@/services/users'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  loader: async ({ context }) => {
    const userId = context.user?.id
    if (userId) {
      try {
        const user = await getUserById(Number(userId))
        return { user }
      } catch (error) {
        console.error('Error loading user:', error)
        return { user: null }
      }
    }
    return { user: null }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useLoaderData({ from: '/_auth/profile' });

  return (
    <div className="profile-container">
      <h2 className='subtitle'>Profile Page</h2>
      {user && (
        <div className="user-info">
          <p className='text'><strong>Welcome, {user.firstName}!</strong></p>
          <img src={user.image} alt="User Avatar" className="avatar" />
          <p className='text'><strong>Address:</strong> {user.address.address} - {user.address.city}, {user.address.state} - {user.address.country}</p>
          <p className='text'><strong>Email:</strong> {user.email}</p>
          <p className='text'><strong>Phone:</strong> {user.phone}</p>
        </div>
      )}
    </div>
  )
}
