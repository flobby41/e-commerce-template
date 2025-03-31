import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from 'lib/api';
import { ProductGrid } from 'components/layout/product-grid';

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { collection: string } }): Promise<Metadata> {
  return {
    title: params.collection,
    description: `Collection of ${params.collection} products`,
  };
}

export default async function CollectionPage({ params }: { params: { collection: string } }) {
  const products = await api.getProducts();
  const filteredProducts = products.filter(product => product.category === params.collection);

  if (!filteredProducts.length) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <h1 className="text-2xl font-bold">{params.collection}</h1>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
