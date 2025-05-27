"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const slidesData = [
  { day: "Day 1", title: "Pausing to breathe & reset" },
  { day: "Day 2", title: "Restoring energy through movement" },
  { day: "Day 3", title: "Realigning with what truly matters" },
  { day: "Day 4", title: "Setting boundaries that protect your peace" },
  { day: "Day 5", title: "Making time for yourself guilt-free" },
  { day: "Day 6", title: "Reigniting passion & motivation" },
  { day: "Day 7", title: "Creating a work-life rhythm that lasts" },
  { day: "", title: "Healing unfolds  and your journey continues…" },
];

export default function Slider3() {
  const swiperRef = useRef(null);
  const hoverTimeoutRef = useRef(null); // 👈 to store timeout id

  const handleMouseEnter = (index) => {
    hoverTimeoutRef.current = setTimeout(() => {
      swiperRef.current?.slideTo(index);
    }, 500); // 2000ms = 2 seconds
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
  };

  return (
    <section className="slider3 w-screen h-screen bg-white flex flex-col justify-center  overflow-hidden">
      <div className="mx-[15rem] mb-12 max-sm:mx-[15px]">
        <h2 className="text-[6.4rem] justify-self-start font-[300] text-black max-sm:text-center w-full">
          A <span className="font-[400] text-[#7BB338]">Guided Plan</span> to
          Help You Move Forward:
        </h2>
      </div>
      <div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={0}
          centeredSlides={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="mySwiper"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="circle-slide text-[2.4rem]"
                onClick={() => swiperRef.current?.slideTo(index)}
                style={{ cursor: "pointer" }} // optional: show pointer cursor on hover
              >
                <div className="text-left">
                  <span className="text-[2.4rem]">{slide.day}</span>
                  <h3 className="text-[4.6rem] max-sm:text-[4rem]">
                    {slide.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
