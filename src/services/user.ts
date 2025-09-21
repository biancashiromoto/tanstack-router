import type { IProduct, IUser, IUsersCart } from "@/types";
import { queryOptions } from "@tanstack/react-query";

export interface SignInData {
    username: IUser["username"];
    password: IUser["password"];
}
export class User {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://dummyjson.com') {
    this.baseUrl = baseUrl;
  }

  async signIn(data: SignInData): Promise<IUser> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const user = await response.json();

    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    const response = await fetch(`${this.baseUrl}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    console.log('Fetched users:', data.users);
    return data.users;
  }

  async getUsersCartById(userId: IUser["id"]): Promise<IUsersCart> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/carts`);
    if (!response.ok) {
      throw new Error('Failed to fetch user cart');
    }

    const data = await response.json();
    const cart = data.carts[0];
    const enrichedProducts = await this.enrichCartProductsWithDetails(cart).then(c => c.products);
    return {
      ...cart,
      products: enrichedProducts,
    };
  }

  async getUserById(userId: IUser["id"]): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = await response.json();
    return data;
  }

  async getUserByEmail(email: IUser["email"]): Promise<IUser | null> {
    try {
      const response = await fetch(`${this.baseUrl}/users/search?q=${email}`);
      
      if (!response.ok) {
        console.warn(`Failed to fetch user by email ${email}: ${response.status}`);
        return null;
      }

      const data = await response.json();

      if (!data.users || data.users.length === 0) {
        console.warn(`User not found for email: ${email}`);
        return null;
      }
      
      return data.users[0];
    } catch (error) {
      console.error(`Error fetching user by email ${email}:`, error);
      return null;
    }
  }

  async getUsersFromReview(reviewersEmails: IUser["email"][]): Promise<IUser[]> {
    if (!reviewersEmails || reviewersEmails.length === 0) {
      return [];
    }

    const users = await Promise.allSettled(
      reviewersEmails.map(async (email) => {
        if (!email || typeof email !== 'string') {
          console.warn('Invalid email provided:', email);
          return null;
        }
        return await this.getUserByEmail(email);
      })
    );

    return users
      .filter((result): result is PromiseFulfilledResult<IUser | null> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value as IUser);
  }

  async enrichCartProductsWithDetails(cart: IUsersCart): Promise<IUsersCart> {
    const { getProductById } = await import("./products");
    
    const enrichedProducts = await Promise.all(
      cart.products.map(async (product: IProduct) => {
        try {
          const productDetails = await getProductById(String(product.id));
          return {
            ...product,
            category: productDetails?.category || 'uncategorized',
            total: product.price * (product.quantity ?? 1),
          };
        } catch (error) {
          console.warn(`Failed to get product details for ID ${product.id}:`, error);
          return {
            ...product,
            category: 'uncategorized',
            total: product.price * (product.quantity ?? 1),
          };
        }
      })
    );
    return {
      ...cart,
      products: enrichedProducts,
    };
  }

  userQueryOptions = (userId: IUser["id"]) =>
    queryOptions<User>({
      queryKey: ["user", userId],
      queryFn: () => this.getUserById(userId),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export const usersService = new User();

export const getAllUsers = () => usersService.getAllUsers();
export const getUsersCartById = (userId: IUser["id"]) => usersService.getUsersCartById(userId);
export const getUserById = (userId: IUser["id"]) => usersService.getUserById(userId);
export const getUserByEmail = (email: IUser["email"]) => usersService.getUserByEmail(email);
export const getUsersFromReview = (reviewersEmails: IUser["email"][]): Promise<IUser[]> => 
  usersService.getUsersFromReview(reviewersEmails);
