import Image from 'next/image';
import React from 'react';

interface BaseProps {
  title?: string;
  description?: string;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const Base: React.FC<BaseProps> = ({
  title = 'Welcome',
  description = '',
  className = 'bg-dark text-white p-4',
  children,
}) => (
  <div>
    <section className="w-full">
      {title && (
        <main className="text-white text-center p-4">
          <h2 className="text-4xl">{title}</h2>
          <p className="text-lg">{description}</p>
        </main>
      )}
      <main className={className}>{children}</main>
    </section>
    <footer className="h-40 w-full flex flex-col items-center justify-center shadow-xl border-[0.02rem] border-gray-400 border-opacity-20 bg-black/20 rounded-md lg:rounded-xl backdrop-blur-lg">
      <div className="flex items-center">
        <a href="https://instagram.com/amanrk28" target="_blank" rel="noopener referrer noreferrer">
          <Image
            className="cursor-pointer hover:scale-125 h-20 w-20 duration-300"
            src="/images/aman.png"
            alt="Aman Khemka"
            width={80}
            height={80}
          />
        </a>
      </div>
    </footer>
  </div>
);

export default Base;
