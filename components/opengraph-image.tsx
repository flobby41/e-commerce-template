import { ImageResponse } from 'next/og';

export type Props = {
  title?: string;
};

export default async function Image({ title }: Props) {
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
          {title || 'Vercel Store'}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
