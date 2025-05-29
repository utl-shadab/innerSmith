"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const ImageData = [
  {
    title: "Wellness, simplified.",
    content:
      "Practical tools designed to help you feel better, anytime, anywhere.",
    imgLInk: "/svgs/mobileSlider/wellness.svg",
  },
  {
    title: "Feel Supported",
    content: "A community that reminds you that you're never in this alone.",
    imgLInk: "/svgs/mobileSlider/feelSupport.svg", 
  },
  {
    title: "Shift Your Mindset",
    content:
      "Psychologically proven techniques like CBT & EFT to rewire negative thinking.",
    imgLInk: "/svgs/mobileSlider/ShiftMind.svg",
  },
  {
    title: "Quiet Your Mind", 
    content:
      "Powerful meditations & sensory resets for instant relief and balance.",
    imgLInk: "/svgs/mobileSlider/QueitMind.svg",
  },
  {
    title: "Heal Creatively",
    content:
      "Art-based therapy, music, movement, and other expressive outlets for when words aren't enough.",
    imgLInk: "/svgs/mobileSlider/Heal.svg",
  },
  {
    title: "Let It Out",
    content:
      "Venting spaces & guided reflections to process and heal, judgment-free.",
    imgLInk: "/svgs/mobileSlider/LetitOut.svg",
  },
];

const Mobileslider = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mobileSlider min-h-screen bg-white relative overflow-hidden py-8 sm:py-16 md:py-24 lg:py-32">
      <div className="mobileSlider-content grid grid-cols-1 lg:grid-cols-[65%_35%] h-full w-full px-4 sm:px-8 md:px-12 lg:px-[7rem] gap-8">
        <div className="mobileSlider-text flex relative flex-col justify-center pt-4 sm:pt-8 lg:pt-[5rem] text-left h-full px-4 sm:px-8 lg:px-[7rem]">
          <h2 className="text-[#6AA7BB] capitalize text-2xl sm:text-3xl md:text-4xl lg:text-[3.6rem]">
            Inside The App
          </h2>
          <p className="text-[#515151] text-2xl sm:text-3xl md:text-4xl lg:text-[5.8rem] mt-4 sm:mt-6 lg:mt-10 font-[300] leading-[1.25] pr-4 sm:pr-12 lg:pr-24">
            <span className="font-[400] text-black block">
              {ImageData[activeIndex].title}
            </span>
            {ImageData[activeIndex].content}
          </p>
          <div className="paginationTemp mt-auto items-start hidden sm:block"></div>
        </div>

        {/* Mobile View Slider */}
        <div className="slider pt-4 sm:pt-8 relative block sm:hidden">
          <div className="relative flex justify-center items-center h-auto">
            <Image
              src="/svgs/mobileScreen.svg"
              alt=""
              height="686"
              width="329"
              className="absolute top-0 mobilebgframe left-1/4 w-1/2 z-[3]"
            />
            <div className="overflow-hidden w-1/2 mobileframeslider">
              <Swiper
                modules={[Autoplay, Navigation]}
                slidesPerView={1}
                spaceBetween={0}
                navigation={false}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                loop={true}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 1,
                  }
                }}
              >
                {ImageData.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image.imgLInk}
                      alt={image.title}
                      height="672"
                      width="310"
                      className="w-full h-auto object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Desktop View Slider */}
        <div className="sliderDiv relative my-auto hidden sm:block">
          <div className="relative flex justify-center items-center h-auto w-full">
            <div className="overflow-hidden w-full max-w-md mobileframeslider">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={0}
                speed={1000}
                className="w-full"
                navigation={false}
                pagination={{ el: ".paginationTemp", clickable: true }}
                centeredSlides={false}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 1,
                  }
                }}
              >
                {ImageData.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image.imgLInk}
                      alt={image.title}
                      height="672"
                      width="310"
                      className="w-full sm:h-[30rem] md:h-auto  object-contain rounded-[30px]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Image
                src="/svgs/mobileScreen.svg"
                alt=""
                height="686"
                width="329"
                className="absolute top-0 mobilebgframe w-auto left-[21%] sm:h-[30rem] md:h-full z-[3]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mobileslider;
