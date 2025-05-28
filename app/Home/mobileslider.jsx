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
    content: "A community that reminds you that you’re never in this alone.",
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
      "Art-based therapy, music, movement, and other expressive outlets for when words aren’t enough.",
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
    <section className="mobileSlider h-screen bg-white relative overflow-hidden py-24 max-md:py-4">
      <div className="mobileSlider-content grid grid-cols-[65%_35%] h-full px-[5rem] max-md:grid-cols-1 max-md:px-[2rem] max-md:gap-[1.5rem] max-md:pt-[2rem]">
        <div className="mobileSlider-text flex relative flex-col justify-center pt-[4rem] text-left h-full px-[5rem]">
          <h2 className="text-[#6AA7BB] capitalize text-[3rem] max-md:text-[4rem]">
            Inside The App
          </h2>
          <p className="text-[#515151] text-[5rem] mt-8 font-[300] leading-[1.25] max-md:text-[2.8rem] pr-20">
            <span className="font-[400] text-black block">
              {" "}
              {ImageData[activeIndex].title}
            </span>

            {ImageData[activeIndex].content}
          </p>

          <div className="paginationTemp mt-auto items-start max-[640px]:hidden"></div>
        </div>
        {/* MOBILE VIEW SLIDER */}
        <div className="slider pt-[5rem]  relative max-sm:pt-[3rem] hidden max-[640px]:block">
          <div className="relative  flex justify-center items-center h-auto ">
            <Image
              src="/svgs/mobileScreen.svg"
              alt=""
              height="686"
              width="329"
              className=" absolute top-[0] mobilebgframe  left-[24%] w-[46%]  z-[3] max-sm:!left-[24%] "
            />
            <div className="overflow-hidden w-1/2 mobileframeslider max-sm:!w-1/2">
              <Swiper
                modules={[Autoplay, Navigation]}
                slidesPerView="1"
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
                  setActiveIndex(swiper.realIndex); // ✅ Update on slide change
                }}
                loop={true}
              >
                {ImageData.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image.imgLInk}
                      alt={image.title}
                      height="672"
                      width="310"
                      className="w-max h-max max-sm:!w-[88%] "
                    />
                  </SwiperSlide>
                ))}{" "}
              </Swiper>
              {/* */}
            </div>
          </div>
        </div>

        {/* FOr larger screens */}
        <div className="sliderDiv  relative my-auto  max-md:pt-[3rem] block max-[640px]:hidden">
          <div className="relative  flex justify-center items-center h-auto w-full">
            <div className="overflow-hidden w-max  mobileframeslider ">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView="1"
                spaceBetween={0}
                speed={1000}
                className="w-[50%] !ml-0"
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
                  setActiveIndex(swiper.realIndex); // ✅ Update on slide change
                }}
                loop={true}
              >
                {ImageData.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image.imgLInk}
                      alt={image.title}
                      height="672"
                      width="310"
                      className="w-max h-max rounded-[30px] "
                    />
                  </SwiperSlide>
                ))}{" "}
              </Swiper>
              <Image
                src="/svgs/mobileScreen.svg"
                alt=""
                height="686"
                width="329"
                className=" absolute top-[0] mobilebgframe w-auto   left-[-1%] h-[100%]  z-[3] "
              />
              {/* */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mobileslider;
