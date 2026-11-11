// *********************
// Role of the component: Search input element located in the header but it can be used anywhere in your application
// Name of the component: SearchInput.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <SearchInput />
// Input parameters: no input parameters
// Output: form with search input and button
// *********************

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { sanitize } from "@/lib/sanitize";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  // function for modifying URL for searching products
  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Sanitize the search input before using it in URL
    const sanitizedSearch = sanitize(searchInput);
    router.push(`/search?search=${encodeURIComponent(sanitizedSearch)}`);
    setSearchInput("");
  };

  return (
    <form className="flex w-full justify-center" onSubmit={searchProducts}>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Find your next puzzle..."
        aria-label="Search puzzles"
        className="h-12 w-full rounded-l-full rounded-r-none border border-[#ded8cd] bg-white px-5 text-sm text-[#263b32] outline-none placeholder:text-[#92948b] focus:border-[#638273] focus:ring-2 focus:ring-[#dce8df]"
      />
      <button type="submit" className="h-12 rounded-l-none rounded-r-full bg-[#2f584b] px-5 text-sm font-bold text-white transition hover:bg-[#234338]">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
