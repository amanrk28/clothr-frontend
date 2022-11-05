import { useRouter } from 'next/router';
import React from 'react';
import { Footer } from './Footer';

interface BaseProps {
  title?: string;
  description?: string;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const Base: React.FC<BaseProps> = ({
  title = 'Welcome',
  description = '',
  className = 'text-white p-4',
  children,
}) => {
  const router = useRouter();
  const isAdmin = router.pathname.includes('/admin');
  return (
    <>
      <section className="w-full">
        {title && (
          <main className="text-white text-center p-4">
            <h2 className="text-4xl">{title}</h2>
            <p className="text-lg">{description}</p>
          </main>
        )}
        <main className={`${isAdmin ? '' : 'md:mt-20 xl:mt-48'} min-h-[calc(100vh-80px-72px)] ${className}`}>{children}</main>
      </section>
      <Footer />
    </>
  );
}

export default Base;
