"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";
import walkbg from "@/public/images/rightImage2.svg";
import walkbgfull from "@/public/images/walkbgfull.png";

gsap.registerPlugin(ScrollTrigger);

const TextImage2 = () => {
  const textimage2containerRef = useRef(null);

  const triggerRef3 = useRef(null);

  useEffect(() => {
    const setupAnimations1 = () => {
      const section1 = textimage2containerRef.current;

      const paragraph1 = new SplitType(".textImage2-content1", {
        types: "words, chars",
      });
      const paragraph2 = new SplitType(".textImage2-content2", {
        types: "words, chars",
      });
      if (!section1) return;

      gsap.set(section1, { clearProps: "all" });

      gsap.registerPlugin(ScrollTrigger);
      triggerRef3.current?.kill();

      // Prevent words from breaking across lines
      document
        .querySelectorAll(".textsvg2-content1 .word,.textsvg2-content2 .word")
        .forEach((el) => {
          el.style.whiteSpace = "nowrap";
        });

      // Timeline for animation
      const ptl = gsap.timeline({
        scrollTrigger: {
          trigger: textimage2containerRef.current,
          start: "top-=100% center",
          end: "bottom-=100% top",
          toggleActions: "play reverse play reverse",
          markers: false,
        },
        defaults: { ease: "power2.out" },
      });

      ptl.fromTo(
        ".textImage2-content2 .char",
        { fontWeight: "300", color: "#515151" },
        {
          fontWeight: "400",
          color: "#000",
          stagger: 0.05,
          duration: 0.1,
        }
      );
      triggerRef3.current = ptl.scrollTrigger;
    };
    requestAnimationFrame(() => {
      setTimeout(setupAnimations1, 100);
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ptl.kill();
      triggerRef3.current?.kill();
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
  //       trigger: textimage2containerRef.current,
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
  //         color: "#7BB338",
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
      ref={textimage2containerRef}
      className="h-screen bg-white w-full flex relative justify-start items-center overflow-hidden max-lg:flex-col max-lg:justify-center max-lg:items-start"
    >
      <div className="absolute bottom-0 right-0  translate-x-1/2 translate-y-[45%] scale-125">
        <Image
          src={walkbgfull}
          height="973"
          width="973"
          alt=""
          className=" w-[700px] h-auto object-cover hidden text-center max-lg:block "
        />
      </div>
      <div className="grid grid-cols-2 h-full">
        <div className="ml-[10rem] flex  flex-col justify-center max-sm:max-w-full max-sm:ml-0 max-sm:px-[15px] pr-[10rem]  max-lg:pb-[20rem]">
          <h2 className="text-[#7BB338] font-semibold  text-[3.6rem] mb-2 textImage2-content1 max-sm:text-center max-lg:text-[4rem] max-sm:mb-6">
            A Journey That Fits You
          </h2>
          <p className="text-[5.8rem] text-left text-[#515151] font-[300] max-sm:text-center mt-8  leading-[1.25]">
            <span className="font-[400] text-black textImage2-content2">
              Be it heartache, loss, exhaustion, or just a rough day,
            </span>{" "}
            there's a path for you here.
          </p>
        </div>
        <div className="relative">
          <Image
            src={walkbg}
            height="973"
            width="973"
            alt=""
            className="absolute walkbgImage right-0 bottom-0 w-[75rem]] h-full max-lg:hidden "
          />
          {/* <Image
            src={walkbgfull}
            height="973"
            width="973"
            alt=""
            className="absolute walkbgImage left-1/2 bottom-0 h-full scale-200 object-cover max-lg:hidden min-[2500px]:w-[110rem]"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default TextImage2;
