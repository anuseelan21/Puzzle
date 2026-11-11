// *********************
// Role of the component: Topbar of the header
// Name of the component: HeaderTop.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <HeaderTop />
// Input parameters: no input parameters
// Output: topbar with phone, email and login and register links
// *********************

"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa6";

const HeaderTop = () => {
  const { data: session } = useSession();
  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  return (
    <div className="bg-[#263b32] px-5 text-[#fbfaf6]">
      <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-4 text-xs sm:text-sm">
        <p className="font-medium tracking-wide">Thoughtful puzzles for slower, happier moments</p>
        <div className="flex items-center gap-4 font-semibold">
          {!session ? (
            <>
              <Link href="/login" className="flex items-center gap-2 transition hover:text-[#e8c579]">
                <FaRegUser aria-hidden="true" />
                <span>Sign in</span>
              </Link>
              <Link href="/register" className="hidden transition hover:text-[#e8c579] sm:inline">
                Create account
              </Link>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">{session.user?.email}</span>
              <button onClick={handleLogout} className="flex items-center gap-2 transition hover:text-[#e8c579]">
                <FaRegUser aria-hidden="true" />
                <span>Log out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
