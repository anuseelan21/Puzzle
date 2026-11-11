// *********************
// Role of the component: Header component
// Name of the component: Header.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Header />
// Input parameters: no input parameters
// Output: Header component
// *********************

"use client";
import { usePathname } from "next/navigation";
import React from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaPuzzlePiece } from "react-icons/fa6";

import CartElement from "./CartElement";
import NotificationBell from "./NotificationBell";
import HeartElement from "./HeartElement";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";

const Header = () => {
  const pathname = usePathname();
  const { wishQuantity } = useWishlistStore();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  const brand = (
    <Link href="/" className="flex items-center gap-3 text-[#263b32]" aria-label="Piece and Parcel home">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e7c77f] text-[#263b32]">
        <FaPuzzlePiece className="text-2xl" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block font-serif text-xl font-bold tracking-tight sm:text-2xl">Piece <span className="text-[#bd6849]">&amp;</span> Parcel</span>
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7d8277]">Puzzle shop</span>
      </span>
    </Link>
  );

  return (
    <header className="relative z-30 border-b border-[#e8e1d5] bg-[#fffdf8]">
      <HeaderTop />
      {pathname.startsWith("/admin") === false ? (
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex min-h-[88px] items-center justify-between gap-8 py-4 max-lg:flex-wrap">
            {brand}
            <div className="w-full max-w-xl flex-1 max-lg:order-3 max-lg:basis-full max-lg:max-w-none">
              <SearchInput />
            </div>
            <div className="flex items-center gap-5 text-[#2f584b]">
              <NotificationBell />
              <HeartElement wishQuantity={wishQuantity} />
              <CartElement />
            </div>
          </div>
          <nav aria-label="Main navigation" className="flex items-center gap-8 overflow-x-auto border-t border-[#eee9df] py-3 text-sm font-semibold text-[#526258]">
            <Link href="/shop" className="whitespace-nowrap transition hover:text-[#bd6849]">Shop all puzzles</Link>
            <Link href="/shop/500-piece-puzzles" className="whitespace-nowrap transition hover:text-[#bd6849]">500 pieces</Link>
            <Link href="/shop/1000-piece-puzzles" className="whitespace-nowrap transition hover:text-[#bd6849]">1000 pieces</Link>
            <Link href="/shop/kids-puzzles" className="whitespace-nowrap transition hover:text-[#bd6849]">For children</Link>
            <Link href="/shop/nature-puzzles" className="whitespace-nowrap transition hover:text-[#bd6849]">Nature &amp; wildlife</Link>
            <Link href="/shop/family-puzzles" className="whitespace-nowrap transition hover:text-[#bd6849]">Family favourites</Link>
          </nav>
        </div>
      ) : (
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5">
          {brand}
          <div className="flex items-center gap-5">
            <NotificationBell />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-10">
                <Image
                  src="/randomuser.jpg?v=2"
                  alt="C. Joseph Vijay"
                  title="Photo: Prime Minister's Office, Government of India (GODL-India)"
                  width={30}
                  height={30}
                  className="w-full h-full rounded-full"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/admin">Dashboard</Link>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a
                    href="https://commons.wikimedia.org/wiki/File:JosephVijay.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Photo credit: Prime Minister&apos;s Office (GODL-India)
                  </a>
                </li>
                <li onClick={handleLogout}>
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
