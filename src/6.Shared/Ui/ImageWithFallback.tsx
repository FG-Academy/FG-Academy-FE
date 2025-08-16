"use client";

import Image from "next/image";
import React from "react";

const FALLBACK_IMAGE = "/images/fallbackImage.png";

export type ImageWithFallbackProps = React.ComponentProps<typeof Image>;

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  ...rest
}) => {
  const initialSrc = (typeof src === "string" && src) || FALLBACK_IMAGE;
  const [imgSrc, setImgSrc] = React.useState(initialSrc);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
};
