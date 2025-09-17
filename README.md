# 🛒 ShopHub - Modern E-commerce Platform

A modern, full-featured e-commerce application built with React, TypeScript, and TanStack Router. This project demonstrates a complete shopping experience with user authentication, product catalog, shopping cart, and more.

## ✨ Features

- 🔐 **User Authentication** - Login/logout with persistent sessions
- 🛍️ **Product Catalog** - Browse products by categories
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 🏷️ **Daily Deals** - Special discounts and offers
- 🔍 **Product Search** - Find products quickly
- 👤 **User Profile** - Manage user information
- 📱 **Responsive Design** - Works on desktop and mobile
- ⭐ **Product Reviews** - View and manage product ratings
- 🎨 **Material-UI Design** - Modern, accessible interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/biancashiromoto/tanstack-router.git
cd tanstack-router
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start
```

The application will be available at `http://localhost:3000`

## 🏗️ Building For Production

To build this application for production:

```bash
npm run build
```

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for testing. Run tests with:

```bash
npm run test
```

## 🎨 Styling

This project uses:

- **Material-UI (MUI)** - Component library and design system
- **SCSS** - Enhanced CSS with variables and mixins
- **Emotion** - CSS-in-JS for dynamic styling

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Routing:** TanStack Router
- **State Management:** TanStack Query (React Query)
- **UI Components:** Material-UI (MUI v7)
- **Styling:** Emotion + SCSS
- **Icons:** React Icons
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── AppLayout/      # Main layout wrapper
│   ├── Card/           # Product card components
│   ├── Header/         # Navigation header
│   ├── LoginForm/      # Authentication form
│   └── ...
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── routes/             # TanStack Router route definitions
├── services/           # API service classes
├── types/              # TypeScript type definitions
└── helpers/            # Utility functions
```

## 🔐 Authentication

The app uses a mock authentication system with the following test credentials:

- **Username:** `emilys`
- **Password:** `emilyspass`

## 🌐 API Integration

This project integrates with the [DummyJSON API](https://dummyjson.com) for:

- Product catalog and categories
- User authentication
- Shopping cart data
- User profiles

## 📱 Routes

- `/` - Home page with daily deals
- `/login` - User authentication
- `/profile` - User profile page
- `/cart` - Shopping cart
- `/{category}` - Product category listings
- `/{category}/{productId}` - Product details
- `/user/{userId}` - User details page




## 🚦 Routing

This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).


## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query is an excellent addition or alternative to route loading and integrating it into you application is a breeze.

First add your dependencies:

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

Next we'll need to create a query client and provider. We recommend putting those in `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ...

const queryClient = new QueryClient();

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

You can also add TanStack Query Devtools to the root route (optional).

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
});
```

Now you can use `useQuery` to fetch your data.

```tsx
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

You can find out everything you need to know on how to use React-Query in the [React-Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview).

## State Management

Another common requirement for React applications is state management. There are many options for state management in React. TanStack Store provides a great starting point for your project.

First you need to add TanStack Store as a dependency:

```bash
npm install @tanstack/store
```

Now let's create a simple counter in the `src/App.tsx` file as a demonstration.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

function App() {
  const count = useStore(countStore);
  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
    </div>
  );
}

export default App;
```

One of the many nice features of TanStack Store is the ability to derive state from other state. That derived state will update when the base state updates.

Let's check this out by doubling the count using derived state.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

function App() {
  const count = useStore(countStore);
  const doubledCount = useStore(doubledStore);

  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
      <div>Doubled - {doubledCount}</div>
    </div>
  );
}

export default App;
```

We use the `Derived` class to create a new store that is derived from another store. The `Derived` class has a `mount` method that will start the derived store updating.

Once we've created the derived store we can use it in the `App` component just like we would any other store using the `useStore` hook.

You can find out everything you need to know on how to use TanStack Store in the [TanStack Store documentation](https://tanstack.com/store/latest).

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build
- `npm run test` - Run tests

### Key Features Implemented

- **File-based routing** with TanStack Router
- **Type-safe navigation** with TypeScript
- **Responsive design** with Material-UI breakpoints
- **State management** with React Query
- **Form handling** with controlled components
- **Error boundaries** for better UX
- **Loading states** throughout the app

## 📚 Learn More

- [TanStack Router Documentation](https://tanstack.com/router)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://react.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

**Bianca Shiromoto** - [GitHub](https://github.com/biancashiromoto)
