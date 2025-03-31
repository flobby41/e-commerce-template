import Image from 'next/image';
import clsx from 'clsx';

interface GridTileImageProps {
  src: string;
  alt: string;
  label: {
    title: string;
    amount: string;
    currencyCode: string;
  };
  fill?: boolean;
  sizes?: string;
}

export function GridTileImage({ src, alt, label, fill, sizes }: GridTileImageProps) {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-lg">
      <Image
        className={clsx('relative h-full w-full object-cover transition duration-300 ease-in-out', {
          'object-cover': fill
        })}
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-30">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="text-sm font-medium">{label.title}</div>
          <div className="text-sm">
            {label.amount} {label.currencyCode}
          </div>
        </div>
      </div>
    </div>
  );
} 