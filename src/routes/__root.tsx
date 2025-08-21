import { AuthProvider } from '@/context/AuthContext'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { User } from '@/types'
import { App } from './-components/app'

const queryClient = new QueryClient();

interface RouterContext {
  user: User | null;
  queryClient: QueryClient | null;
}

function RootComponent() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <TanstackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </AuthProvider>
    </>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return { user, queryClient };
  },
})
