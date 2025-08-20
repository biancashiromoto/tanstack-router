import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/unauthenticated' })
    }
    return {}
  },
})

function AuthLayout() {
  return <Outlet />
}
