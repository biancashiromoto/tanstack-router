export const getProductsCategories = async (): Promise<string[]> => {
  const response = await fetch('https://dummyjson.com/products/category-list');
  if (!response.ok) {
    throw new Error('Failed to fetch product categories');
  }

  return response.json() ?? [];
}