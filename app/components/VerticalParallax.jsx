"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VerticalParallax = ({ section1, section2 }) => {
  const containerRef = useRef(null);
  const section2Ref = useRef(null);
  const section1Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section2 upward on scroll into view
      gsap.fromTo(
        section2.current,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `bottom bottom+=${window.innerHeight}`,
            end: "bottom bottom",
            pin: section1Ref.current,
            pinSpacing: true,
            scrub: true,
            markers: true,
          },
        }
      );

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden relative">
      {/* Hero section (180vh) */}
      <div className=" relative z-[1]" ref={section1Ref}>
        {section1}
      </div>

      {/* Parallax Reveal section (100vh) */}
      <div
        ref={section2Ref}
        className="min-h-[100vh] relative z-10 flex items-center justify-center"
      >
        {section2}
      </div>
    </div>
  );
};

export default VerticalParallax;
