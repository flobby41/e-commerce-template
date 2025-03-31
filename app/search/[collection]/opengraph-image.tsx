import OpengraphImage from 'components/opengraph-image';

export const runtime = 'edge';

export default async function Image({ params }: { params: { collection: string } }) {
  return await OpengraphImage({ title: params.collection });
}
