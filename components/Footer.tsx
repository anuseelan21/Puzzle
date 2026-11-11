// *********************
// Role of the component: Footer component
// Name of the component: Footer.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Footer />
// Input parameters: no input parameters
// Output: Footer component
// *********************

import { navigation } from "@/lib/utils";
import Link from "next/link";
import { FaPuzzlePiece } from "react-icons/fa6";

const Footer = () => {
  const footerLinks = [
    { heading: "Explore", items: navigation.sale },
    { heading: "Our world", items: navigation.about },
    { heading: "For puzzlers", items: navigation.buy },
    { heading: "Helpful links", items: navigation.help },
  ];

  return (
    <footer className="bg-[#263b32] text-[#f8f5ee]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e7c77f] text-[#263b32]">
                <FaPuzzlePiece className="text-2xl" aria-hidden="true" />
              </span>
              <span className="font-serif text-2xl font-bold">Piece <span className="text-[#e7c77f]">&amp;</span> Parcel</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#d3d8ce]">
              A thoughtfully chosen collection of jigsaws for quiet moments, shared tables, and curious minds.
            </p>
            <Link href="/shop" className="mt-6 inline-flex rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10">
              Find a puzzle
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerLinks.map(({ heading, items }) => (
              <div key={heading}>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#e7c77f]">{heading}</h3>
                <ul role="list" className="mt-5 space-y-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-[#e3e5dc] transition hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
          </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-[#cbd0c7] lg:px-10">
          © {new Date().getFullYear()} Piece &amp; Parcel. Find a little joy in every piece.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
