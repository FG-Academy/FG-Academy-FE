import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center font-medium">
      <a href="/">
        <Image
          alt="logo"
          src="/images/logo_black.png"
          className="-mr-1"
          width={180}
          height={180}
          priority={true}
        />
      </a>
    </div>
  );
}
