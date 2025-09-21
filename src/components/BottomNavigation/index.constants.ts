import { RxAvatar } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";

export interface BottomNavigationRoute {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  path: string;
  value: number;
}

export const bottomNavigationRoutes: BottomNavigationRoute[] = [
  { label: "Profile", icon: RxAvatar, path: "/profile", value: 0 },
  { label: "Home", icon: GoHome, path: "/", value: 1 },
  { label: "Cart", icon: AiOutlineShoppingCart, path: "/cart", value: 2 },
];