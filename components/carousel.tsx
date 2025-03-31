import type { Collection } from 'lib/types';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

interface CarouselProps {
  collections: Collection[];
}

export function Carousel({ collections }: CarouselProps) {
  if (!collections?.length) return null;

  // Purposefully duplicating collections to make the carousel loop and not run out of items on wide screens.
  const carouselCollections = [...collections, ...collections, ...collections];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselCollections.map((collection, i) => (
          <li
            key={`${collection.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/collection/${collection.id}`} className="relative h-full w-full">
              <GridTileImage
                alt={collection.name}
                label={{
                  title: collection.name,
                  amount: collection.products.length.toString(),
                  currencyCode: 'EUR'
                }}
                src={collection.products[0]?.images[0] || '/placeholder.png'}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
