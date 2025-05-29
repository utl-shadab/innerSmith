import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * Centralized animation controller for consistent animations across components
 */
export const AnimationController = {
  /**
   * Initialize text animations with consistent settings
   * @param {Object} options - Configuration options
   */
  initTextAnimation: (options) => {
    const {
      containerRef,
      selectors = [],
      startOffset = "-=100%",
      isMobile = window.innerWidth < 768,
      onComplete = null,
    } = options;

    if (!containerRef.current) return null;

    gsap.set(containerRef.current, { clearProps: "all" });

    const splitElements = selectors.map((selector) => {
      return new SplitType(selector, {
        types: "words, chars",
      });
    });

    document.querySelectorAll(`${selectors.join(", ")} .word`).forEach((el) => {
      el.style.whiteSpace = "nowrap";
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top${startOffset} center`,
        end: "bottom-=100% top",
        toggleActions: isMobile
          ? "play none none none"
          : "play reverse play reverse",
        markers: false,
        onComplete,
      },
      defaults: {
        ease: isMobile ? "power1.out" : "power2.out",
        duration: isMobile ? 0.5 : 0.8,
      },
    });

    return { tl, splitElements };
  },

  /**
   * Initialize video animations with consistent settings
   * @param {Object} options - Configuration options
   */
  initVideoAnimation: (options) => {
    const {
      containerRef,
      videoRef,
      startOffset = "-=100%",
      isMobile = window.innerWidth < 768,
    } = options;

    if (!containerRef.current || !videoRef.current) return null;

    gsap.set(containerRef.current, { clearProps: "all" });

    videoRef.current.load();
    videoRef.current.preload = "auto";

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: `top${startOffset} 80%`,
      end: "bottom 20%",
      markers: false,
      onEnter: () => {
        if (videoRef.current && videoRef.current.paused) {
          const playPromise = videoRef.current.play();

          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log("Video play prevented:", error);

              const playOnClick = () => {
                videoRef.current.play();
                document.removeEventListener("click", playOnClick);
              };
              document.addEventListener("click", playOnClick);
            });
          }
        }
      },
      onEnterBack: () => {
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play();
        }
      },
      once: false,
    });

    return trigger;
  },

  /**
   * Initialize image animations with consistent settings
   * @param {Object} options - Configuration options
   */
  initImageAnimation: (options) => {
    const {
      containerRef,
      imageRef,
      startOffset = "-=100%",
      isMobile = window.innerWidth < 768,
    } = options;

    if (!containerRef.current || !imageRef.current) return null;

    gsap.set(containerRef.current, { clearProps: "all" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top${startOffset} center`,
        end: "bottom-=100% top",
        toggleActions: isMobile
          ? "play none none none"
          : "play reverse play reverse",
        markers: false,
      },
      defaults: {
        ease: isMobile ? "power1.out" : "power2.out",
        duration: isMobile ? 0.5 : 0.8,
      },
    });

    tl.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: isMobile ? 0.95 : 0.9,
        y: isMobile ? 10 : 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
      }
    );

    return tl;
  },
};

export default AnimationController;
