// *********************
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[#f5efe4]">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-[0.95fr_1.05fr] md:px-10 lg:py-20">
        <div className="relative z-10 flex flex-col items-start">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#426357]">
            <span className="h-2 w-2 rounded-full bg-[#d27a55]" />
            A little more joy, piece by piece
          </p>
          <h1 className="max-w-xl font-serif text-5xl font-bold leading-[1.04] tracking-tight text-[#23372f] sm:text-6xl lg:text-7xl">
            Find your next
            <span className="mt-2 block italic text-[#bd6849]">happy place.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#5e675f]">
            Lovely jigsaws for slow Sundays, family tables, and anyone who loves
            the click of the right piece.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-[#2f584b] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#234338]"
            >
              Shop all puzzles
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-[#c9c4b8] bg-white/70 px-7 py-3.5 text-sm font-bold text-[#2f584b] transition hover:bg-white"
            >
              Browse the collection
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-[#59655d]">
            <span className="flex -space-x-2" aria-hidden="true">
              <span className="h-9 w-9 rounded-full border-2 border-[#f5efe4] bg-[#edc781]" />
              <span className="h-9 w-9 rounded-full border-2 border-[#f5efe4] bg-[#d9e3ce]" />
              <span className="h-9 w-9 rounded-full border-2 border-[#f5efe4] bg-[#e8c7b5]" />
            </span>
            <span>Pick a picture. Make a little time for you.</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[650px]">
          <div className="absolute -left-5 top-8 h-24 w-24 rounded-full bg-[#e8c579] blur-2xl sm:-left-10" />
          <div className="absolute -right-4 bottom-8 h-32 w-32 rounded-full bg-[#c4d2b7] blur-2xl" />
          <div className="relative rotate-1 overflow-hidden rounded-[2rem] border-[10px] border-white bg-white shadow-[0_30px_70px_-30px_rgba(47,64,52,0.4)]">
            <Image
              src="/puzzle-hero.svg"
              width={800}
              height={700}
              alt="Colourful illustrated jigsaw scene of a cottage in the countryside"
              priority
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -bottom-5 left-5 rounded-2xl bg-white px-5 py-3 shadow-lg sm:left-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a8b76]">Your next little escape</p>
            <p className="mt-1 font-serif text-lg font-bold text-[#2f584b]">One piece at a time</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
