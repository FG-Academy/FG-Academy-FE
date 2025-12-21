"use client";

import Image from "next/image";
import React from "react";
import FallbackImage from "@public/images/fallbackImage.png";

export type ImageWithFallbackProps = React.ComponentProps<typeof Image>;

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  ...rest
}) => {
  const initialSrc = (typeof src === "string" && src) || FallbackImage;
  const [imgSrc, setImgSrc] = React.useState(initialSrc);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(FallbackImage)}
    />
  );
};
