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