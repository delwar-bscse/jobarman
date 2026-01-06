"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/app/styles.css";

import Image from "next/image";
import Link from "next/link";

import { myFetch } from "utils/myFetch";
import { formatUrl } from "utils/formatUrl";

export default function CarouselBanner() {
  const [categoryDatas, setCategoryDatas] = useState<any[]>([]);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchSpotlights = async () => {
      try {
        const res = await myFetch("/spotlight", { method: "GET" });
        setCategoryDatas(res?.data || []);
      } catch (error) {
        console.error("Failed to fetch spotlight data", error);
      }
    };

    fetchSpotlights();
  }, []);

  return (
    <div
      className="relative w-full max-w-[1440px] mx-auto cursor-pointer px-2"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
    >
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        slidesPerView={1}
        spaceBetween={20}
        speed={2000}
        loop
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          300: { slidesPerView: 1 },
          520: { slidesPerView: 2 },
          920: { slidesPerView: 3 },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {categoryDatas.map((item, index) => (
          <SwiperSlide key={item?._id || index}>
            <Link
              href={`/all-spotlight?id=${item?._id}`}
              className="h-[300px] overflow-hidden pb-12 flex flex-col items-center justify-center gap-2"
            >
              <Image
                src={formatUrl(item?.cover_image)}
                alt={item?.alt || "Spotlight banner"}
                width={1000}
                height={600}
                className="w-full h-full object-cover rounded-sm"
                priority={index === 0}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
