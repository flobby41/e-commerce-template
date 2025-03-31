import { Metadata } from 'next';
import api from 'lib/api';
import { ProductGrid } from 'components/layout/product-grid';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for products in our store',
};

export default async function SearchPage() {
  const products = await api.getProducts();

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <h1 className="text-2xl font-bold">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
