"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";
import {gsap} from 'gsap';

const affectedDataSlide = [
  { title: "970M", text: "globally experience a mental disorder." },
  { title: "77%", text: "say stress affects their body. " },
  { title: "31%", text: "rank stress as their #1 health concern." },
];

const Verticalslider = () => {
  const swiperRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;

    const animateSlide = () => {
      const activeSlide = swiper.slides[swiper.activeIndex];
      const prevSlide = swiper.slides[swiper.previousIndex];

      if (prevSlide) {
        gsap.to(prevSlide, {
          autoAlpha: 0,
          y: 100,
          duration: 0.8,
          scrollTrigger: true,
          ease: "power3.out",
        });
      }

      if (activeSlide) {
        gsap.fromTo(
          activeSlide,
          { autoAlpha: 0, y: -100 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }
    };

    swiper.on("slideChangeTransitionStart", animateSlide);
    return () => {
      swiper.off("slideChangeTransitionStart", animateSlide);
    };
  }, []);


  return (
    <section className=" h-screen affectedSlider w-screen overflow-clip relative pb-10 md:pb-[10%]">
      <div className="affectedContainer h-full w-full flex justify-center items-center gap-16 max-lg:flex-col">
        <div className="text-white text-[7vw] lg:text-[3vw] text-left text-nowrap">
          You're Not Alone &#8213;
        </div>
        <div className="relative perspective-[1000px] flex justify-center items-center h-[300px] w-[600px] overflow-hidden">
          <Swiper
            loop={true}
            slidesPerView={1}
            direction="vertical"
            initialSlide={0}
            spaceBetween={0}
            speed={1500}
            centeredSlides={true}
            pagination={{ el: ".paginationTemporary", clickable: true }}
            autoplay={{
              delay: 2500, 
              disableOnInteraction: false,
              reverseDirection: true, 
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            creativeEffect={{
              prev: {
                translate: [0, "100%", -300],
                rotate: [-30, 0, 0],
                opacity: 0.5,
              },
              next: {
                translate: [0, "-100%", -300],
                rotate: [30, 0, 0],
                opacity: 0.5,
              },
            }}
            effect="creative"
            modules={[EffectCreative, Pagination, Autoplay]}
            className="dialSwiper h-[25rem] justify-start"
          >
            {affectedDataSlide.map((num, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col justify-center items-start px-6 bg-black h-full transition-transform duration-700">
                  <h1 className="text-[#FF7171] font-bold leading-[1] text-[9rem] border-b-2 border-[#FF7171] pb-4 text-nowrap">
                    {num.title}
                    <span className="uppercase !text-[4rem] font-[400] ml-[10px]">
                      PEOPLE
                    </span>
                  </h1>
                  <h3 className="font-[400] text-white text-[4rem] pt-4 text-wrap leading-[1.1]">
                    {num.text}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="paginationTemporary absolute w-full bottom-[5rem] !top-[90%] h-[10px] z-10 flex justify-center gap-10"></div>
    </section>
  );
};

export default Verticalslider;
