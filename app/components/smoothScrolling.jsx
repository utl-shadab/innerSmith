"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
import { ReactLenis } from "lenis/react";

function SmoothScrolliing({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    setIsLowEndDevice(
      /(android|webos|iphone|ipad|ipod|blackberry|windows phone)/i.test(
        navigator.userAgent
      ) && navigator.hardwareConcurrency <= 4
    );

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopOptions = {
    lerp: 0.05,
    duration: 1.5,
    syncTouch: true,
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    wheelMultiplier: 1.0,
    normalizeWheel: true,
  };

  const mobileOptions = {
    lerp: 0.07,
    duration: 1.2,
    syncTouch: true,
    smooth: true,
    smoothTouch: true,
    touchMultiplier: 1.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    wheelMultiplier: 0.9,
    normalizeWheel: true,
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

    if (isMobile) {
      document.documentElement.style.setProperty("--mobile-animations", "1");

      ScrollTrigger.config({
        ignoreMobileResize: true,
      });

      const disableComplexAnimations = () => {
        document.querySelectorAll(".char, .word").forEach((el) => {
          gsap.set(el, { clearProps: "all" });
        });
      };

      disableComplexAnimations();
      const originalRefresh = ScrollTrigger.refresh;
      ScrollTrigger.refresh = (...args) => {
        const result = originalRefresh.apply(ScrollTrigger, args);
        disableComplexAnimations();
        return result;
      };

      document.body.style.touchAction = "pan-y";

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        document.body.style.webkitOverflowScrolling = "touch";
      }
    }

    let scrollTimeout;
    const handleResize = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        ScrollTrigger.refresh();

        if (lenisRef.current) {
          lenisRef.current.resize();
        }
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      if (isMobile) {
        ScrollTrigger.refresh =
          ScrollTrigger.refresh.__original || ScrollTrigger.refresh;
        document.body.style.touchAction = "";
        document.body.style.webkitOverflowScrolling = "";
      }

      gsap.ticker.remove(lenisRef.current?.raf);
    };
  }, [isMobile]);

  const onLenisInit = (lenis) => {
    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {});
  };

  return (
    <ReactLenis
      root
      options={isMobile ? mobileOptions : desktopOptions}
      onInit={onLenisInit}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolliing;
