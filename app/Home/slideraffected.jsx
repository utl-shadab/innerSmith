"use client";

import React, { useRef } from "react";
import AffectedComponent from "../components/affectedComponent";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
const affectedData = [
  {
    title: "970M",
    text: "globally experience a mental disorder.",
  },
  {
    title: "77%",
    text: "say stress affects their body.",
  },
  {
    title: "31%",
    text: "rank stress as their #1 health concern.",
  },
];
const Slideraffected = () => {
  const swiperRef = useRef(null);

  return (
    <section className="h-screen affectedSlider w-screen overflow-clip relative pb-10">
      <Swiper
        slidesPerView="auto"
        spaceBetween={0}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="mySwiper"
      >
        {affectedData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div>
              <AffectedComponent
                titleCount={slide.title}
                textrel={slide.text}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slideraffected;
