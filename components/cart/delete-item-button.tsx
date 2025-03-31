'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeItem } from 'components/cart/actions';
import type { CartItem } from 'lib/types';
import { useState } from 'react';

export function DeleteItemButton({
  item,
  optimisticUpdate
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    optimisticUpdate(item.id, 'delete');
    try {
      const result = await removeItem(null, item.id);
      setMessage(result || 'Item removed successfully');
    } catch (error) {
      setMessage('Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <button
        type="submit"
        aria-label="Remove item from cart"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
