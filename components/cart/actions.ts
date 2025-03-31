'use server';

import { TAGS } from 'lib/constants';
import api from 'lib/api';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  productId: string | undefined
) {
  if (!productId) {
    return 'Error adding item to cart';
  }

  try {
    await api.addToCart(productId, 1);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, productId: string) {
  try {
    const cart = await api.getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const cartItem = cart.items.find(
      (item) => item.id === productId
    );

    if (cartItem) {
      await api.removeFromCart(productId);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    productId: string;
    quantity: number;
  }
) {
  try {
    const cart = await api.getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const cartItem = cart.items.find(
      (item) => item.id === payload.productId
    );

    if (cartItem) {
      await api.updateCartItem(payload.productId, payload.quantity);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    return 'Error updating item quantity';
  }
}

export async function redirectToCheckout() {
  redirect('/checkout');
}

export async function createCartAndSetCookie() {
  const cart = await api.getCart();
  if (!cart) {
    return 'Error creating cart';
  }
  return cart;
}
