import React from 'react';
import Image from 'next/image';

export const ImageHelper = ({ image }: { image?: string }) => {
  return (
    <Image
      src={image}
      alt="photo"
      className="rounded-t h-fit hover:scale-y-110 duration-300"
      width={300}
      height={169}
    />
  );
};

