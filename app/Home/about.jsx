"use client";
import React, { useRef, useEffect } from "react";
// import AboutComponent from "../components/aboutComponent";
import { gsap } from "gsap";
import Image from "next/image";
import bgsvg from "@/public/svgs/aboutsec.svg";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);

const data = [
  "Most wellness solutions don’t truly see you.",
  "You’re overwhelmed, stretched thin, caught in the chaos.",
  "Burnout. Stress. Exhaustion. They creep in.",
];

const About = () => {
  const containerRef = useRef(null);
  // const panelRef = useRef([]);
  // useEffect(() => {
  //   const panels = gsap.utils.toArray(".panel");

  //   panels.forEach((panel, i) => {
  //     ScrollTrigger.create({
  //       trigger: panel,
  //       start: "top-=100% " + i * 10,
  //       end: "bottom-=100% top-=10%",
  //       pin: true,
  //       scrub: true,
  //       pinSpacer: false,
  //       pinSpacing: false,
  //       markers: true, // enable true for debugging
  //     });
  //   });

  //   // Optional Cleanup
  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //     const spacer = document.querySelector(".pin-spacer");
  //     if (spacer) spacer.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   const panels = gsap.utils.toArray(".panel");
  //   console.log(panels);
  //   gsap.to(panels, {
  //     xPercent: -100 * (panels.length - 1),
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: ".panel",
  //       start: "top-=100% top",
  //       pin: ".panel",
  //       pinSpacing: false,
  //       scrub: 1,
  //       snap: 1 / (panels.length - 1),
  //       end: () => "+=" + containerRef.current.offsetWidth,
  //       markers: true,
  //     },
  //   });

  //   return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  // }, []);
  const titleRef = useRef(null);
  useEffect(() => {
    let splitInstance = null;
    const tl = gsap.timeline({ paused: true });

    data.forEach((text) => {
      tl.add(() => {
        if (splitInstance) {
          splitInstance.revert();
        }
        titleRef.current.textContent = text;

        splitInstance = new SplitType(titleRef.current, { types: "words" });

        gsap.fromTo(
          splitInstance.words,
          { opacity: 0 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power1.out",
          }
        );
      });
      tl.to({}, { duration: 3 }); // pause between each line
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top-=100% center",
      markers: false,
      onEnter: () => {
        tl.restart(true); // play when entering
      },
      onEnterBack: () => {
        tl.restart(true); // play again when scrolling back
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      if (splitInstance) splitInstance.revert();
    };
  }, []);
  return (
    <section className="Aboutsection w-screen  overflow-hidden">
      <div ref={containerRef}>
        <div className="flex flex-col  h-full w-max">
          <div
            // key={index}
            // ref={(el) => (panelRef.current[index] = el)}
            className="panel w-screen h-full flex-shrink-0 flex items-center justify-center "
          >
            {/* <AboutComponent titleContent={text} /> */}
            <div className="w-[100vw] h-[100vh] bg-no-repeat  bg-black relative flex items-center justify-center overflow-hidden">
              <div className=" mx-auto">
                <div
                  className="absolute top-0 h-max left-0 right-0 flex justify-center text-center bg-black opacity-50 z-10"
                  style={{ transform: "translateY(-45%)" }}
                >
                  <Image
                    src={bgsvg}
                    height="416"
                    width="624"
                    alt=""
                    className="w-[62rem] h-auto border-[1.5px] border-white border-opacity-20 rounded-4xl"
                  />
                </div>
                <div className="w-[62rem] px-[4rem] mx-auto">
                  <h1
                    ref={titleRef}
                    className="text-white text-[5.5rem] text-left leading-[1.1] font-[500]   z-20 relative"
                  >
                    {data[0]}
                  </h1>
                </div>
                <div
                  className="absolute bottom-0 h-max left-0 right-0 flex justify-center text-center bg-black opacity-50 z-10 "
                  style={{ transform: "translateY(45%)" }}
                >
                  <Image
                    src={bgsvg}
                    height="416"
                    width="624"
                    alt=""
                    className="w-[62rem] h-auto border-[1.5px] border-white border-opacity-20 rounded-4xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
