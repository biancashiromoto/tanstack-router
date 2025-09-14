import type { User, UsersCart } from "@/types";

export const signIn = async (username: User["username"], password: User["password"]): Promise<User> => {
  const response = await fetch('https://dummyjson.com/auth/login', {
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

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch('https://dummyjson.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  console.log('Fetched users:', data.users);
  return data.users;
}

export const getUsersCartById = async (userId: User["id"]): Promise<UsersCart> => {
  const response = await fetch(`https://dummyjson.com/users/${userId}/carts`);
  if (!response.ok) {
    throw new Error('Failed to fetch user cart');
  }
  const data = await response.json();
  return data.carts;
}

export const getUserById = async (userId: User["id"]): Promise<User> => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return data;
}

export const getUserByEmail = async (email: User["email"]): Promise<User | null> => {
  const response = await fetch(`https://dummyjson.com/users/search?q=${email}`);
  if (!response.ok) throw new Error('Failed to fetch user');

  const data = await response.json();

  if (!data.users || data.users.length === 0) throw new Error('User not found');
  return data.users?.[0];
}

export const getUsersFromReview = async (reviewersEmails: User["email"][]): Promise<(User | null)[]> => {
  const users = await Promise.all(
    reviewersEmails.map(async (email) => {
      try {
        return await getUserByEmail(email);
      } catch (error) {
        console.error(`Failed to fetch user by email ${email}:`, error);
        return null;
      }
    })
  );

  return users ?? [];
}
