"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import walksvg from "@/public/svgs/menburden.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);
const Textsvg1 = () => {
  const textsvg1containerRef = useRef(null);
  const triggerRef1 = useRef(null);

  useEffect(() => {
    const setupAnimations1 = () => {
      const section1 = textsvg1containerRef.current;

      const paragraph1 = new SplitType(".textsvg1-content1", {
        types: "words, chars",
      });
      const paragraph2 = new SplitType(".textsvg1-content2", {
        types: "words, chars",
      });
      if (!section1) return;

      gsap.set(section1, { clearProps: "all" });

      gsap.registerPlugin(ScrollTrigger);
      triggerRef1.current?.kill();

      // Prevent words from breaking across lines
      document
        .querySelectorAll(".textsvg2-content1 .word,.textsvg2-content2 .word")
        .forEach((el) => {
          el.style.whiteSpace = "nowrap";
        });

      // Timeline for animation
      const ptl = gsap.timeline({
        scrollTrigger: {
          trigger: textsvg1containerRef.current,
          start: "top-=100% center",
          end: "bottom-=100% top",
          toggleActions: "play reverse play reverse",
          markers: false,
        },
        defaults: { ease: "power2.out" },
      });

      ptl.fromTo(
        ".textsvg1-content2 .char",
        { fontWeight: "300", color: "#515151" },
        {
          fontWeight: "400",
          color: "#000",
          stagger: 0.05,
          duration: 0.1,
        }
      );
      triggerRef1.current = ptl.scrollTrigger;
    };
    requestAnimationFrame(() => {
      setTimeout(setupAnimations1, 100);
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ptl.kill();
      triggerRef1.current?.kill();
    };
  }, []);
  
  return (
    <section
      className="h-screen bg-white  flex relative justify-start items-center overflow-hidden"
      ref={textsvg1containerRef}
    >
      <div className=" fourth-section hidden md:grid grid-cols-2 mx-[15rem]   max-sm:h-full max-sm:py-[5rem]">
        <div className="flex flex-col justify-center gap-[2rem] pr-[4rem] items-start max-sm:items-center max-sm:mb-10">
          <h2 className="text-[#525299]  font-semibold  text-[3.6rem]  textsvg2-content1">
          Let’s Disrupt The Spiral
          </h2>
          <p className="text-[5.8rem] fourth-sec-text text-left text-[#515151] font-[300] max-sm:text-center  leading-[1.25]">
            <span className="font-[400] text-black textsvg2-content2">
            What if support showed up the moment the tension set in?
            </span>{" "}
            What if something helped you feel better in minutes?
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
          <video
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            className="  h-[500px]  w-full block object-contain max-sm:object-centre  max-sm:py-[5rem] max-sm:px-[1rem]  "
          >
            <source
               src="https://thescaleagency.s3.amazonaws.com/Innersmith/weight_animation.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="md:hidden w-full h-full flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full  flex flex-col items-center text-center gap-8">
          <h2 className="text-[#525299] font-semibold text-6xl textsvg2-content1 leading-tight">
          Let’s Disrupt The Spiral
          </h2>
          
          <p className="text-7xl text-center text-[#8a8a8a] font-light leading-relaxed">
            <span className="font-medium text-black textsvg2-content2">
            What if support showed up the moment the tension set in?
            </span>{" "}
            What if something helped you feel better in minutes?
          </p>
          
          <div className="w-full  mt-4">
          <video
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            className="  h-[700px]  w-full block object-contain max-sm:object-centre  max-sm:py-[5rem] max-sm:px-[1rem] "
          >
            <source
                src="https://thescaleagency.s3.amazonaws.com/Innersmith/weight_animation.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          </div>
        </div>
      </div>  
    </section>
  );
};

export default Textsvg1;
