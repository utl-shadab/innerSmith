"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Notifiaction = () => {
  const sectionRef = useRef(null);
  const messagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        messagesRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power1.out",
          stagger: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top-=100% 70%", // start animating when section hits 70% from top
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // clean up on unmount
  }, []);

  const messages = [
    { text: "No more spiraling. You respond, not react.", white: true },
    { text: "Better sleep. Calmer mind.", white: false },
    { text: "You feel grounded amidst the chaos.", white: false },
    { text: "And, keep your cool.", white: false },
    { text: "Even when life doesn’t.", white: false },
  ];
  return (
    <section
      className="h-screen pt-22 overflow-hidden max-sm:pt-[10rem] max-sm:h-auto max-sm:py-[10rem]"
      ref={sectionRef}
    >
      <div className="px-[15rem] grid grid-cols-2 max-sm:grid-cols-1 max-sm:px-[15px]">
        <div className="relative">
          <h2 className="text-[8rem] font-[400] text-[#9A9A9A]">
            What <span className="text-[#fff]">Changes</span> <br />
            When You <span className="text-[#fff]">Start</span>
          </h2>

          <div className="relative max-sm:hidden">
            <Image
              src="/bubble.gif"
              alt=""
              height="480"
              width="480"
              className="h-auto w-full"
            />{" "}
            <div className="absolute inset-0 bg-[#0077CA] mix-blend-color z-10 pointer-events-none bottom-0"></div>
          </div>
        </div>
        <div className="pt-[4rem] max-sm:pt-[6rem]">
          <div className="notification-wrapper ">
            {messages.map((msg, index) => (
              <div
                key={index}
                ref={(el) => (messagesRef.current[index] = el)}
                className="notification-message border border-white rounded-[25.65px] px-[3rem] w-fit mb-[2rem] max-sm:mb-[2.5rem]"
              >
                <p
                  className={`text-[2.6rem] max-sm:text-[3rem] leading-[3.5] max-lg:leading-[1.5] max-lg:py-[2rem] font-[${
                    msg.white ? "700" : "400"
                  }] ${msg.white ? "text-white" : "text-[#A9A9A9]"}`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifiaction;
