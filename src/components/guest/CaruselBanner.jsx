"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const aiSlides = [
  { src: "/alljobs.png", alt: "UX Conference" },
  { src: "/banner.png", alt: "We are Hiring UI/UX" },
  { src: "/company.jpg", alt: "Coaching Classes" },
  { src: "/cardpic.png", alt: "Career Growth" },
  { src: "/areYouEmploy.png", alt: "Employer Spotlight" },
];

export default function CaruselBanner() {
  const [aiPage, setAiPage] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [paused, setPaused] = useState(false);

  const handleDragEnd = (e) => {
    if (!draggingRef.current) return;
    const diff = getClientX(e) - startXRef.current;
    const threshold = 60; // px
    if (diff < -threshold && aiPage < totalPages - 1) setAiPage(aiPage + 1);
    else if (diff > threshold && aiPage > 0) setAiPage(aiPage - 1);
    draggingRef.current = false;
    startXRef.current = 0;
  };

  const handleDragStart = (e) => {
    draggingRef.current = true;
    startXRef.current = getClientX(e);
  };

  const totalPages = Math.ceil(aiSlides.length / slidesPerView);
  const pages = Array.from({ length: totalPages }, (_, i) =>
    aiSlides.slice(i * slidesPerView, i * slidesPerView + slidesPerView)
  );

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setSlidesPerView(1);
      else if (w < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={(e) => {
            setPaused(false);
            handleDragEnd(e);
          }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          // onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${aiPage * 100}%)` }}
          >
            {pages?.map((group, pageIndex) => (
              <div
                key={pageIndex}
                className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {group.map((s, i) => (
                  <div
                    key={`${pageIndex}-${i}`}
                    className="bg-white rounded-xl shadow-sm border overflow-hidden"
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={10}
                      height={10}
                      sizes="100vh"
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Dots navigation */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setAiPage(i)}
                className={`w-2.5 h-2.5 rounded-full ${
                  aiPage === i ? "bg-[#123499]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
