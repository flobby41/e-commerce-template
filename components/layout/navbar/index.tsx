import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import type { Collection } from 'lib/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const SITE_NAME = 'Next.js Commerce';

interface NavbarProps {
  collections: Collection[];
}

export function Navbar({ collections }: NavbarProps) {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      {/* Mobile Layout */}
      <div className="flex w-full items-center justify-between md:hidden">
        <div className="flex-none">
          <Suspense fallback={null}>
            <MobileMenu collections={collections} />
          </Suspense>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/" prefetch={true} className="flex items-center">
            <LogoSquare size="sm" />
            <div className="ml-2 text-sm font-medium uppercase">
              {SITE_NAME}
            </div>
          </Link>
        </div>
        <div className="flex-none">
          <CartModal />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden w-full items-center justify-between md:flex">
        <div className="flex items-center space-x-4 md:w-1/4">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center"
          >
            <LogoSquare size="sm" />
            <div className="ml-2 hidden text-xs font-medium uppercase lg:block">
              {SITE_NAME}
            </div>
          </Link>
        </div>
        <div className="flex-1 md:w-2/4">
          {collections.length ? (
            <ul className="gap-8 text-sm md:flex md:items-center md:justify-center">
              {collections.map((collection) => (
                <li key={collection.id}>
                  <Link
                    href={`/collection/${collection.id}`}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {collection.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex items-center justify-end space-x-4 md:w-1/4">
          <div className="md:block">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
