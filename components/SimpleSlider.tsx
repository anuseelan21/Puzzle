"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image: "/puzzle-dales.svg",
    alt: "Illustrated cottage among green hills",
    eyebrow: "A scene to get lost in",
    heading: "Find a little escape, one piece at a time.",
    description: "Choose a picture you love, then settle in and enjoy the small discoveries.",
  },
  {
    image: "/puzzle-woodland.svg",
    alt: "Illustrated fox in a quiet woodland",
    eyebrow: "Make time for a slower moment",
    heading: "Bring a little calm to your puzzle table.",
    description: "Explore a thoughtfully chosen collection for solo Sundays and shared afternoons.",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function SimpleSlider() {
  return (
    <div className="slider-container mx-auto max-w-7xl px-6 py-8 md:px-10">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.heading} className="relative h-[500px] overflow-hidden rounded-3xl max-lg:h-[400px] max-md:h-[300px]">
            <Image src={slide.image} alt={slide.alt} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#263b32]/20" />
            <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center text-white">
              <p className="text-sm font-bold uppercase tracking-[0.2em]">{slide.eyebrow}</p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">{slide.heading}</h2>
              <p className="mt-4 max-w-xl text-base leading-7 sm:text-lg">{slide.description}</p>
              <Link href="/shop" className="mt-7 rounded-full bg-[#e7c77f] px-7 py-3 font-bold text-[#263b32] transition hover:bg-[#f1d99e]">
                Explore puzzles
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
