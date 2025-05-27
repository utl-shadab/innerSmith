"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import userFeel from "@/public/svgs/userFeel.svg";
import accuracy from "@/public/svgs/accuracy.svg";
import journeys from "@/public/svgs/journeys.svg";
import riskfree from "@/public/svgs/riskfree.svg";
import Image from "next/image";

const cardData = [
  {
    imglink: userFeel,
    title: (
      <h3
        className={`text-[3.6rem] font-[500] leading-[1.2] max-sm:text-[5rem] `}
      >
        {" "}
        9 in 10 Feel
        <br /> Better in <br />
        Just 14 Days
      </h3>
    ),
    text: "Tailored stress relief, powered by practices old and new, proven to help you feel better.",
  },
  {
    imglink: accuracy,
    title: (
      <h3
        className={`text-[3.6rem] font-[500] leading-[1.2] max-sm:text-[5rem] `}
      >
        {" "}
        98% Tool
        <br /> Match
        <br /> Accuracy
      </h3>
    ),
    text: "Every recommendation is tuned to your mood, energy, and what actually helps you reset.",
  },
  {
    imglink: journeys,
    title: (
      <h3
        className={`text-[3.6rem] font-[500] leading-[1.2] max-sm:text-[5rem] `}
      >
        {" "}
        Healing
        <br /> Paths. One <br />
        Just for You.
      </h3>
    ),
    text: "Explore daily journeys that shift and grow with how you feel.",
  },
  {
    imglink: riskfree,
    title: (
      <h3
        className={`text-[3.6rem] font-[500] leading-[1.2] max-sm:text-[5rem] `}
      >
        {" "}
        7 Day
        <br /> Risk-Free
        <br /> Trial
      </h3>
    ),
    text: "Experience meaningful change, or get 100% of your money back, no questions asked.",
  },
];

const Speciality = () => {
  const specialref = useRef();
  const specialtriggerRef = useRef(null);
  useEffect(() => {
    const setUpSpecialAnimation = () => {
      const specialSection = specialref.current;
      if (!specialSection) return;

      gsap.set(specialSection, { clearProps: "all" });

      gsap.registerPlugin(ScrollTrigger);
      specialtriggerRef.current?.kill();

      specialtriggerRef.current = ScrollTrigger.create({
        trigger: specialSection,
        start: "top-=100% 80%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        markers: false,
        onRefresh: (self) => self.refresh(),
        onEnter: () => {
          gsap.fromTo(
            specialSection.querySelectorAll(".card"),
            {
              opacity: 0,
              scale: 0.4,
              y: 50,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.3,
            }
          );
        },
        // animation: gsap.fromTo(
        //   ".card",
        //   { color: "transparent", y: 10 },
        //   { color: "#fff", y: 0 }
        // ),
      });
    };
    requestAnimationFrame(() => {
      setTimeout(setUpSpecialAnimation, 100);
    });
    return () => {
      specialtriggerRef.current?.kill();
    };
  }, []);
  return (
    <>
      <section
        ref={specialref}
        className="specialitySection h-full w-screen bg-white text-black py-12 flex relative max-sm:h-full justify-start items-center overflow-hidden"
      >
        <div className=" w-full  mx-[15rem] max-lg:grid-cols-1 max-md:mx-[15px]">
          <div className="flex justify-center ">
            <div className="headingTitle max-w-2/3 text-center text-[5.8rem] font-[300] text-[#515151] leading-[1.25] max-lg:px-[15px] max-lg:mb-[3rem]">
              <span className="text-black font-[700]">500+ </span> {"  "}
              <span className="text-black font-[400]">
                Scientifically-Backed Tools,
              </span>{" "}
              Matched to You
            </div>
          </div>

          <div className="px-2 mt-[3rem]">
            <div className="grid grid-cols-4 gap-[1.2rem] max-lg:grid-cols-2 max-sm:grid-cols-1">
              {cardData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="card bg-[#F3F3F3] rounded-[40px] p-[3rem] pr-[2rem] border border-white  hover:shadow-2xl max-sm:rounded-[10px] max-sm:p-[5rem]"
                  >
                    <div className="flex flex-col gap-[3rem] items-start justify-between">
                      <Image
                        src={item.imglink}
                        height="64"
                        width="64"
                        alt=""
                        className="w-[7rem] h-auto"
                      />

                      {item.title}

                      <p className="text-[2.4rem] font-[300] leading-[1.4] max-sm:text-[3.5rem] ">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Speciality;
