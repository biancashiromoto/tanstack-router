import { useAuth } from '@/context/AuthContext'
import { createFileRoute } from '@tanstack/react-router'
import Loader from '../-components/Loader';

export const Route = createFileRoute('/_auth/profile')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Profile',
      }
    ]
  }),
  errorComponent: () => <p>Error loading profile.</p>,
})

function RouteComponent() {
  const { user: authUser } = useAuth();

  return (
    <div className="profile-container">
      <h2 className='subtitle'>Profile Page</h2>
      {authUser ? (
        <div className="user-info">
          <p className='text'><strong>Welcome, {authUser.firstName}!</strong></p>
          <img src={authUser.image} alt="User Avatar" className="avatar" />
          {authUser.address && (
            <p className='text'><strong>Address:</strong> {authUser.address.address} - {authUser.address.city}, {authUser.address.state} - {authUser.address.country}</p>
          )}
          <p className='text'><strong>Email:</strong> {authUser.email}</p>
          <p className='text'><strong>Phone:</strong> {authUser.phone}</p>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}
