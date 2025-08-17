import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unauthenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h2>Unauthenticated</h2>
      <p>Please log in to access this page.</p>
    </div>
  )
}
