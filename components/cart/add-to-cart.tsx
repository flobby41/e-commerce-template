'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useCart } from './cart-context';
import { Product } from 'lib/types';

function SubmitButton({
  inStock
}: {
  inStock: boolean;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!inStock) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Rupture de stock
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add to cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { addCartItem } = useCart();
  const inStock = product.stock > 0;

  return (
    <form
      action={async () => {
        if (inStock) {
          addCartItem(product);
        }
      }}
    >
      <SubmitButton inStock={inStock} />
    </form>
  );
}
