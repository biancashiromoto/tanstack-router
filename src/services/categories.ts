import { queryOptions } from "@tanstack/react-query";

export const getProductsCategories = async (): Promise<string[]> => {
  const response = await fetch('https://dummyjson.com/products/category-list');
  if (!response.ok) {
    throw new Error('Failed to fetch product categories');
  }

  return response.json() ?? [];
}

export const categoriesQueryOptions = () =>
  queryOptions<string[]>({
    queryKey: ['categories'],
    queryFn: getProductsCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
