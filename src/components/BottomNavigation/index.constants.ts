import { RxAvatar } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";

export interface BottomNavigationRoute {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  path: string;
  value: number;
}

export enum RouteValue {
  authenticated = 0,
  unauthenticated = 1,
  all = 2,
}

export const bottomNavigationRoutes: BottomNavigationRoute[] = [
  { label: "Profile", icon: RxAvatar, path: "/profile", value: RouteValue.authenticated },
  { label: "Home", icon: GoHome, path: "/", value: RouteValue.all },
  { label: "Cart", icon: AiOutlineShoppingCart, path: "/cart", value: RouteValue.authenticated },
  { label: "Login", icon: RxAvatar, path: "/login", value: RouteValue.unauthenticated },
  { label: "Logout", icon: VscSignOut, path: "/", value: RouteValue.authenticated },
];