"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";

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
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const frameRef = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline();

    if (isMobile) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power1.out" },
          "-=0.3"
        )
        .fromTo(
          contentRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power1.out" },
          "-=0.3"
        )
        .fromTo(
          frameRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power1.out" },
          "-=0.3"
        );

      gsap.to(frameRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    } else {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          contentRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          frameRef.current,
          { opacity: 0, scale: 0.8, rotation: 5 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );

      gsap.to(frameRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, []);

  const animateTextChange = (newIndex) => {
    if (isAnimating) return;

    setIsAnimating(true);

    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIndex);
        setIsAnimating(false);
      },
    });

    if (isMobile) {
      tl.to([titleRef.current, contentRef.current], {
        opacity: 0,
        x: -20,
        duration: 0.2,
        ease: "power1.in",
        stagger: 0.05,
      })

        .set([titleRef.current, contentRef.current], { x: 20 })
        .to([titleRef.current, contentRef.current], {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: "power1.out",
          stagger: 0.05,
        });
    } else {
      tl.to([titleRef.current, contentRef.current], {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.1,
      })

        .set([titleRef.current, contentRef.current], { x: 50 })
        .to([titleRef.current, contentRef.current], {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.1,
        });
    }
  };

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    if (newIndex !== activeIndex) {
      animateTextChange(newIndex);
    }
  };

  return (
    <section
      ref={containerRef}
      className="mobileSlider min-h-screen bg-gradient-to-br from-white to-gray-50 relative overflow-hidden py-8 lg:py-16"
    >
      <div className="mobileSlider-content grid grid-cols-1 lg:grid-cols-[55%_45%] xl:grid-cols-[60%_40%] h-full gap-8 lg:gap-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Text Content */}
        <div className="mobileSlider-text flex items-center flex-col justify-center text-left h-full order-2 lg:order-1 px-0 sm:px-4 lg:px-8 xl:px-12">
          <h2
            ref={headerRef}
            className="text-[#7BB338] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold self-start mb-4 lg:mb-6 tracking-wide"
          >
            INSIDE THE APP
          </h2>

          <div className="text-content w-full">
            <p
              ref={titleRef}
              className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold mb-3 lg:mb-4 leading-tight"
            >
              {ImageData[activeIndex].title}
            </p>

            <p
              ref={contentRef}
              className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light leading-relaxed max-w-3xl"
            >
              {ImageData[activeIndex].content}
            </p>
          </div>
        </div>

        {/* Slider Content */}
        <div className="slider flex items-center justify-center relative order-1 lg:order-2 py-8 lg:py-12">
          <div
            ref={frameRef}
            className="relative flex justify-center items-center h-auto w-full max-w-sm lg:max-w-md xl:max-w-lg"
          >
            {/* Phone Frame */}
            <Image
              src="/svgs/mobileScreen.svg"
              alt="Phone Frame"
              height="686"
              width="329"
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-auto z-10 max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[450px]"
              priority
            />

            {/* Slider Container */}
            <div className="overflow-hidden relative w-[85%] max-w-[240px] sm:max-w-[270px] md:max-w-[310px] lg:max-w-[340px] xl:max-w-[380px] aspect-[310/672] mx-auto">
              <Swiper
                modules={[Autoplay, Navigation, EffectFade]}
                slidesPerView={1}
                spaceBetween={0}
                navigation={false}
                centeredSlides={true}
                effect={window.innerWidth < 768 ? "slide" : "fade"}
                fadeEffect={{
                  crossFade: true,
                }}
                speed={window.innerWidth < 768 ? 500 : 800}
                autoplay={{
                  delay: window.innerWidth < 768 ? 4000 : 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={handleSlideChange}
                loop={true}
                preloadImages={false}
                lazy={true}
                updateOnWindowResize={true}
                resizeObserver={true}
                className="h-full w-full rounded-3xl overflow-hidden"
              >
                {ImageData.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <Image
                      src={image.imgLInk}
                      alt={image.title}
                      height="672"
                      width="310"
                      className="w-full h-full object-cover object-center"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {ImageData.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[#7BB338] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#7BB338] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-300 opacity-5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Mobileslider;
