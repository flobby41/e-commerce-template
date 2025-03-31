export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  products: Product[];
} 