import type { Cart, Collection, Product } from 'lib/types';

const API_BASE_URL = 'https://fakestoreapi.com';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

interface FakeStoreProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const DEFAULT_IMAGE = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg';

export const api = {
  async getProducts(): Promise<Product[]> {
    const products = await fetchApi<FakeStoreProduct[]>('/products');
    return products.map(product => ({
      id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: product.price,
      images: [product.image || DEFAULT_IMAGE],
      category: product.category,
      stock: product.rating.count
    }));
  },

  async getProduct(id: string): Promise<Product> {
    const product = await fetchApi<FakeStoreProduct>(`/products/${id}`);
    return {
      id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: product.price,
      images: [product.image || DEFAULT_IMAGE],
      category: product.category,
      stock: product.rating.count
    };
  },

  async getCollections(): Promise<Collection[]> {
    const categories = await fetchApi<string[]>('/products/categories');
    const products = await this.getProducts();
    
    return categories.map((category, index) => ({
      id: (index + 1).toString(),
      name: category,
      description: `Collection de ${category}`,
      products: products.filter(product => product.category === category)
    }));
  },

  async getCollection(id: string): Promise<Collection> {
    const products = await fetchApi<FakeStoreProduct[]>(`/products/category/${id}`);
    return {
      id,
      name: products[0]?.category || 'Collection',
      description: `Collection de ${products[0]?.category || 'produits'}`,
      products: products.map(product => ({
        id: product.id.toString(),
        name: product.title,
        description: product.description,
        price: product.price,
        images: [product.image || DEFAULT_IMAGE],
        category: product.category,
        stock: product.rating.count
      }))
    };
  },

  async getCart(): Promise<Cart> {
    // Pour Fake Store API, nous allons simuler un panier vide
    return {
      id: '1',
      items: [],
      total: 0
    };
  },

  async addToCart(productId: string, quantity: number): Promise<Cart> {
    // Pour Fake Store API, nous allons simuler l'ajout au panier
    const product = await this.getProduct(productId);
    return {
      id: '1',
      items: [{
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0] || DEFAULT_IMAGE
      }],
      total: product.price * quantity
    };
  },

  async updateCartItem(productId: string, quantity: number): Promise<Cart> {
    // Pour Fake Store API, nous allons simuler la mise à jour du panier
    const product = await this.getProduct(productId);
    return {
      id: '1',
      items: [{
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0] || DEFAULT_IMAGE
      }],
      total: product.price * quantity
    };
  },

  async removeFromCart(productId: string): Promise<Cart> {
    // Pour Fake Store API, nous allons simuler la suppression du panier
    return {
      id: '1',
      items: [],
      total: 0
    };
  },

  async clearCart(): Promise<Cart> {
    // Pour Fake Store API, nous allons simuler la suppression du panier
    return {
      id: '1',
      items: [],
      total: 0
    };
  },

  async createCart(): Promise<Cart> {
    // Pour Fake Store API, nous allons simuler la création d'un panier vide
    return {
      id: '1',
      items: [],
      total: 0
    };
  }
}; 