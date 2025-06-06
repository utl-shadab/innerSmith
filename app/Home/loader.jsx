"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import shutterUp from "@/public/images/shutterUp.svg";
import blurbgLoader from "@/public/blurbgLoader.svg";
import Loading from "../loading";

const images = [
  "/images/pausebg.jpeg",
  "/images/breathebg.jpg",
  "/images/resetbg.jpg",
];
const texts = ["PAUSE", "BREATHE", "RESET", ""];

export default function Loader() {
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    // Mark the client-side rendering as completed
    setIsClient(true);
    gsap.set(topPanelRef.current, { y: "-150%" });
    gsap.set(bottomPanelRef.current, { y: "150%" });
    for (let i = 0; i < images.length; i++) {
      // Shutter in
      tl.to([topPanelRef.current, bottomPanelRef.current], {
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });

      // Set new image/text
      tl.add(() => {
        setIndex(i);
      });

      // Shutter out
      tl.to(topPanelRef.current, {
        y: "-150%",
        duration: 0.8,
        ease: "power4.inOut",
      });
      tl.to(
        bottomPanelRef.current,
        {
          y: "150%",
          duration: 0.8,
          ease: "power4.inOut",
        },
        "<"
      ); // run together

      // Optional pause before next
      tl.to({}, { duration: 0.5 });
    }

    // 👉 Final shutter open at end
    tl.to(topPanelRef.current, {
      y: "0",
      duration: 0.8,
      ease: "power4.inOut",
    });
    tl.to(
      bottomPanelRef.current,
      {
        y: "0",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "<"
    );

    return () => {
      tl.clear(); // Clears the timeline when the component unmounts
    };
  }, []);

  return (
    <>
      {!isClient && <Loading />}

      <div style={{ display: isClient ? "block" : "none" }}>
        <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
          {/* Top Shutter Panel */}
          <div
            ref={topPanelRef}
            className="absolute top-[0] left-0 w-full h-2/3 bg-transprent z-40 max-xl:h-full"
            // style={{ transform: "translateY(100%)" }}
          >
            <Image
              src={shutterUp}
              height="1700"
              priority={true}
              width="974"
              alt=""
              className="w-full h-auto  object-center  max-xl:h-full max-xl:object-cover"
            />
          </div>

          {/* Bottom Shutter Panel */}
          <div
            ref={bottomPanelRef}
            className="absolute bottom-0 left-0 w-full h-2/5 bg-tranparent z-40 max-xl:h-2/3 max-sm:h-full"
            // style={{ transform: "translateY(-100%)" }}
          >
            <Image
              src={shutterUp}
              height="1700"
              width="974"
              priority={true}
              alt=""
              className="w-full h-auto rotate-x-180 translate-y-[-38vh]  object-center  max-xl:h-full max-xl:object-cover max-xl:translate-y-0"
            />
          </div>
          <div className="absolute inset-0 bg-cover h-screen w-full z-[1] bg-no-repeat transition-all duration-500">
            <Image
              src={images[index]}
              alt=""
              width="1974"
              priority={true}
              height="1028"
              className="w-full h-full object-cover"
              style={{ filter: "blur(0px)" }}
            />
          </div>

          <div className="w-full flex justify-center items-center">
            <div
              className={`absolute z-[2] top-[30%] left-1/2 transform -translate-x-1/2 max-sm:top-[40%]  ${
                isClient ? "text-white" : "text-black"
              }  z-[8] `}
            >
              <Image
                src={blurbgLoader}
                alt=""
                width="345"
                priority={true}
                height="272"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={` ${
                isClient ? "text-white" : "text-black"
              } text-[15rem] relative  font-bold z-10 `}
            >
              {texts[index]}
            </div>
          </div>
          {/* <div
            className={`absolute top-[10%] left-1/2 transform -translate-x-1/2  max-lg:top-1/2 ${
              isClient ? "text-white" : "text-black"
            }  z-[8] `}
          >
            <Image
              src={blurbgLoader}
              alt=""
              width="345"
              priority={true}
              height="272"
              className="w-full h-full object-cover"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}


