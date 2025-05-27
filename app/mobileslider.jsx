"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

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
    <section className="mobileSlider h-screen bg-white relative overflow-hidden py-32 max-md:py-4">
      <div className="mobileSlider-content grid grid-cols-[60%_40%] h-full px-[7rem] max-sm:grid-cols-1 max-sm:px-[2rem] max-sm:gap-[2rem] max-sm:pt-[2rem]  ">
        <div className="mobileSlider-text flex  items-center flex-col justify-center text-left h-full px-[7rem]  ">
          <h2 className="text-[#7BB338] text-[3.6rem]  self-start max-sm:text-[5rem]">
            INSIDE THE APP
          </h2>
          <p className="text-black text-[6.4rem] font-[300] max-md:text-[3rem] max-sm:text-[3rem]">
            <span className="font-[400] text-black">
              {" "}
              {ImageData[activeIndex].title}
            </span>
            <br />
            {ImageData[activeIndex].content}
          </p>
        </div>
        <div className="slider pt-[5rem]  relative max-sm:pt-[3rem]">
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
                  console.log("Swiper initialized:", swiper);
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
                      className="w-max h-max max-sm:!w-[88%]"
                    />
                  </SwiperSlide>
                ))}{" "}
              </Swiper>
              {/* */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mobileslider;
