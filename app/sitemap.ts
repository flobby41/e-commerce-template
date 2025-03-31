import { MetadataRoute } from 'next';
import api from 'lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const collections = await api.getCollections();
  const products = await api.getProducts();
  const routes = ['', '/search'].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const collectionRoutes = collections.map((collection) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/search/${collection.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }));

  const productRoutes = products.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...routes, ...collectionRoutes, ...productRoutes];
}
