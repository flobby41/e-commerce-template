import { FAKE_STORE_API_URL } from 'lib/constants';
import type { Product, Cart, CartItem, Collection } from 'lib/types';

const api = {
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${FAKE_STORE_API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(id: string): Promise<Product> {
    const res = await fetch(`${FAKE_STORE_API_URL}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  async getCategories(): Promise<string[]> {
    const res = await fetch(`${FAKE_STORE_API_URL}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const res = await fetch(`${FAKE_STORE_API_URL}/products/category/${category}`);
    if (!res.ok) throw new Error('Failed to fetch products by category');
    return res.json();
  },

  async getCollections(): Promise<Collection[]> {
    const categories = await this.getCategories();
    const collections: Collection[] = await Promise.all(
      categories.map(async (category) => {
        const products = await this.getProductsByCategory(category);
        return {
          id: category,
          title: category.charAt(0).toUpperCase() + category.slice(1),
          description: `Products in the ${category} category`,
          products
        };
      })
    );
    return collections;
  },

  async getCart(): Promise<Cart> {
    // For Fake Store API, we'll simulate an empty cart
    return {
      id: '1',
      items: [],
      total: 0
    };
  },

  async addToCart(productId: string, quantity: number): Promise<Cart> {
    // For Fake Store API, we'll simulate adding to cart
    const product = await this.getProduct(productId);
    const cartItem: CartItem = {
      id: productId,
      title: product.title,
      price: product.price,
      quantity
    };
    return {
      id: '1',
      items: [cartItem],
      total: product.price * quantity
    };
  },

  async updateCartItem(productId: string, quantity: number): Promise<Cart> {
    // For Fake Store API, we'll simulate updating cart
    const product = await this.getProduct(productId);
    const cartItem: CartItem = {
      id: productId,
      title: product.title,
      price: product.price,
      quantity
    };
    return {
      id: '1',
      items: [cartItem],
      total: product.price * quantity
    };
  },

  async removeFromCart(productId: string): Promise<Cart> {
    // For Fake Store API, we'll simulate removing from cart
    return {
      id: '1',
      items: [],
      total: 0
    };
  },

  async clearCart(): Promise<Cart> {
    // For Fake Store API, we'll simulate clearing cart
    return {
      id: '1',
      items: [],
      total: 0
    };
  },

  async createCart(): Promise<Cart> {
    // For Fake Store API, we'll simulate creating an empty cart
    return {
      id: '1',
      items: [],
      total: 0
    };
  }
};

export default api; 