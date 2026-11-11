// *********************
// Role of the component: Category Item that will display category icon, category name and link to the category
// Name of the component: CategoryItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryItem title={title} href={href} ><Image /></CategoryItem>
// Input parameters: CategoryItemProps interface
// Output: Category icon, category name and link to the category
// *********************

import Link from "next/link";
import React, { type ReactNode } from "react";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
  caption: string;
  href: string;
}

const CategoryItem = ({ title, caption, children, href }: CategoryItemProps) => {
  return (
    <Link
      href={href}
      className="group flex min-h-40 items-center gap-4 rounded-2xl border border-[#e5ded2] bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#c5b9a5] hover:shadow-lg"
    >
      <span className="shrink-0">{children}</span>
      <span className="min-w-0">
        <span className="block font-serif text-lg font-bold capitalize text-[#263b32] group-hover:text-[#bd6849]">{title}</span>
        <span className="mt-1 block text-sm text-[#777a71]">{caption}</span>
      </span>
    </Link>
  );
};

export default CategoryItem;
