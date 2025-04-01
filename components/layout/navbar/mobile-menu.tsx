'use client';

import { Dialog, Transition } from '@headlessui/react';
import type { Collection } from 'lib/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Search, { SearchSkeleton } from './search';

interface MobileMenuProps {
  collections: Collection[];
}

export default function MobileMenu({ collections }: MobileMenuProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 w-full overflow-y-auto bg-white px-4 py-4 sm:px-6 sm:py-6 dark:bg-black">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center">
                  <span className="ml-2 text-sm font-medium uppercase">Next.js Commerce</span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                >
                  <XMarkIcon className="h-4" />
                </button>
              </div>
              <div className="mt-4">
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </div>
              <ul className="mt-8 flex flex-col gap-4">
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <Link
                      href={`/collection/${collection.id}`}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                      onClick={closeMobileMenu}
                    >
                      {collection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
