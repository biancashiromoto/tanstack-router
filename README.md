# 🛒 ShopHub - Modern E-commerce Platform

A modern, full-featured e-commerce application built with React, TypeScript, and TanStack Router. This project demonstrates a complete shopping experience with user authentication, product catalog, shopping cart, and more.

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
