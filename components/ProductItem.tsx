// *********************
// Role of the component: Product item component 
// Name of the component: ProductItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductItem product={product} color={color} />
// Input parameters: { product: Product; color: string; }
// Output: Product item component that contains product image, title, link to the single product page, price, button...
// *********************

import Link from "next/link";
import Image from "next/image";
import { sanitize } from "@/lib/sanitize";
import { FaStar } from "react-icons/fa6";

const ProductItem = ({ product }: { product: Product; color?: string }) => {
  const category = product.category?.name?.replace(/-/g, " ");
  const rating = Math.min(Math.max(product.rating || 0, 0), 5);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e9e3d8] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-[#f2eee5]"
      >
        {category && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold capitalize tracking-wide text-[#426357]">
            {category}
          </span>
        )}
        <Image
          src={product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg"}
          width={600}
          height={450}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          alt={sanitize(product?.title) || "Product image"}
        />
      </Link>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-1 text-[#ba7846]" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar key={index} aria-hidden="true" className={index < rating ? "" : "text-[#ddd7ca]"} />
          ))}
          <span className="ml-1 text-xs text-[#818178]">{rating.toFixed(1)}</span>
        </div>
        <Link href={`/product/${product.slug}`} className="mt-2 block min-h-12 font-serif text-lg font-bold leading-snug text-[#263b32] hover:text-[#bd6849]">
          {sanitize(product.title)}
        </Link>
        <div className="mt-4 flex items-center justify-between border-t border-[#eee9df] pt-4">
          <p className="text-lg font-bold text-[#263b32]">£{product.price.toFixed(2)}</p>
          <Link href={`/product/${product.slug}`} className="text-sm font-bold text-[#426357] underline decoration-[#d7b16d] underline-offset-4">
            View puzzle
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
