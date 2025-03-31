import { ImageResponse } from 'next/og';
import { DEFAULT_OG_IMAGE } from 'lib/constants';

export const runtime = 'edge';
export const alt = 'Vercel Store Clone';
export const size = 1200;

export default async function Image({ params }: { params: { page: string } }): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: 'black',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1,
          }}
        >
          {params.page}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
