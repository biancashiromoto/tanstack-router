export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  description?: string;
  brand?: string;
  category?: string;
  stock?: number;
  rating?: number;
}

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: string;
  username: string;
  accessToken?: string;
  email: string;
  gender: string;
  firstName: string;
  lastName: string;
  image?: string;
  password?: string;
}

export type UsersCart = {
  carts: [
    {
      id: number;
      total: number;
      discountPercentage: number;
      products: Product[];
      totalProducts: number;
      totalQuantity: number;
    }
  ],
  total: number;
  skip: number;
  limit: number;
}