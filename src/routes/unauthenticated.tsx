import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/unauthenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h2 className='subtitle'>Unauthenticated</h2>
      <p className='text'>Please <Link to="/">sign in</Link> to access this page.</p>
    </div>
  )
}
