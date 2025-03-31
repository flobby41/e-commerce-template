import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import api from 'lib/api';
import type { Product, Collection } from 'lib/types';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js and custom API.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  try {
    const [products, collections] = await Promise.all([
      api.getProducts(),
      api.getCollections()
    ]);

    return (
      <>
        <ThreeItemGrid products={products} />
        <Carousel collections={collections} />
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
          <p className="mt-2">Impossible de charger les données. Veuillez réessayer plus tard.</p>
        </div>
      </div>
    );
  }
}
