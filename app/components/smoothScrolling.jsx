"use client"
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import SplitType from 'split-type'
import { ReactLenis } from 'lenis/react'

function SmoothScrolliing({children}) {
  const lenisOptions = {
    lerp: 0.05,
    duration: 2,
    syncTouch: false,
    smooth: true,
    smoothTouch: true,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  }
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Select all sections that should snap
    const sections = gsap.utils.toArray('.sticky-section');
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom", // when top of section hits bottom of viewport
        end: "bottom top", // when bottom of section leaves top of viewport
        onEnter: (self) => {
          gsap.to(window, {
            duration: 1,
            scrollTo: {y: section, offsetY: 0},
            ease: "power2.inOut",
            onComplete: () => {
              // Pin the section after scrolling to it
              self.pin = true;
              self.refresh();
            }
          });
        },
        onLeaveBack: (self) => {
          if (self.progress === 0) {
            // Unpin when scrolling back up
            self.pin = false;
            self.refresh();
          }
        }
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <ReactLenis 
      root 
      options={lenisOptions}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScrolliing
