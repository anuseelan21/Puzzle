import Link from "next/link";

const highlights = [
  ["01", "Choose your scene", "Countryside, coast, wildlife, and little worlds to get lost in."],
  ["02", "Set your own pace", "A gentle 500-piece evening or a bigger weekend challenge."],
  ["03", "Make room to unwind", "Put the kettle on, find the edge pieces, and settle in."],
];

const IntroducingSection = () => {
  return (
    <section className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b66b4d]">A slower kind of happy</p>
          <h2 className="mt-3 max-w-lg font-serif text-3xl font-bold leading-tight text-[#263b32] sm:text-4xl">
            The best bits happen between the pieces.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map(([number, title, description]) => (
            <article key={number} className="border-t border-[#e9e3d8] pt-4">
              <span className="text-sm font-bold text-[#bd6849]">{number}</span>
              <h3 className="mt-2 font-semibold text-[#2f584b]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#70766f]">{description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[#eee9df] pt-6">
        <Link href="/shop" className="text-sm font-bold text-[#2f584b] underline decoration-[#bd6849] decoration-2 underline-offset-4 hover:text-[#bd6849]">
          Find your next puzzle
        </Link>
      </div>
    </section>
  );
};

export default IntroducingSection;
