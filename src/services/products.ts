import { generateWeightedDiscounts } from "@/helpers";
import type { IProductsResponse, IProduct, IUser } from "@/types";
import { queryOptions } from "@tanstack/react-query";

export class Products {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://dummyjson.com') {
    this.baseUrl = baseUrl;
  }

  async getAllProducts(): Promise<IProductsResponse> {
    const response = await fetch(`${this.baseUrl}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json() ?? [];
  }

  async getProductsByCategory(category: string): Promise<IProductsResponse> {
    const response = await fetch(`${this.baseUrl}/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category: ${category}`);
    }

    return await response.json() ?? [];
  }

  async getProductById(id: string): Promise<IProduct> {
    const response = await fetch(`${this.baseUrl}/products/${Number(id)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id: ${id}`);
    }

    const product = await response.json();
    if (!product) throw new Error('Product not found');
    return await product;
  }

  async searchProducts(query: string): Promise<IProductsResponse> {
    const response = await fetch(`${this.baseUrl}/products/search?q=${query}`);
    if (!response.ok) {
      throw new Error(`Failed to search products with query: ${query}`);
    }

    return await response.json() ?? [];
  }

  async enrichProductReviews(product: IProduct) {
    if (!product || !product.reviews) return product;

    try {
      const { User } = await import("./user");
      const usersService = new User(this.baseUrl);
      
      const reviewersEmails = product.reviews.map(review => review.reviewerEmail);
      const users = await usersService.getUsersFromReview(reviewersEmails);

      product.reviews = product.reviews.map(review => {
        const user = users.find((user: IUser) => user?.email === review.reviewerEmail);
        return {
          ...review,
          reviewer: user,
        };
      });
    } catch (error) {
      console.warn('Failed to enrich product reviews:', error);
    }

    return product;
  }

  async fetchDailyDeals(): Promise<IProduct[]> {
    try {
      const response = await productsService.getAllProducts();

      const productsWithDiscounts = generateWeightedDiscounts(
        response.products
      );

      const dealsOfTheDay = productsWithDiscounts
        .filter((product) => product.discountPercentage > 10)
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, 8);

      return dealsOfTheDay;
    } catch (err) {
      console.error("Error fetching daily deals:", err);
      return [];
    }
  }

  selectedProductQueryOptions = (productId: IProduct["id"]) =>
    queryOptions<IProduct>({
      queryKey: ["product", productId],
      queryFn: () => getProductById(String(productId)),
      staleTime: 1000 * 60 * 5, // 5 minutes,
  });

  enrichProductReviewsQueryOptions = (product: IProduct) =>
    queryOptions<IProduct>({
      queryKey: ["product", product.id, "reviews"],
      queryFn: async () => await this.enrichProductReviews(product),
      staleTime: 1000 * 60 * 10, // 10 minutes
  });

  productsByCategoryQueryOptions = (category: string) =>
    queryOptions<IProductsResponse>({
      queryKey: ["products", category],
      queryFn: async () => await this.getProductsByCategory(category),
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: Boolean(category),
  });

  dailyDealsQueryOptions = () => queryOptions<IProduct[]>({
    queryKey: ["dailyDeals"],
    queryFn: () => this.fetchDailyDeals(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export const productsService = new Products();

export const getAllProducts = () => productsService.getAllProducts();
export const getProductsByCategory = (category: string) => productsService.getProductsByCategory(category);
export const getProductById = (id: string) => productsService.getProductById(id);
export const searchProducts = (query: string) => productsService.searchProducts(query);
