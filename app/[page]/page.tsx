import { Metadata } from 'next';
import api from 'lib/api';
import { ProductGrid } from 'components/layout';
import Footer from 'components/layout/footer';
import type { Product } from 'lib/types';

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  return {
    title: params.page,
    description: `Collection of ${params.page} products`,
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const products = await api.getProducts();
  const filteredProducts = products.filter((product: Product) => product.category === params.page);

  if (!filteredProducts.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Aucun produit trouvé</h1>
        <p className="text-gray-600">La catégorie "{params.page}" n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="mx-auto max-w-screen-2xl px-4">
          <ProductGrid products={filteredProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
