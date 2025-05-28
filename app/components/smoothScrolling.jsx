"use client"
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import SplitType from 'split-type'

function SmoothScrolliing({children}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(Observer);
    
    // Prevent scroll restoration on page refresh
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Wait for DOM to be fully loaded
    setTimeout(() => {
      initSmoothScroll();
    }, 100);
    
    return () => {
      // Clean up animations
      Observer.getAll().forEach(observer => observer.kill());
      gsap.killTweensOf("*");
    };
  }, []);
  
  const initSmoothScroll = () => {
    const sections = gsap.utils.toArray("section.full-section");
    const images = gsap.utils.toArray(".section-bg");
    const headings = gsap.utils.toArray(".section-heading");
    const outerWrappers = gsap.utils.toArray(".outer-wrapper");
    const innerWrappers = gsap.utils.toArray(".inner-wrapper");
    
    // Split text for animations
    const splitHeadings = headings.map(heading => 
      new SplitType(heading, { 
        types: "chars,words,lines", 
        linesClass: "clip-text" 
      })
    );
    
    let currentIndex = -1;
    let animating = false;
    
    // Wrap function to handle circular navigation
    const wrap = gsap.utils.wrap(0, sections.length);
    
    // Set initial states
    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });
    
    function gotoSection(index, direction) {
      index = wrap(index); // make sure it's valid
      if (animating || index === currentIndex) return;
      
      animating = true;
      let fromTop = direction === -1,
          dFactor = fromTop ? -1 : 1,
          tl = gsap.timeline({
            defaults: { duration: 1.25, ease: "power1.inOut" },
            onComplete: () => animating = false
          });
          
      if (currentIndex >= 0) {
        // Not the first time this function runs
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -15 * dFactor })
          .set(sections[currentIndex], { autoAlpha: 0 });
      }
      
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      
      tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
          yPercent: i => i ? -100 * dFactor : 100 * dFactor
        }, { 
          yPercent: 0 
        }, 0)
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(splitHeadings[index].chars, { 
            autoAlpha: 0, 
            yPercent: 150 * dFactor
        }, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.02,
              from: "random"
            }
          }, 0.2);
    
      currentIndex = index;
    }
    
    // Create observer for wheel and touch events
    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      onUp: () => !animating && gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
      target: containerRef.current
    });
    
    // Initialize with the first section
    gotoSection(0, 1);
  };

  return (
    <div ref={containerRef} className="smooth-scroll-container">
      {children}
    </div>
  )
}

export default SmoothScrolliing
