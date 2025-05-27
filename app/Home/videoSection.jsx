import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const sectionVideoRef = useRef(null);
  const triggerVideoRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const setupAnimationsVideo = () => {
      const sectionVideo = sectionVideoRef.current;

      if (!sectionVideo) return;

      gsap.set(sectionVideo, { clearProps: "all" });

      gsap.registerPlugin(ScrollTrigger);
      triggerVideoRef.current?.kill();

      const video = videoRef.current;
      triggerVideoRef.current = ScrollTrigger.create({
        trigger: sectionVideoRef.current,
        start: "top-=100% 80%", // adjust as needed
        end: "bottom-=80% 0%",
        markers: false,
        onEnter: () => {
          if (video && video.paused) {
            video.play();
          }
        },
        onEnterBack: () => {
          if (video && video.paused) {
            video.play();
          }
        },
        once: false,
      });
    };

    const setupAnimationsVideoMobile = () => {
      const sectionVideo = sectionVideoRef.current;

      if (!sectionVideo) return;

      gsap.set(sectionVideo, { clearProps: "all" });

      gsap.registerPlugin(ScrollTrigger);
      // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      triggerVideoRef.current?.kill();
      const video = videoRef2.current;
      triggerVideoRef.current = ScrollTrigger.create({
        trigger: sectionVideoRef.current,
        start: "top-=100% 80%", // adjust as needed
        end: "top-=100% top",
        markers: false,
        onEnter: () => {
          if (video && video.paused) {
            video.play();
          }
        },
        onEnterBack: () => {
          if (video && video.paused) {
            video.play();
          }
        },
        once: false,
      });
    };

    mm.add("(min-width: 1035px)", () => {
      requestAnimationFrame(() => {
        setTimeout(setupAnimationsVideo, 100);
      });
    });

    mm.add("(max-width: 1034px)", () => {
      requestAnimationFrame(() => {
        setTimeout(setupAnimationsVideoMobile, 100);
      });
    });

    return () => {
      triggerVideoRef.current?.kill();
      mm.revert();
    };
  }, []);

  // useEffect(() => {
  //   const mm = gsap.matchMedia();

  //   mm.add("(min-width: 768px)", () => {
  //     const video = videoRef.current;
  //     ScrollTrigger.create({
  //       trigger: sectionRef.current,
  //       start: "top-=100% 80%", // adjust as needed
  //       end: "bottom-=80% 0%",
  //       markers: false,
  //       onEnter: () => {
  //         if (video && video.paused) {
  //           video.play();
  //         }
  //       },
  //       onEnterBack: () => {
  //         if (video && video.paused) {
  //           video.play();
  //         }
  //       },
  //       once: false, // change to false if you want it to replay on re-entry
  //     });
  //   });

  //   mm.add("(max-width: 767px)", () => {
  //     const video = videoRef2.current;
  //     ScrollTrigger.create({
  //       trigger: sectionRef.current,
  //       start: "top-=100% 80%", // adjust as needed
  //       end: "bottom-=100% top",
  //       markers: true,
  //       onEnter: () => {
  //         if (video && video.paused) {
  //           video.play();
  //         }
  //       },
  //       onEnterBack: () => {
  //         if (video && video.paused) {
  //           video.play();
  //         }
  //       },
  //       once: false, // change to false if you want it to replay on re-entry
  //     });
  //   });
  // }, []);

  return (
    <div
      ref={sectionVideoRef}
      className="videoSection  h-screen  w-full overflow-clip max-sm:h-auto max-md:pt-[4rem] bg-white"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="top-0 left-0 w-full h-full block object-cover max-sm:object-centre max-md:hidden"
      >
        <source
          src="https://thescaleagency.s3.amazonaws.com/innersmith_desktop.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <video
        ref={videoRef2}
        muted
        playsInline
        preload="auto"
        className="top-0 left-0 w-full h-full object-cover hidden max-sm:object-centre max-md:block"
      >
        <source
          src="https://thescaleagency.s3.amazonaws.com/innersmith_mobile.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoSection;
