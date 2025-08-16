import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <div className="flex items-center font-medium">
      <Link href="/" onClick={onClick}>
        <Image
          alt="logo"
          src="/images/logo_black.png"
          className="-mr-1"
          width={180}
          height={180}
          priority={true}
        />
      </Link>
    </div>
  );
}
