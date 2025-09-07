import { HeadContent, Outlet } from "@tanstack/react-router";

export function App() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  );
}
