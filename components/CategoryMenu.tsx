// *********************
// Role of the component: Category wrapper that will contain title and category items
// Name of the component: CategoryMenu.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryMenu />
// Input parameters: no input parameters
// Output: section title and category items
// *********************

import CategoryItem from "./CategoryItem";
import { categoryMenuList } from "@/lib/utils";
import { FaPuzzlePiece } from "react-icons/fa6";
import Link from "next/link";

const CategoryMenu = () => {
  return (
    <section className="bg-[#f5efe4] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b66b4d]">A puzzle for every mood</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#263b32] sm:text-4xl">Find your kind of puzzle</h2>
          </div>
          <Link href="/shop" className="hidden text-sm font-bold text-[#2f584b] underline decoration-[#bd6849] decoration-2 underline-offset-4 sm:inline">
            Browse everything
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryMenuList.map((item) => (
          <CategoryItem key={item.id} title={item.title} caption={item.caption} href={item.href}>
            <span className={`grid h-14 w-14 place-items-center rounded-2xl ${item.color}`}>
              <FaPuzzlePiece className="text-2xl" aria-hidden="true" />
            </span>
          </CategoryItem>
        ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryMenu;
