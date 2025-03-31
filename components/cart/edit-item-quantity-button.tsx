'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { updateItemQuantity } from 'components/cart/actions';
import type { CartItem } from 'lib/types';
import { useState } from 'react';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  return (
    <button
      type="submit"
      aria-label={
        type === 'plus' ? 'Augmenter la quantité' : 'Réduire la quantité'
      }
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus'
        }
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  optimisticUpdate: any;
}) {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    const payload = {
      productId: item.id,
      quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
    };
    optimisticUpdate(item.id, type);
    try {
      const result = await updateItemQuantity(null, payload);
      setMessage(result || 'Quantity updated successfully');
    } catch (error) {
      setMessage('Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
