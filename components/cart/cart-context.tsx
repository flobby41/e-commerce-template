'use client';

import type { Cart, CartItem, Product } from 'lib/types';
import React, {
  createContext,
  use,
  useContext,
  useMemo,
  useOptimistic
} from 'react';

type UpdateType = 'plus' | 'minus' | 'delete';

type CartAction =
  | {
      type: 'UPDATE_ITEM';
      payload: { productId: string; updateType: UpdateType };
    }
  | {
      type: 'ADD_ITEM';
      payload: { product: Product };
    };

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (productId: string, updateType: UpdateType) => void;
  addCartItem: (product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === 'delete') return null;

  const newQuantity =
    updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  return {
    ...item,
    quantity: newQuantity,
    price: item.price * newQuantity
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  product: Product
): CartItem {
  if (existingItem) {
    return {
      ...existingItem,
      quantity: existingItem.quantity + 1,
      price: existingItem.price * (existingItem.quantity + 1)
    };
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    productId: product.id,
    quantity: 1,
    price: product.price,
    name: product.name,
    image: product.images[0] || ''
  };
}

function updateCartTotals(items: CartItem[]): { total: number } {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return { total };
}

function createEmptyCart(): Cart {
  return {
    id: Math.random().toString(36).substr(2, 9),
    items: [],
    total: 0
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  if (!state) {
    return createEmptyCart();
  }

  switch (action.type) {
    case 'UPDATE_ITEM': {
      const { productId, updateType } = action.payload;
      const updatedItems = state.items
        .map((item) => {
          if (item.productId === productId) {
            return updateCartItem(item, updateType);
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      return {
        ...state,
        items: updatedItems,
        ...updateCartTotals(updatedItems)
      };
    }

    case 'ADD_ITEM': {
      const { product } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.id
      );

      const updatedItem = createOrUpdateCartItem(existingItem, product);
      const updatedItems = existingItem
        ? state.items.map((item) =>
            item.productId === product.id ? updatedItem : item
          )
        : [...state.items, updatedItem];

      return {
        ...state,
        items: updatedItems,
        ...updateCartTotals(updatedItems)
      };
    }

    default:
      return state;
  }
}

export function CartProvider({
  children,
  cartPromise
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  const cart = use(cartPromise);
  const [optimisticCart, dispatch] = useOptimistic(
    cart,
    (state: Cart | undefined, action: CartAction) => cartReducer(state, action)
  );

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem: (productId: string, updateType: UpdateType) => {
        dispatch({ type: 'UPDATE_ITEM', payload: { productId, updateType } });
      },
      addCartItem: (product: Product) => {
        dispatch({ type: 'ADD_ITEM', payload: { product } });
      }
    }),
    [optimisticCart, dispatch]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
