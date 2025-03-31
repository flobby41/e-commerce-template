import Link from 'next/link';
import { GridTileImage } from './tile';

export function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group relative"
        >
          <GridTileImage
            alt={product.title}
            label={{
              title: product.title,
              amount: product.price.toString(),
              currencyCode: 'EUR'
            }}
            src={product.image}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </Link>
      ))}
    </div>
  );
} 