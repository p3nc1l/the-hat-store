import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="w-full py-4 px-10 border-b-1 border-black dark:border-neutral-700 grid grid-cols-3">
      <div className="flex gap-8 items-center">
        <Link href="/products?category=1">Men</Link>
        <Link href="/products?category=2">Women</Link>
        <Link href="/products?category=3">Kids</Link>
        <Link href="/products?category=4">Accessories</Link>
      </div>
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            className="dark:hidden"
            src="/horizontal-black.png"
            alt="The hat store"
            width={100}
            height={100}
          />
          <Image
            className="hidden dark:block"
            src="/horizontal-white.png"
            alt="The hat store"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex gap-8 items-center justify-end">
        <Link href="/cart">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
          </svg>
        </Link>
        <Link href="/login">
          <Avatar>
            <AvatarFallback>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
              </svg>
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;