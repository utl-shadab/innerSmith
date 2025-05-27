"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";

const slidesData = [
  { day: "Day 1", title: "Letting go & reclaiming your peace" },
  { day: "Day 2", title: "Releasing emotions through movement" },
  { day: "Day 3", title: "Rewriting your next chapter" },
  { day: "Day 4", title: "Leaning on the right support system" },
  { day: "Day 5", title: "Finding joy in new possibilities" },
  { day: "Day 6", title: "Strengthening self-worth & confidence" },
  { day: "Day 7", title: "Creating a vision for what’s next" },
  { day: "", title: "Your path to heal unfolds from here…" },
];

export default function Slider2() {
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
    <section className="slider2 w-screen h-screen bg-white flex flex-col justify-center  overflow-hidden">
      <div className="mx-[15rem] mb-12 max-sm:mx-[15px]">
        <h2 className="text-[6.4rem] justify-self-start font-[300] text-black max-sm:text-center w-full">
          Your Roadmap to{" "}
          <span className="font-[400] text-[#4078D8]">Feeling Better:</span>
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
            <SwiperSlide key={index} style={{ width: "60vh", height: "70vh" }}>
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
