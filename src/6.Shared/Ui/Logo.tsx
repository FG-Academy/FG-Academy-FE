import Image from "next/image";
import LogoBlack from "@public/images/logo_black.png";

export function Logo() {
  return (
    <div className="flex items-center font-medium">
      <a href="/">
        <Image
          alt="logo"
          src={LogoBlack}
          className="-mr-1"
          width={180}
          height={180}
          priority={true}
        />
      </a>
    </div>
  );
}
