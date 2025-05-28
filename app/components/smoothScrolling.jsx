"use client"
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Observer } from 'gsap/Observer'
import SplitType from 'split-type'
import { ReactLenis } from 'lenis/react'

function SmoothScrolliing({children}) {
  const lenisOptions = {
    lerp: 0.05,
    duration: 1.5, // Reduced for mobile
    syncTouch: true, // Better touch handling
    smooth: true,
    smoothTouch: false, // Disable smooth scrolling on touch devices for better performance
    touchMultiplier: 1.5, // More responsive touch
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Optimized easing
  }
  
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(null);
  const observerRef = useRef(null);
  const isMobileRef = useRef(false);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);
    
    // Check if mobile
    isMobileRef.current = window.innerWidth < 768;
    
    // Select all sections that should snap
    const sections = gsap.utils.toArray('.sticky-section');
    const triggers = [];
    
    // Function to scroll to a section with optimized mobile handling
    const scrollToSection = (section) => {
      if (isScrollingRef.current || section === currentSectionRef.current) return;s
      
      isScrollingRef.current = true;
      currentSectionRef.current = section;
      
      // Temporarily disable observer during programmatic scrolling
      if (observerRef.current) observerRef.current.disable();
      
      // Use lighter animation for mobile
      gsap.to(window, {
        duration: isMobileRef.current ? 0.8 : 1,
        scrollTo: {y: section, offsetY: 0},
        ease: "power2.out", // Simpler easing for mobile
        onComplete: () => {
          isScrollingRef.current = false;
          // Re-enable observer after scrolling completes
          setTimeout(() => {
            if (observerRef.current) observerRef.current.enable();
          }, 200); // Add delay before re-enabling
        }
      });
    };
    
    // Create ScrollTrigger for each section - optimized for mobile
    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 60%", // Adjusted for better mobile experience
        end: "bottom 40%", 
        markers: false,
        onEnter: () => {
          // Only use snap scrolling on desktop or if explicitly enabled on mobile
          if (!isMobileRef.current || window.innerHeight > window.innerWidth) {
            scrollToSection(section);
          }
        },
        onEnterBack: () => {
          // Only use snap scrolling on desktop or if explicitly enabled on mobile
          if (!isMobileRef.current || window.innerHeight > window.innerWidth) {
            scrollToSection(section);
          }
        },
      });
      
      triggers.push(trigger);
    });
    
    // Use Observer with mobile optimizations
    let scrollTimeout;
    observerRef.current = Observer.create({
      type: "wheel,touch,scroll",
      wheelSpeed: isMobileRef.current ? -0.5 : -1, // Reduced sensitivity on mobile
      onDown: () => {
        // Use longer debounce on mobile
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (!isScrollingRef.current && currentSectionRef.current) {
            const currentIndex = sections.indexOf(currentSectionRef.current);
            if (currentIndex < sections.length - 1) {
              // Only use snap scrolling on desktop or if explicitly enabled on mobile
              if (!isMobileRef.current || window.innerHeight > window.innerWidth) {
                scrollToSection(sections[currentIndex + 1]);
              }
            }
          }
        }, isMobileRef.current ? 100 : 50); // Longer debounce on mobile
      },
      onUp: () => {
        // Use longer debounce on mobile
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (!isScrollingRef.current && currentSectionRef.current) {
            const currentIndex = sections.indexOf(currentSectionRef.current);
            if (currentIndex > 0) {
              // Only use snap scrolling on desktop or if explicitly enabled on mobile
              if (!isMobileRef.current || window.innerHeight > window.innerWidth) {
                scrollToSection(sections[currentIndex - 1]);
              }
            }
          }
        }, isMobileRef.current ? 100 : 50); // Longer debounce on mobile
      },
      tolerance: isMobileRef.current ? 15 : 10, // Higher tolerance on mobile
      preventDefault: !isMobileRef.current, // Don't prevent default on mobile for better native scrolling
      lockAxis: true
    });
    
    // Handle resize events to update mobile detection
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768;
      ScrollTrigger.refresh(true);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set initial section if we're already scrolled down the page
    const initialSection = sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    });
    
    if (initialSection) {
      currentSectionRef.current = initialSection;
      // Don't auto-scroll on mobile initial load
      if (!isMobileRef.current) {
        scrollToSection(initialSection);
      }
    }
    
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('resize', handleResize);
      triggers.forEach(trigger => trigger.kill());
      if (observerRef.current) observerRef.current.kill();
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
