"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

import logoAnimated from "@/public/logoAnimated.gif";

gsap.registerPlugin(ScrollTrigger);

const TextImage3 = () => {
  const textimage3containerRef = useRef(null);

  const triggerRef4 = useRef(null);

  useEffect(() => {
    const setupAnimations3 = () => {
      const section2 = textimage3containerRef.current;

      const paragraph1 = new SplitType(".textImage3-content1", {
        types: "words, chars",
      });
      const paragraph2 = new SplitType(".textImage3-content2", {
        types: "words, chars",
      });
      if (!section2) return;

      gsap.set(section2, { clearProps: "all" });

      gsap.registerPlugin(ScrollTrigger);
      triggerRef4.current?.kill();

      // Prevent words from breaking across lines
      document
        .querySelectorAll(".textsvg2-content1 .word,.textsvg2-content2 .word")
        .forEach((el) => {
          el.style.whiteSpace = "nowrap";
        });

      // Timeline for animation
      const ptl = gsap.timeline({
        scrollTrigger: {
          trigger: textimage3containerRef.current,
          start: "top-=100% center",
          end: "bottom-=100% top",
          toggleActions: "play reverse play reverse",
          markers: false,
        },
        defaults: { ease: "power2.out" },
      });

      ptl.fromTo(
        ".textImage3-content2 .char",
        { color: "#515151" },
        {
          color: "#000",
          stagger: 0.05,
          duration: 0.1,
        }
      );
      triggerRef4.current = ptl.scrollTrigger;
    };
    requestAnimationFrame(() => {
      setTimeout(setupAnimations3, 100);
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ptl.kill();
      triggerRef4.current?.kill();
    };
  }, []);

  // useEffect(() => {
  //   // Split the text

  //   const paragraph1 = new SplitType(".textImage2-content1", {
  //     types: "words, chars",
  //   });
  //   const paragraph2 = new SplitType(".textImage2-content2", {
  //     types: "words, chars",
  //   });

  //   // Prevent words from breaking across lines
  //   document
  //     .querySelectorAll(
  //       ".textImage1-content2 .word, .textImage2-content2 .word"
  //     )
  //     .forEach((el) => {
  //       el.style.whiteSpace = "nowrap";
  //     });

  //   // Timeline for animation
  //   const ptl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: textimage3containerRef.current,
  //       start: "top-=100% center",
  //       end: "+=600",
  //       toggleActions: "play pause resume reset",
  //       markers: false,
  //     },
  //     defaults: { ease: "power2.out" },
  //   });

  //   ptl
  //     .fromTo(
  //       ".textImage2-content1 .char",
  //       { color: "#000" },
  //       {
  //         color: "#FE8A65",
  //         y: 0,
  //         stagger: 0.03,
  //         duration: 1,
  //       }
  //     )
  //     .fromTo(
  //       ".textImage2-content2 .char",
  //       { color: "#515151" },
  //       {
  //         color: "#000",
  //         y: 0,
  //         stagger: 0.03,
  //         duration: 1,
  //       },
  //       "-=0.8" // slight overlap
  //     );

  //   // Clean up
  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  return (
    <section
      className="h-screen bg-white flex relative justify-center items-center w-screen overflow-hidden"
      ref={textimage3containerRef}
    >
      <div className="grid grid-cols-2 mx-[15rem] max-lg:grid-cols-1 max-lg:mx-[15px]">
        <div className="flex flex-col justify-center  max-sm:max-w-full max-sm:ml-0 max-lg:px-[10px]  max-lg:pb-[20rem] pr-16">
          <h2 className="text-[#FE8A65] font-semibold  text-[3.6rem] mb-2 textImage3-content1 max-sm:text-center max-lg:text-[4rem] max-sm:mb-6">
            Feel More Like Yourself With InnerSmith
          </h2>
          <p className="text-[5.8rem] text-left text-[#515151] font-[300] max-sm:text-center mt-7  leading-[1.25]">
            <span className="font-[400] text-black textImage3-content2">
              InnerSmith guides you through quick, calming activities
            </span>{" "}
            that help you show up for your work, your people, and yourself.
          </p>
        </div>
        <div className="bg-white relative max-lg:text-center flex justify-center">
          <Image
            src={logoAnimated}
            height="401"
            width="551"
            alt=""
            className="w-[80%] h-auto"
          />
          {/* <video
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className="top-0 left-0 w-full h-full block object-cover max-sm:object-centre max-md:hidden"
          >
            <source
              src="https://thescaleagency.s3.amazonaws.com/inner%20smith%20final%20transparent.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video> */}
        </div>
      </div>
    </section>
  );
};

export default TextImage3;
