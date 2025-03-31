import Link from 'next/link';
import api from 'lib/api';

export default async function Collections() {
  const products = await api.getProducts();
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Categories</h2>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/search/${category}`}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
