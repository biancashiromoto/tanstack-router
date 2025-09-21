import { RxAvatar } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";

export interface BottomNavigationRoute {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  path: string;
  value: number;
  authenticatedRoute: boolean;
}

export const bottomNavigationRoutes: BottomNavigationRoute[] = [
  { label: "Profile", icon: RxAvatar, path: "/profile", value: 0, authenticatedRoute: true },
  { label: "Home", icon: GoHome, path: "/", value: 1, authenticatedRoute: false },
  { label: "Cart", icon: AiOutlineShoppingCart, path: "/cart", value: 2, authenticatedRoute: true },
  { label: "Login", icon: RxAvatar, path: "/login", value: 3, authenticatedRoute: false }
];