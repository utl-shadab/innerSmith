"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Textpage1 = () => {
  const textpage1containerRef = useRef(null);

  useEffect(() => {
    // Split the text
    // Split the text into words and characters
    const paragraph1 = new SplitType(".textPage1-content1", {
      types: "words, chars",
    });
    const paragraph2 = new SplitType(".textPage1-content2", {
      types: "words, chars",
    });

    // Prevent words from breaking across lines
    document
      .querySelectorAll(".textPage1-content1 .word, .textPage1-content2 .word")
      .forEach((el) => {
        el.style.whiteSpace = "nowrap";
      });

    // Timeline for animation
    const ptl = gsap.timeline({
      scrollTrigger: {
        trigger: textpage1containerRef.current,
        start: "top-=100% center",
        end: "+=600",
        toggleActions: "play pause resume reset",
        markers: false,
      },
      defaults: { ease: "power2.out" },
    });

    ptl.fromTo(
      ".textPage1-content2 .char",
      { color: "#6d6c6c" },
      {
        color: "#00A6FF",
        y: 0,
        stagger: 0.1,
        duration: 0.2,
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
      ref={textpage1containerRef}
      className="h-screen flex justify-center items-center"
    >
      <div className="textContainer px-[4rem] text-center">
        <p className="textPage1-content1 text-white text-[9rem] font-[500]">
          The weight of stress is real.
        </p>
        <p className="textPage1-content2 text-white text-[9rem] font-[500]">
          So is the way forward.
        </p>
      </div>
    </div>
  );
};

export default Textpage1;
