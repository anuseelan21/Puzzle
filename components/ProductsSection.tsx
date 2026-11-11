// *********************
// Role of the component: products section intended to be on the home page
// Name of the component: ProductsSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductsSection slug={slug} />
// Input parameters: no input parameters
// Output: products grid
// *********************

import ProductItem from "./ProductItem";
import apiClient from "@/lib/api";
import Link from "next/link";

const ProductsSection = async () => {
  let products: Product[] = [];

  try {
    const data = await apiClient.get("/api/products");

    if (!data.ok) {
      console.error('Failed to fetch products:', data.statusText);
    } else {
      const result = await data.json();
      products = Array.isArray(result) ? result.slice(0, 8) : [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <section className="bg-[#fbfaf6] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b66b4d]">A few favourites to get you started</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#263b32] sm:text-4xl">Made for your next slow Sunday</h2>
          </div>
          <Link href="/shop" className="hidden text-sm font-bold text-[#2f584b] underline decoration-[#bd6849] decoration-2 underline-offset-4 sm:inline">
            Shop all puzzles
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-[#e5ded2] bg-white py-12 text-center text-[#657067]">
              <p>No products available at the moment.</p>
            </div>
          )}
        </div>
        <Link href="/shop" className="mt-8 inline-flex rounded-full border border-[#c9c4b8] px-6 py-3 text-sm font-bold text-[#2f584b] transition hover:bg-[#f5efe4] sm:hidden">
          Browse all puzzles
        </Link>
      </div>
    </section>
  );
};

export default ProductsSection;
