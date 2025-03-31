import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from 'lib/utils';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-300"
        >
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="mt-4 flex flex-col">
            <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            <p className="mt-2 text-sm font-medium text-gray-900">{formatPrice(product.price)}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
