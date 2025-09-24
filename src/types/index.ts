export interface IProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
  reviewer?: IUser;
}

export interface IProduct {
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
  reviews?: IProductReview[];
  discountPercentage?: number;
}

export interface  IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IUser {
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

export interface IUsersCart {
  discountedTotal: number;
  id: number;
  totalProducts: number;
  totalQuantity: number;
  products: IProduct[];
  userId: IUser["id"];
};