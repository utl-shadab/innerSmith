"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const affectedData = [
  {
    title: "970M",
    text: "globally experience a mental disorder.",
  },
  {
    title: "77%",
    text: "say stress affects their body.",
  },
  {
    title: "31%",
    text: "rank stress as their #1 health concern.",
  },
];

const Affected = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { title, text } = affectedData[currentIndex];

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    affectedData.forEach((item, i) => {
      tl.add(() => {
        setCurrentIndex(i);

        gsap.fromTo(
          titleRef.current,
          {
            // rotationX: -90,
            opacity: 1,
            transformPerspective: 1000,
            transformOrigin: "bottom center",
          },
          {
            rotationX: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.out",
          }
        );

        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      });

      tl.to({}, { duration: 3 }); // delay before next item
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top-=100% 40%",
      end: "bottom-=100% top",
      onEnter: () => {
        gsap.delayedCall(0.05, () => tl.restart(true));
      },
      onEnterBack: () => {
        gsap.delayedCall(0.05, () => tl.restart(true));
      },
      markers: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      className="AffectedSection w-screen h-screen mb-12 overflow-hidden"
      ref={sectionRef}
    >
      <div className="affectedContainer h-full flex justify-center items-center gap-16 max-lg:flex-col max-lg:gap-8 px-10 perspective-[1000px]">
        <div className="text-white text-[8rem] text-left whitespace-nowrap max-lg:text-[8rem] max-sm:text-[5rem] max-lg:text-center">
          You're Not Alone <span className="max-lg:hidden">&#8213;</span>
        </div>

        <div className="flex flex-col w-1/4 max-lg:w-full max-lg:items-center max-lg:px-4">
          <div className="border-b-2 border-[#FF7171] pb-4 flex items-end">
            <h1
              ref={titleRef}
              className="text-[#FF7171] font-bold leading-[1] text-[9rem]  whitespace-nowrap max-lg:text-center max-lg:text-[10rem] max-sm:text-[8rem]"
            >
              {title}
            </h1>
            <p className="uppercase text-[#FF7171] text-[4rem] font-[400] ml-[10px] inline">
              PEOPLE
            </p>
          </div>
          <h3
            ref={textRef}
            className="font-[400] text-white pt-4 text-[4rem] leading-[1.1] text-wrap max-lg:text-[4rem] max-sm:text-[3.2rem] max-lg:text-center max-lg:mt-[10px]"
          >
            {text}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Affected;
