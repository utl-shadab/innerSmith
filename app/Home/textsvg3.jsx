"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import womansvg from "@/public/svgs/woman.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);
const Textsvg3 = () => {
  const textsvg3containerRef = useRef(null);

  useEffect(() => {
    const paragraph1 = new SplitType(".textsvg3-content1", {
      types: "words, chars",
    });
    const paragraph2 = new SplitType(".textsvg3-content2", {
      types: "words, chars",
    });

    // Prevent words from breaking across lines
    document
      .querySelectorAll(".textsvg3-content1 .word, .textsvg3-content2 .word")
      .forEach((el) => {
        el.style.whiteSpace = "nowrap";
      });

    // Timeline for animation
    const ptl = gsap.timeline({
      scrollTrigger: {
        trigger: textsvg3containerRef.current,
        start: "top-=100% center",
        end: "+=600",
        toggleActions: "play none none none",
        markers: false,
      },
      defaults: { ease: "power2.out" },
    });

    ptl.fromTo(
      ".textsvg3-content2 .char",
      { color: "#000" },
      {
        color: "#7BB338",
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
      className="h-screen bg-white flex relative justify-start items-center overflow-hidden"
      ref={textsvg3containerRef}
    >
      <div className="flex mx-[15rem] max-sm:flex-col max-sm:mx-[15px] max-sm:justify-around max-sm:h-full max-sm:py-[5rem]">
        <div className=" flex flex-col justify-around ">
          <div className="flex flex-col justify-around items-start max-sm:items-center max-sm:mb-10">
            <h2 className="text-[#7BB338] font-semibold  text-[3.6rem] mb-4 textsvg3-content1">
              Lost in the ‘what now?’
            </h2>
            <p className="text-[6.4rem] text-left font-[300]  leading-[1] max-sm:text-center max-sm:leading-[1.2] max-sm:my-4">
              We’ll Help You{" "}
              <span className="text-[#7BB338] font-[400] block max-sm:inline textsvg3-content2">
                Find Your Way
              </span>
            </p>
          </div>
          <p className="text-[2.4rem] font-[400]  text-black w-[40%] max-sm:w-[90%] max-sm:text-center max-sm:text-[3rem] max-sm:mx-auto">
            One chapter is ending, but the next one? That’s yours to write.
            Let’s help you feel more like<em> you</em> again.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={womansvg}
            height="340"
            width="280"
            alt=""
            className=" w-[38rem] h-auto max-sm:translate-x-[17%]"
          />
        </div>
      </div>
    </section>
  );
};

export default Textsvg3;
