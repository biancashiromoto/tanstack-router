import type { ProductsResponse, Product } from "@/types";

export class Products {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://dummyjson.com') {
    this.baseUrl = baseUrl;
  }

  async getAllProducts(): Promise<ProductsResponse> {
    const response = await fetch(`${this.baseUrl}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json() ?? [];
  }

  async getProductsByCategory(category: string): Promise<ProductsResponse> {
    const response = await fetch(`${this.baseUrl}/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category: ${category}`);
    }

    return await response.json() ?? [];
  }

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/products/${Number(id)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id: ${id}`);
    }

    const product = await response.json();
    if (!product) throw new Error('Product not found');
    return await this.enrichProductReviews(product);
  }

  async searchProducts(query: string): Promise<ProductsResponse> {
    const response = await fetch(`${this.baseUrl}/products/search?q=${query}`);
    if (!response.ok) {
      throw new Error(`Failed to search products with query: ${query}`);
    }

    return await response.json() ?? [];
  }

  async enrichProductReviews(product: Product) {
    if (!product || !product.reviews) return product;

    try {
      const { Users } = await import("./users");
      const usersService = new Users(this.baseUrl);
      
      const reviewersEmails = product.reviews.map(review => review.reviewerEmail);
      const users = await usersService.getUsersFromReview(reviewersEmails);

      product.reviews = product.reviews.map(review => {
        const user = users.find((u: any) => u?.email === review.reviewerEmail);
        return {
          ...review,
          reviewerName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
          reviewerAvatar: user?.image || '',
        };
      });
    } catch (error) {
      console.warn('Failed to enrich product reviews:', error);
    }

    return product;
  }
}

export const productsService = new Products();

export const getAllProducts = () => productsService.getAllProducts();
export const getProductsByCategory = (category: string) => productsService.getProductsByCategory(category);
export const getProductById = (id: string) => productsService.getProductById(id);
export const searchProducts = (query: string) => productsService.searchProducts(query);