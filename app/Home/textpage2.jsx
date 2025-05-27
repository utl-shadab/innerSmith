"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Textpage2 = () => {
  const textpage2containerRef = useRef(null);

  useEffect(() => {
    // Split the text
    const paragraph1 = new SplitType(".textPage2-content1", { types: "chars" });
    const paragraph2 = new SplitType(".textPage2-content2", { types: "chars" });
    const paragraph3 = new SplitType(".textPage2-content3", { types: "chars" });
    const paragraph4 = new SplitType(".textPage2-content4", { types: "chars" });

    // Timeline for animation
    const ptl = gsap.timeline({
      scrollTrigger: {
        trigger: textpage2containerRef.current,
        start: "top-=100% center",
        end: "+=600",
        toggleActions: "play none none none",
        markers: false,
      },
      defaults: { ease: "power2.out" },
    });

    ptl
      .fromTo(
        ".textPage2-content1 .char",
        { color: "#fff" },
        {
          color: "#00A6FF",
          y: 0,
          stagger: 0.03,
          duration: 1,
        }
      )
      .fromTo(
        ".textPage2-content2 .char",
        { color: "#fff" },
        {
          color: "#00A6FF",
          y: 0,
          stagger: 0.03,
          duration: 1,
        },
        "-=0.8" // slight overlap
      )
      .fromTo(
        ".textPage2-content3 .char",
        { color: "#fff" },
        {
          color: "#00A6FF",
          y: 0,
          stagger: 0.03,
          duration: 1,
        }
      )
      .fromTo(
        ".textPage2-content4 .char",
        { color: "#fff" },
        {
          color: "#00A6FF",
          y: 0,
          stagger: 0.03,
          duration: 1,
        },
        "-=0.8" // slight overlap
      );

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className=" h-screen flex justify-center items-center"
      ref={textpage2containerRef}
    >
      <div className="textContainer px-[4rem] text-center flex flex-col justify-center items-center">
        <p className="text-white text-[3rem] italic text-center font-[500]">
          <span className="text-[#00A6FF] textPage2-content1">
            Wellness Shouldn't Take a Backseat
          </span>
        </p>
        <p className="text-white text-[7rem] text-center font-[500]">
          Our{" "}
          <span className="text-[#00A6FF] textPage2-content2">solutions</span>{" "}
          are built around you-{" "}
          <span className="text-[#00A6FF] textPage2-content3">
            tailored, adaptive,
          </span>{" "}
          and designed to{" "}
          <span className="text-[#00A6FF] textPage2-content4">
            fit seamlessly
          </span>{" "}
          into your life
        </p>
      </div>
    </div>
  );
};

export default Textpage2;
