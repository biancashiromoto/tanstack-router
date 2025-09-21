export type PageType = {
  name: string;
  path: string;
}

export const pages: PageType[] = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/_auth/profile" },
  { name: "Products", path: "/_product" },
  { name: "Products in <category>", path: "/_product/:category/" },
  { name: "Cart", path: "/_cart" },
  { name: "Login", path: "/_auth/login" },
  { name: "Register", path: "/_auth/register" },
];