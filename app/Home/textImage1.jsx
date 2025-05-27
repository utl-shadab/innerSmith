"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";
import grassbg from "@/public/images/rightImage1.png";

gsap.registerPlugin(ScrollTrigger);

const TextImage1 = () => {
  const textimage1containerRef = useRef(null);

  useEffect(() => {
    const paragraph1 = new SplitType(".textImage1-content1", {
      types: "words, chars",
    });
    const paragraph2 = new SplitType(".textImage1-content2", {
      types: "words, chars",
    });

    // Prevent words from breaking across lines
    document
      .querySelectorAll(
        ".textImage1-content1 .word, .textImage1-content2 .word"
      )
      .forEach((el) => {
        el.style.whiteSpace = "nowrap";
      });

    // Timeline for animation
    const ptl = gsap.timeline({
      scrollTrigger: {
        trigger: textimage1containerRef.current,
        start: "top-=100% center",
        end: "+=600",
        toggleActions: "play pause resume reset",
        markers: false,
      },
      defaults: { ease: "power2.out" },
    });

    ptl.fromTo(
      ".textImage1-content2 .char",
      { color: "#000" },
      {
        color: "#98C956",
        y: 0,
        stagger: 0.03,
        duration: 1,
      },
      "-=0.8" // slight overlap
    );

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ptl.kill();
    };
  }, []);
  return (
    <section
      className="h-screen bg-white flex relative justify-start items-center w-screen overflow-hidden"
      ref={textimage1containerRef}
    >
      <div className="ml-[10rem] mr-auto max-sm:mx-[10px] max-sm:-translate-y-1/3 max-sm:px-[14px]">
        <h3 className="text-[#98C956] uppercase font-[500] textImage1-content1 text-[3.6rem]  text-left max-sm:text-center">
          Innersmith is like a gym for your mind
        </h3>
        <p className="text-[#515151] text-[4rem] mt-[1rem] font-[400]">
          It helps you:
        </p>
        <ul className="text-[#515151] text-[4rem] font-[300] list-disc list-inside max-sm:text-left">
          <li>Build resilience</li>
          <li>Sharpen focus</li>
          <li>Strengthen your inner calm</li>
        </ul>
        <p className="text-[#98C956] text-[4rem] font-[400] textImage1-content2">
          So stress stops running the show.
        </p>
      </div>
      <div>
        <Image
          src={grassbg}
          height="501"
          width="751"
          alt=""
          className="absolute right-0 bottom-0 w-[75rem] h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default TextImage1;
