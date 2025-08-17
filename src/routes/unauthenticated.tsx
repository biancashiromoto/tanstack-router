import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unauthenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h2 className='subtitle'>Unauthenticated</h2>
      <p className='text'>Please log in to access this page.</p>
    </div>
  )
}
