import type { Product } from "@/types";
import { pages } from "./index.constants";

export const formatCategoryName = (
  category: string,
  shouldCapitalizeFirstLetter = true
): string => {
  if (!category) return "";
  const formatted = `${category[0].toUpperCase() + category.slice(1)}`.replace(
    "-",
    " "
  );
  return shouldCapitalizeFirstLetter ? formatted : formatted.toLowerCase();
};

export const getProductRating = (rating: number | null) => {
  return rating ? new Array(Math.ceil(rating)).fill("⭐") : null;
};

export const getCategoryWeight = (category: string): number => {
  const categoryWeights: Record<string, number> = {
    "clothing": 0.9,
    "fashion": 0.9,
    "shoes": 0.8,
    "bags": 0.8,
    "accessories": 0.7,
    
    "electronics": 0.6,
    "smartphones": 0.6,
    "laptops": 0.5,
    "tablets": 0.6,
    
    "furniture": 0.7,
    "home-decoration": 0.7,
    "kitchen-accessories": 0.6,
    
    "beauty": 0.8,
    "skincare": 0.7,
    "fragrances": 0.6,
    
    "sports-accessories": 0.7,
    "mens-watches": 0.6,
    "womens-watches": 0.6,
    "sunglasses": 0.7,
    
    "groceries": 0.4,
    
    "automotive": 0.5,
    "motorcycle": 0.5,
    
    "tops": 0.8,
    "womens-dresses": 0.9,
    "womens-shoes": 0.8,
    "mens-shirts": 0.8,
    "mens-shoes": 0.7,
  };

  return categoryWeights[category.toLowerCase()] || 0.5;
};

export const generateWeightedDiscounts = (products: Product[]) => {
  return products.map(product => {
    const ratingWeight = (product.rating || 0) / 5; // 0-1
    const stockWeight = Math.min((product.stock || 0) / 100, 1); // 0-1
    const categoryWeight = getCategoryWeight(product.category);
    
    const baseDiscount = Math.random() * 20; // 0-20%
    const weightedBonus = (ratingWeight + stockWeight + categoryWeight) * 15;
    
    return {
      ...product,
      discountPercentage: Math.round(baseDiscount + weightedBonus),
      originalPrice: product.price,
      discountedPrice: product.price * (1 - (baseDiscount + weightedBonus) / 100)
    };
  });
};

export const getMetaHeader = (headerTitle?: string) => {
  if (headerTitle) { return { meta: [{ title: headerTitle }] }; }
  const title = pages.find(page => page.path === location.pathname)?.name;
  return { meta: [{ title }] };
}