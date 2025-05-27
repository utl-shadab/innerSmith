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
  //   const paragraph1 = new SplitType(".textsvg1-content1", {
  //     types: "words, chars",
  //   });
  //   const paragraph2 = new SplitType(".textsvg1-content2", {
  //     types: "words, chars",
  //   });

  //   // Prevent words from breaking across lines
  //   document
  //     .querySelectorAll(".textsvg1-content1 .word, .textsvg1-content2 .word")
  //     .forEach((el) => {
  //       el.style.whiteSpace = "nowrap";
  //     });

  //   // Timeline for animation
  //   const ptl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: textsvg1containerRef.current,
  //       start: "top-=100% center",
  //       end: "+=600",
  //       toggleActions: "play none none none",
  //       markers: true,
  //     },
  //     defaults: { ease: "power2.out" },
  //   });

  //   ptl
  //     .fromTo(
  //       ".textsvg1-content1 .char",
  //       { color: "#000" },
  //       {
  //         color: "#D17700",
  //         y: 0,
  //         stagger: 0.03,
  //         duration: 1,
  //       }
  //     )
  //     .fromTo(
  //       ".textsvg1-content2 .char",
  //       { color: "#000" },
  //       {
  //         color: "#D17700",
  //         y: 0,
  //         stagger: 0.03,
  //         duration: 1,
  //       },
  //       "-=0.8" // slight overlap
  //     );

  //   // Clean up
  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //     ptl.kill();
  //   };
  // }, []);

  return (
    <section
      className="h-screen bg-white  flex relative justify-start items-center overflow-hidden"
      ref={textsvg1containerRef}
    >
      <div className="grid grid-cols-2 mx-[15rem] max-lg:grid-cols-1 max-lg:mx-[15px]">
        <div className=" mr-auto flex flex-col justify-around ">
          <div className="flex flex-col justify-around gap-[2rem] items-start max-lg:items-center max-lg:mb-10">
            <h2 className="text-[#6AA7BB] font-semibold capitalise text-[3.6rem] mb-4 max-lg:text-center textsvg1-content1">
              Let’s Disrupt The Spiral
            </h2>
            <p className="text-[5.8rem]  text-left text-[#515151] font-[300] max-sm:text-center  leading-[1.2]">
              <span className="font-[400]  text-black textsvg1-content2">
                What if support showed up the moment the tension set in?
              </span>{" "}
              What if something helped you feel better in minutes?
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center max-lg:mt-12">
          {/* <Image
            src={walksvg}
            height="441"
            width="250"
            alt=""
            className=" w-[30rem] h-auto "
          />
           */}
          <video
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            className="top-0 left-0 w-auto h-[38%] block object-cover max-sm:object-centre max-lg:w-[40%] max-lg:h-full"
          >
            <source
              src="https://thescaleagency.s3.amazonaws.com/Innersmith/weight_animation.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Textsvg1;
