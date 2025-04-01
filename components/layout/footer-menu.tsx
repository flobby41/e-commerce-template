'use client';

import clsx from 'clsx';
import type { Collection } from 'lib/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FooterMenuItem({ collection }: { collection: Collection }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === `/collection/${collection.id}`);

  useEffect(() => {
    setActive(pathname === `/collection/${collection.id}`);
  }, [pathname, collection.id]);

  return (
    <li>
      <Link
        href={`/collection/${collection.id}`}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {collection.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ collections }: { collections: Collection[] }) {
  if (!collections.length) return null;

  return (
    <nav>
      <ul>
        {collections.map((collection: Collection) => {
          return <FooterMenuItem key={collection.id} collection={collection} />;
        })}
      </ul>
    </nav>
  );
}
