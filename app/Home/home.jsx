"use client";

import React, { useEffect, useRef } from "react";

import { gsap } from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const Home = () => {
  const headingRef = useRef();
  const heroRef = useRef();
  const herocontentref = useRef();
  const triggerRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const setupAnimations = () => {
      const section = heroRef.current;

      if (!section || !herocontentref.current) return;

      gsap.set(section, { clearProps: "all" });
      new SplitType(".about-content1", { types: "chars" });
      new SplitType(".about-content2", { types: "chars" });

      gsap.registerPlugin(ScrollTrigger);
      triggerRef.current?.kill();

      gsap.from(herocontentref.current, {
        opacity: 0,
        yPercent: 200,
        delay: 8,
        duration: 1,
      });

      gsap.fromTo(
        section,
        { backgroundSize: " auto 115%" },
        { backgroundSize: " auto 125%", delay: 10.5, duration: 1.5 }
      );

      triggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: "bottom-=70% bottom",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        markers: false,
        onRefresh: (self) => self.refresh(),
        animation: gsap.fromTo(
          ".about-content1 .char",
          { color: "transparent", y: 10 },
          { color: "#fff", y: 0, stagger: 0.03, duration: 1 }
        ),
      });
    };

    const setupAnimationsMobile = () => {
      const section = heroRef.current;

      if (!section || !herocontentref.current) return;

      gsap.set(section, { clearProps: "all" });
      new SplitType(".about-content1", { types: "words, chars" });

      // Prevent words from breaking across lines
      document.querySelectorAll(".about-content1 .word").forEach((el) => {
        el.style.whiteSpace = "nowrap";
      });

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      triggerRef.current?.kill();

      gsap.from(herocontentref.current, {
        opacity: 0,
        yPercent: 200,
        delay: 8,
        duration: 1,
      });

      gsap.fromTo(
        section,
        { backgroundSize: "auto 100%" },
        { backgroundSize: "auto 120%", delay: 10.5, duration: 1.5 }
      );

      triggerRef.current = ScrollTrigger.create({
        trigger: herocontentref.current,
        start: "top-=100% bottom",
        end: "top-=100% top",
        toggleActions: "play reverse play reverse",
        markers: false,
        onRefresh: (self) => self.refresh(),
        animation: gsap.fromTo(
          ".about-content1 .char",
          { color: "transparent", y: 10 },
          { color: "#fff", y: 0, stagger: 0.03, duration: 1 }
        ),
      });
    };

    mm.add("(min-width: 1035px)", () => {
      requestAnimationFrame(() => {
        setTimeout(setupAnimations, 100);
      });
    });

    mm.add("(max-width: 1034px)", () => {
      requestAnimationFrame(() => {
        setTimeout(setupAnimationsMobile, 100);
      });
    });

    return () => {
      triggerRef.current?.kill();
      mm.revert();
    };
  }, []);

  // useEffect(() => {
  //   const mm = gsap.matchMedia();

  //   const setupAnimations = () => {
  //     const section = heroRef.current;
  //     const bgImage = imageRef.current;

  //     if (!section || !bgImage || !herocontentref.current) return;

  //     // Force layout reflow before measuring
  //     gsap.set(section, { clearProps: "all" });

  //     let paragraph1 = new SplitType(".about-content1", { types: "chars" });
  //     let paragraph2 = new SplitType(".about-content2", { types: "chars" });

  //     // Register plugin
  //     gsap.registerPlugin(ScrollTrigger);
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  //     // Entry animations
  //     const animate1 = gsap.from(herocontentref.current, {
  //       opacity: 0,
  //       yPercent: 200,
  //       delay: 8,
  //       duration: 1,
  //     });

  //     const animateimg = gsap.fromTo(
  //       bgImage,
  //       { scale: 1 },
  //       { scale: 1.3, delay: 9, duration: 1.5 }
  //     );

  //     const animatetext = gsap.fromTo(
  //       section,
  //       { backgroundSize: " 100%" },
  //       { backgroundSize: " 120%", delay: 10.5, duration: 1.5 }
  //     );

  //     // Scroll-triggered animation
  //     let ptl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "bottom-=70% bottom",
  //         end: "bottom top",
  //         toggleActions: "play reverse play reverse",
  //         markers: false,
  //         onRefresh: (self) => self.refresh(),
  //       },
  //       defaults: { ease: "power2.out" },
  //     });

  //     ptl.fromTo(
  //       ".about-content1 .char",
  //       { color: "transparent", y: 10 },
  //       { color: "#fff", y: 0, stagger: 0.03, duration: 1 }
  //     );
  //   };
  //   const setupAnimationsmobile = () => {
  //     const section = heroRef.current;
  //     const bgImage = imageRef.current;

  //     if (!section || !bgImage || !herocontentref.current) return;

  //     // Force layout reflow before measuring
  //     gsap.set(section, { clearProps: "all" });

  //     let paragraph1 = new SplitType(".about-content1", { types: "chars" });

  //     // Register plugin
  //     gsap.registerPlugin(ScrollTrigger);
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  //     // Entry animations
  //     const animate1 = gsap.from(herocontentref.current, {
  //       opacity: 0,
  //       yPercent: 200,
  //       delay: 8,
  //       duration: 1,
  //     });

  //     const animateimg = gsap.fromTo(
  //       bgImage,
  //       { scale: 1 },
  //       { scale: 1.3, delay: 9, duration: 1.5 }
  //     );

  //     const animatetext = gsap.fromTo(
  //       section,
  //       { backgroundSize: "auto 100%" },
  //       { backgroundSize: "auto 120%", delay: 10.5, duration: 1.5 }
  //     );

  //     // Scroll-triggered animation
  //     let ptl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "bottom-=70% bottom",
  //         end: "bottom top",
  //         toggleActions: "play reverse play reverse",
  //         markers: false,
  //         onRefresh: (self) => self.refresh(),
  //       },
  //       defaults: { ease: "power2.out" },
  //     });

  //     ptl.fromTo(
  //       ".about-content1 .char",
  //       { color: "transparent", y: 10 },
  //       { color: "#fff", y: 0, stagger: 0.03, duration: 1 }
  //     );
  //   };
  //   // Run setup only on large screens
  //   mm.add("(min-width: 1035px)", () => {
  //     // Defer until next frame so DOM is stable
  //     requestAnimationFrame(() => {
  //       setTimeout(() => {
  //         setupAnimations();
  //       }, 100); // wait for layout/render completion
  //     });
  //   });

  //   // Run setup only on small screens
  //   mm.add("(max-width: 1034px)", () => {
  //     // Defer until next frame so DOM is stable
  //     requestAnimationFrame(() => {
  //       setTimeout(() => {
  //         setupAnimationsmobile();
  //       }, 100); // wait for layout/render completion
  //     });
  //   });

  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //     mm.revert();
  //   };
  // }, []);

  // useEffect(() => {
  //   const mm = gsap.matchMedia();
  //   let width = window.innerWidth;
  //   function resize() {
  //     width = window.innerWidth;
  //   }

  //   mm.add("(min-width: 1035px)", () => {
  //     let paragraph1 = new SplitType(".about-content1");
  //     let paragraph2 = new SplitType(".about-content2");
  //     const bgImage = imageRef.current;

  //     const section = heroRef.current;

  //     const scrollEnd = section.offsetHeight * 0.9;

  //     gsap.registerPlugin(ScrollTrigger);
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  //     const animate1 = gsap.from(herocontentref.current, {
  //       opacity: 0,
  //       yPercent: 200,
  //     });
  //     const animateimg = gsap.fromTo(bgImage, { scale: 1 }, { scale: 1.3 });
  //     const animatetext = gsap.fromTo(
  //       heroRef.current,
  //       { backgroundSize: " 100%" },
  //       { backgroundSize: " 120%" }
  //     );
  //     animate1.delay(8);
  //     animate1.duration(1);
  //     animateimg.delay(9);
  //     animatetext.delay(10.5);
  //     animateimg.duration(1.5);
  //     animatetext.duration(1.5);

  //     let ptl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: heroRef.current, // or ".about-wrapper" or appropriate container
  //         start: "bottom center", // When this hits middle of viewport
  //         end: "bottom top",
  //         toggleActions: "play reverse play reverse", // Plays once on enter
  //         markers: true,
  //         onRefresh: (self) => {
  //           self.refresh(); // Refreshes the trigger position
  //         },
  //       },
  //       defaults: { ease: "power2.out" },
  //     });

  //     ptl.fromTo(
  //       ".about-content1 .char",
  //       { color: "transparent" },
  //       {
  //         color: "#fff",
  //         y: 0,
  //         stagger: 0.03,
  //         duration: 1,
  //       }
  //     );
  //   });
  //   // mm.add("(max-width: 1024px)", () => {
  //   //   const bgImage = imageRef.current;

  //   //   const section = heroRef.current;

  //   //   const scrollEnd = section.offsetHeight * 0.9;

  //   //   gsap.registerPlugin(ScrollTrigger);
  //   //   ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  //   //   const animate1 = gsap.from(herocontentref.current, {
  //   //     opacity: 0,
  //   //     yPercent: 200,
  //   //   });
  //   //   const animateimg = gsap.fromTo(bgImage, { scale: 1 }, { scale: 1.3 });
  //   //   const animatetext = gsap.fromTo(
  //   //     heroRef.current,
  //   //     { backgroundSize: "auto 100%" },
  //   //     { backgroundSize: "auto 120%" }
  //   //   );
  //   //   animate1.delay(8);
  //   //   animate1.duration(1);
  //   //   animateimg.delay(9);
  //   //   animatetext.delay(10.5);
  //   //   animateimg.duration(1.5);
  //   //   animatetext.duration(1.5);

  //   //   let paragraph1 = new SplitType(".about-content1");
  //   //   let paragraph2 = new SplitType(".about-content2");

  //   //   let ptl = gsap.timeline({
  //   //     scrollTrigger: {
  //   //       trigger: imageRef.current, // or ".about-wrapper" or appropriate container
  //   //       start: "bottom 65%", // When this hits middle of viewport
  //   //       end: "+=600",
  //   //       toggleActions: "play  reverse play reverse", // Plays once on enter
  //   //       markers: false,
  //   //       onRefresh: (self) => {
  //   //         self.refresh(); // Refreshes the trigger position
  //   //       },
  //   //     },
  //   //     defaults: { ease: "power2.out" },
  //   //   });

  //   //   ptl
  //   //     .fromTo(
  //   //       ".about-content1 .char",
  //   //       { color: "transparent" },
  //   //       {
  //   //         color: "#fff",
  //   //         y: 0,
  //   //         stagger: 0.03,
  //   //         duration: 1,
  //   //       }
  //   //     )
  //   //     .fromTo(
  //   //       ".about-content2 .char",
  //   //       { color: "transparent" },
  //   //       {
  //   //         color: "#fff",
  //   //         y: 0,
  //   //         stagger: 0.03,
  //   //         duration: 1,
  //   //       },
  //   //       "-=1" // overlaps the second animation
  //   //     );
  //   // });
  //   // .fromTo(
  //   //   heroRef.current,
  //   //   { backgroundAttachment: "scroll" },
  //   //   {
  //   //     backgroundAttachment: "fixed",
  //   //   }
  //   //   // overlaps the second animation
  //   // );

  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  return (
    <section
      className="heroSection relative h-[200vh] top-0  pb-[40vh] max-lg:px-[15px] "
      ref={heroRef}
    >
      <div className=" inline !absolute top-[7.6rem] left-[12rem] ">
        <Image
          src="/mainLogomini.svg"
          height="74"
          width="74"
          alt="logo"
          className="h-auto w-[9rem] max-sm:-translate-x-1/2"
        />
      </div>
      <div
        className="herocontent text-white pt-[20vh]   z-[7] top-[0] flex flex-col gap-2 items-center bg-transparent left-0 right-0 text-center  max-sm:px-[15px]"
        ref={herocontentref}
      >
        <div className="relative px-[10px]">
          <div className="flex flex-col gap-[2.8rem]">
            <h3 className="text-[4rem] font-[400] heroline leading-[1.5] ">
              Stress is a loop that keeps you stuck.
            </h3>
            <h1
              className="text-[12.8rem] font-[400] text-white leading-[1] max-sm:text-[10rem]"
              ref={headingRef}
            >
              InnerSmith
            </h1>
            <h3 className="text-[4rem] herosupportline font-[400] leading-[1.5]">
              helps you break free and{" "}
              <span className="italic max-sm:block font-[600]">
                Feel Better, Live Better
              </span>
            </h3>
          </div>
          <div className="flex flex-col items-center mt-[10vh] gap-[1.6rem] heronavigation">
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              className="animate-bounce"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "4.1rem", width: "4.1rem" }}
            >
              <mask
                id="mask0_161_3215"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="41"
                height="41"
              >
                <rect x="0.5" y="0.5" width="40" height="40" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_161_3215)">
                <path
                  d="M20.5009 37.1666C17.2787 37.1666 14.5287 36.0277 12.2509 33.7499C9.97312 31.4721 8.83423 28.7221 8.83423 25.4999V15.4999C8.83423 12.2777 9.97312 9.5277 12.2509 7.24992C14.5287 4.97214 17.2787 3.83325 20.5009 3.83325C23.7231 3.83325 26.4731 4.97214 28.7509 7.24992C31.0287 9.5277 32.1676 12.2777 32.1676 15.4999V25.4999C32.1676 28.7221 31.0287 31.4721 28.7509 33.7499C26.4731 36.0277 23.7231 37.1666 20.5009 37.1666ZM22.1676 15.4999H28.8342C28.8342 13.4999 28.2023 11.736 26.9384 10.2083C25.6745 8.68047 24.0842 7.72214 22.1676 7.33325V15.4999ZM12.1676 15.4999H18.8342V7.33325C16.9176 7.72214 15.3273 8.68047 14.0634 10.2083C12.7995 11.736 12.1676 13.4999 12.1676 15.4999ZM20.5009 33.8333C22.8065 33.8333 24.7717 33.0208 26.3967 31.3958C28.0217 29.7708 28.8342 27.8055 28.8342 25.4999V18.8333H12.1676V25.4999C12.1676 27.8055 12.9801 29.7708 14.6051 31.3958C16.2301 33.0208 18.1953 33.8333 20.5009 33.8333Z"
                  fill="#EBEBEB"
                />
              </g>
            </svg>
            <h4 className="text-[2rem] font-[400] leading-[1.5]">
              SCROLL TO CONTINUE
            </h4>
          </div>
        </div>
      </div>

      <div className="about-content text-[#fff]  mt-[90vh] bottom-[25%] left-0 right-0 flex flex-col items-center">
        <h3 className="about-content1 text-[5.6rem] font-[400] text-center">
          Say hello to the{" "}
          <span className="font-[700]">
            world’s first holistic wellness app{" "}
          </span>
          <span className="block max-lg:inline">
            that improves your sleep, focus, and emotional balance,{" "}
          </span>
          <span className="block max-lg:inline">starting on day one.</span>
        </h3>
      </div>
    </section>
  );
};

export default Home;
