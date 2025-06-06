"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import laptopsvg from "@/public/svgs/menlaptop.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LaptopLottie from "./LaptopLottie";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);
const Textsvg2 = () => {
  const textsvg2containerRef = useRef(null);
  const triggerRef2 = useRef(null);
  useEffect(() => {
    const setupAnimations2 = () => {
      const section2 = textsvg2containerRef.current;

      const paragraph1 = new SplitType(".textsvg2-content1", {
        types: "words, chars",
      });
      const paragraph2 = new SplitType(".textsvg2-content2", {
        types: "words, chars",
      });
      if (!section2) return;

      gsap.set(section2, { clearProps: "all" });

      gsap.registerPlugin(ScrollTrigger);
      triggerRef2.current?.kill();

      // Prevent words from breaking across lines
      document
        .querySelectorAll(".textsvg2-content1 .word,.textsvg2-content2 .word")
        .forEach((el) => {
          el.style.whiteSpace = "nowrap";
        });

      // Timeline for animation
      const ptl = gsap.timeline({
        scrollTrigger: {
          trigger: textsvg2containerRef.current,
          start: "top-=100% center",
          end: "bottom-=100% top",
          toggleActions: "play reverse play reverse",
          markers: false,
        },
        defaults: { ease: "power2.out" },
      });

      ptl.fromTo(
        ".textsvg2-content2 .char",
        { fontWeight: "300", color: "#515151" },
        {
          fontWeight: "400",
          color: "#000",
          stagger: 0.1,
          duration: 0.2,
        }
      );
      triggerRef2.current = ptl.scrollTrigger;
    };
    requestAnimationFrame(() => {
      setTimeout(setupAnimations2, 100);
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ptl.kill();
      triggerRef2.current?.kill();
    };
  }, []);
  return (
    <section
      className="h-screen bg-white w-full second-main-section flex relative justify-start max-sm:py-[3rem] items-center overflow-hidden"
      ref={textsvg2containerRef}
    >
      <div className=" hidden md:grid grid-cols-2 mx-[15rem] second-section   max-sm:h-full max-sm:py-[5rem]">
        <div className="flex flex-col justify-center gap-[2rem] pr-[4rem] items-start max-sm:items-center max-sm:mb-10">
          <h2 className="text-[#525299] font-semibold  text-[3.6rem]  textsvg2-content1">
            The Problem
          </h2>
          <p className="text-[5.8rem] text-left text-[#515151] font-[300] max-sm:text-center  leading-[1.25]">
            <span className="font-[400] text-black textsvg2-content2">
              Stress is a lifestyle issue.
            </span>{" "}
            It builds quietly, drains you daily, but we don't talk about it
            enough.
          </p>
        </div>

        <div className="">
          {/* <Image
            src={laptopsvg}
            height="402"
            width="603"
            alt=""
            className=" w-[90rem] h-auto "
          /> */}
       
          <LaptopLottie />
        </div>
      </div>
      <div className="md:hidden w-full h-full flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full  flex flex-col items-center text-center gap-8">
          <h2 className="text-[#525299] font-semibold text-6xl textsvg2-content1 leading-tight">
            The Problem
          </h2>
          
          <p className="text-7xl text-center text-[#8a8a8a] font-light leading-relaxed">
            <span className="font-medium text-black textsvg2-content2">
              Stress is a lifestyle issue.
            </span>{" "}
            It builds quietly, drains you daily, but we don't talk about it enough.
          </p>
          
          <div className="w-full  mt-4">
          <LaptopLottie />
          </div>
        </div>
      </div>  
    </section>
  );
};

export default Textsvg2;