export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
  reviewer?: User;
}

export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  thumbnail?: string;
  description?: string;
  brand?: string;
  category: string;
  stock?: number;
  rating?: number;
  quantity?: number;
  reviews?: Review[];
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
  phone?: string;
  address?: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
}

export type UsersCart = [
  {
    discountedTotal: number;
    id: number;
    totalProducts: number;
    totalQuantity: number;
    products: Product[];
    userId: number;
  }
]