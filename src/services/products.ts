import type { ProductsResponse, Product } from "@/types";

export const getAllProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json() ?? [];
}

export const getProductsByCategory = async (category: string): Promise<ProductsResponse> => {
  const response = await fetch(`https://dummyjson.com/products/category/${category}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }
  
  return response.json() ?? [];
}

export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id: ${id}`);
  }
  
  return response.json();
}