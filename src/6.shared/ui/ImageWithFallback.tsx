"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";

export type ImageWithFallbackProps = React.ComponentProps<typeof Image> & {
  fallbackSrc?: string | StaticImageData;
};

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  className,
  ...rest
}) => {
  const [hasError, setHasError] = useState(!src);

  useEffect(() => {
    setHasError(!src);
  }, [src]);

  if (hasError) {
    if (fallbackSrc) {
      return (
        <Image {...rest} src={fallbackSrc} alt={alt} className={className} />
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <ImageIcon className="w-12 h-12 text-gray-300" />
      </div>
    );
  }

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};
