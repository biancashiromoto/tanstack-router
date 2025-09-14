import type { User, UsersCart } from "@/types";

export class Users {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://dummyjson.com') {
    this.baseUrl = baseUrl;
  }

  async signIn(username: User["username"], password: User["password"]): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }

  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    console.log('Fetched users:', data.users);
    return data.users;
  }

  async getUsersCartById(userId: User["id"]): Promise<UsersCart> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/carts`);
    if (!response.ok) {
      throw new Error('Failed to fetch user cart');
    }
    const data = await response.json();

    return data.carts[0];
  }

  async getUserById(userId: User["id"]): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = await response.json();
    return data;
  }

  async getUserByEmail(email: User["email"]): Promise<User | null> {
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

  async getUsersFromReview(reviewersEmails: User["email"][]): Promise<User[]> {
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
      .filter((result): result is PromiseFulfilledResult<User | null> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value as User);
  }
}

export const usersService = new Users();

export const signIn = (username: User["username"], password: User["password"]) => 
  usersService.signIn(username, password);
export const getAllUsers = () => usersService.getAllUsers();
export const getUsersCartById = (userId: User["id"]) => usersService.getUsersCartById(userId);
export const getUserById = (userId: User["id"]) => usersService.getUserById(userId);
export const getUserByEmail = (email: User["email"]) => usersService.getUserByEmail(email);
export const getUsersFromReview = (reviewersEmails: User["email"][]): Promise<User[]> => 
  usersService.getUsersFromReview(reviewersEmails);
