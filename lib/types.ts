export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
} 