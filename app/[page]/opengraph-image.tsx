import { ImageResponse } from 'next/server';
import { DEFAULT_OG_IMAGE } from 'lib/constants';

export const runtime = 'edge';
export const alt = 'Vercel Store Clone';
export const size = 1200;

export default async function Image({ params }: { params: { page: string } }) {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <img src={DEFAULT_OG_IMAGE} alt={alt} width={size} height={size} />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            textAlign: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          {params.page}
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    }
  );
}
