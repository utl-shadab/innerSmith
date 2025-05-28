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
import TextImage3 from "./textImage3";
import Speciality from "./speciality";
import Verticalslider from "./verticalslider";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Homepage = () => {
  const [showContent, setShowContent] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    // Ensure body is locked during loader display
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Give loader enough time to complete its animation
    const timer = setTimeout(() => {
      setShowContent(true);
      document.body.style.overflowY = "auto";
    }, 7000); // Match this with the duration of your loader animation

    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    if (!showContent) return;

    // Reset scroll position when content shows
    window.scrollTo(0, 0);
    
    // Initialize ScrollTrigger for sections after loader completes
    const sections = gsap.utils.toArray(".sticky-section");
    const triggers = [];

    sections.forEach((section) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        end: "top 10%",
        markers: false,
        onEnter: (self) => {
          if (self.direction === 1) {
            gsap.to(window, {
              duration: 0.8,
              scrollTo: section,
              ease: "power2.out"
            });
          }
        }
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [showContent]);

  return (
    <>
      {!showContent && (
        <div
          ref={loaderRef}
          className="fixed top-0 left-0 w-full h-full z-50"
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
        <Home />

        <div className="relative">
          <section className="sticky-section sticky top-0 min-h-screen z-10 text-white flex items-center justify-center">
            <Textsvg2 />
          </section>
          <section className="h-[50vh] top-0 z-[1] bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky top-0 min-h-screen z-[12] bg-black text-white flex items-center justify-center">
            <Verticalslider />
          </section>
          <section className="h-[50vh] top-0 z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky top-0 min-h-screen z-[15] text-white flex items-center justify-center">
            <Textsvg1 />
          </section>
          <section className="h-[50vh] top-0 z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky top-0 min-h-screen z-20 text-white flex items-center justify-center">
            <TextImage3 />
          </section>
          <section className="h-[50vh] top-0 z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky top-0 min-h-screen z-30 text-white flex items-center justify-center">
            <TextImage2 />
          </section>
          <section className="h-[50vh] top-0 z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky top-0 min-h-screen z-40 text-white flex items-center justify-center">
            <VideoSection />
          </section>
          <section className="h-[50vh] top-0 z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky top-0 min-h-screen z-[41] text-white flex items-center justify-center">
            <Mobileslider />
          </section>
          <section className="h-[50vh] top-0 z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky top-0 min-h-screen z-50 max-sm:h-auto text-white flex items-center justify-center">
            <Speciality />
          </section>
          <section className="h-[50vh] top-0 z-10 bg-transparent flex items-center justify-center"></section>
          <section className="sticky-section sticky w-full top-0 min-h-screen z-50 text-white flex items-center justify-center">
            <Footer />
          </section>
        </div>
      </div>
    </>
  );
};

export default Homepage;
