import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from 'lib/api';
import { ProductGrid } from 'components/layout/product-grid';

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  return {
    title: params.page,
    description: `Collection of ${params.page} products`,
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const products = await getProducts();
  const filteredProducts = products.filter(product => product.category === params.page);

  if (!filteredProducts.length) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <h1 className="text-2xl font-bold">{params.page}</h1>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
