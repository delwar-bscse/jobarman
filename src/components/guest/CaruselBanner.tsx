"use client";

import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/app/styles.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { myFetch } from 'utils/myFetch';
import { formatUrl } from 'utils/formatUrl';

export default function CaruselBanner() {
  const [categoryDatas, setCategoryDatas] = React.useState<any>([]);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null); //

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await myFetch("/spotlight", {
        method: "GET",
      });
      console.log("Slider : ",res?.data)
      setCategoryDatas(res?.data);
    };
    fetchCategories();
  }, []);

  return (
    <div
      className="relative w-full max-w-[1440px] mx-auto  cursor-pointer"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
    >
      <Swiper
        slidesPerView={2}
        // spaceBetween={20}
        speed={2000}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper; // save swiper instance
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          520: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {categoryDatas?.length > 0 && categoryDatas?.map((item: Record<string, any>, index: number) => (
          <SwiperSlide key={index}>
            <div className='h-[300px] overflow-hidden pb-12 flex items-center justify-center flex-col gap-2'>
              <Image
                src={formatUrl(item?.cover_image)}
                alt={item?.alt}
                width={1000}
                height={600}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
