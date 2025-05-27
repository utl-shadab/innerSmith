"use client";
import { useState, useEffect, useRef } from "react";
import Home from "./home";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Loader from "./loader";

import TextImage2 from "./textImage2";
import Textsvg1 from "./textsvg1";
import Textsvg2 from "./textsvg2";

import Mobileslider from "./mobileslider";

import Footer from "./footer";
import VideoSection from "./videoSection";
// import Slideraffected from "./slideraffected";
import TextImage3 from "./textImage3";
import Speciality from "./speciality";
import Verticalslider from "./verticalslider";
// import MobilesliderTest from "./mobileSliderTest";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Homepage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Scroll to top after video
    window.scrollTo(0, 0);

    setTimeout(() => {
      setShowContent(true);
      document.body.style.overflowY = "auto";
    }, 7000);

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    if (!showContent) return;

    const sections = gsap.utils.toArray(".sticky-section");
    const triggers = [];

    let isScrolling = false;

    const scrollToSection = (section) => {
      if (isScrolling) return;

      isScrolling = true;
      gsap.to(window, {
        duration: 0.8,
        scrollTo: section,
        ease: "power2.out",
        onComplete: () => {
          isScrolling = false;
        },
      });
    };

    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 90%", // Entering from bottom
        end: "top 10%", // Leaving out top
        markers: false,
        onEnter: (self) => {
          if (self.direction === 1) scrollToSection(section); // down
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [showContent]);

  // useEffect(() => {
  //   if (!showContent) return;

  //   const sectionSticky = gsap.utils.toArray(".sticky-section");

  //   sectionSticky.forEach((section) => {
  //     ScrollTrigger.create({
  //       trigger: section,
  //       start: "top bottom", // when top of section hits bottom of viewport
  //       end: "top top",
  //       onEnter: () => {
  //         gsap.to(window, {
  //           duration: 0.6,
  //           scrollTo: section,
  //           ease: "power2.out",
  //         });
  //       },
  //       once: false, // keep triggering as you scroll down
  //     });
  //   });
  // }, [showContent]);

  return (
    <>
      {!showContent && (
        <div
          className={`relative   ${
            !showContent ? "opacity-100" : " opacity-0 pointer-events-none"
          }`}
          style={{ display: !showContent ? "block" : "none" }}
        >
          <Loader />
        </div>
      )}

      <div
        className={`transition-opacity duration-1000 p-0 relative ease-in ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* <MobilesliderTest /> */}
        <Home />

        <div className="  relative">
          <section className="sticky-section sticky top-0 min-h-screen  z-10  text-white flex items-center justify-center ">
            <Textsvg2 />
          </section>
          <section className="h-[50vh] top-0  z-[1] bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky  top-0 min-h-screen  z-[12] bg-black text-white flex items-center justify-center">
            {/* <Slideraffected /> */}
            <Verticalslider />
          </section>
          <section className="h-[50vh] top-0  z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky  top-0 min-h-screen  z-[15]  text-white flex items-center justify-center ">
            <Textsvg1 />
          </section>
          <section className="h-[50vh] top-0  z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky  top-0 min-h-screen  z-20  text-white flex items-center justify-center">
            <TextImage3 />
          </section>
          <section className="h-[50vh] top-0  z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky  top-0 min-h-screen  z-30  text-white flex items-center justify-center">
            <TextImage2 />
          </section>
          <section className="h-[50vh] top-0  z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky  top-0 min-h-screen  z-40  text-white flex items-center justify-center">
            <VideoSection />
          </section>
          <section className="h-[50vh] top-0  z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky  top-0 min-h-screen  z-[41]  text-white flex items-center justify-center">
            <Mobileslider />
          </section>
          <section className="h-[50vh] top-0  z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky  top-0 min-h-screen  z-50 max-sm:h-auto  text-white flex items-center justify-center">
            <Speciality />
          </section>
          <section className="h-[50vh] top-0  z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky w-full  top-0 min-h-screen  z-50  text-white flex items-center justify-center">
            <Footer />
          </section>
        </div>

        {/* <About />
        <Affected />
        <Textpage1 />
        <Textpage2 />
        <Journey />

       

        <Textsvg2 />
        <Slider2 />
        <Textsvg3 />
        <Slider3 />
        
        
        <Notifiaction /> */}
      </div>
    </>
  );
};

export default Homepage;
