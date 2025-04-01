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
      payload: { id: string; updateType: UpdateType };
    }
  | {
      type: 'ADD_ITEM';
      payload: { product: Product };
    };

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (id: string, updateType: UpdateType) => void;
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
    title: product.title,
    quantity: 1,
    price: product.price
  };
}

function updateCartTotals(items: CartItem[]): { total: number } {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return { total };
}

function createEmptyCart(): Cart {
  return {
    id: Math.random().toString(36).substr(2, 9),
    items: []
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  if (!state) {
    return createEmptyCart();
  }

  switch (action.type) {
    case 'UPDATE_ITEM': {
      const { id, updateType } = action.payload;
      const updatedItems = state.items
        .map((item) => {
          if (item.id === id) {
            return updateCartItem(item, updateType);
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      return {
        ...state,
        items: updatedItems
      };
    }

    case 'ADD_ITEM': {
      const { product } = action.payload;
      const existingItem = state.items.find((item) => item.title === product.title);

      const updatedItems = existingItem
        ? state.items.map((item) =>
            item.title === product.title
              ? createOrUpdateCartItem(item, product)
              : item
          )
        : [...state.items, createOrUpdateCartItem(undefined, product)];

      return {
        ...state,
        items: updatedItems
      };
    }
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
  const [optimisticCart, addOptimisticCart] = useOptimistic(
    cart,
    (state: Cart | undefined, action: CartAction) => cartReducer(state, action)
  );

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem: (id: string, updateType: UpdateType) =>
        addOptimisticCart({ type: 'UPDATE_ITEM', payload: { id, updateType } }),
      addCartItem: (product: Product) =>
        addOptimisticCart({ type: 'ADD_ITEM', payload: { product } })
    }),
    [optimisticCart, addOptimisticCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
