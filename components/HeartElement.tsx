// *********************
// Role of the component: Wishlist icon with quantity located in the header
// Name of the component: HeartElement.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <HeartElement />
// Input parameters: no input parameters
// Output: wishlist icon with quantity
// *********************

"use client";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa6";

const HeartElement = ({wishQuantity}: {wishQuantity: number}) => {
  return (
    <div className="relative">
      <Link href="/wishlist">
        <FaHeart className="text-2xl text-[#2f584b]" />
        <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e7c77f] px-1 text-xs font-bold text-[#263b32]">
          { wishQuantity }
        </span>
      </Link>
    </div>
  );
};

export default HeartElement;
