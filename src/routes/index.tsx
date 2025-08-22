import { createFileRoute, redirect } from '@tanstack/react-router';
import '../App.scss';
import LoginForm from '@/routes/-components/LoginForm';

export const Route = createFileRoute('/')({
  component: App,
  loader: async ({ context }) => {
    const user = context.user;
    if (user) throw redirect({ to: '/profile'});
    return { user: null };
  },
});

function App() {
  return (
    <div className="home-container">
      <h1>TanStack Router Example</h1>
      <LoginForm />
    </div>
  );
}
