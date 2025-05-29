"use client";

import React, { useEffect, useState } from "react";
import Homepage from "./Home/homepage";
import Loading from "./loading";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);

    setIsMobile(window.innerWidth < 768);

    if (window.innerWidth < 768) {
      document.documentElement.classList.add("mobile-device");

      const preloadLinks = [
        { rel: "preload", href: "/svgs/mobileScreen.svg", as: "image" },
      ];

      preloadLinks.forEach((link) => {
        const linkEl = document.createElement("link");
        Object.keys(link).forEach((attr) => {
          linkEl.setAttribute(attr, link[attr]);
        });
        document.head.appendChild(linkEl);
      });
    }

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        if (newIsMobile) {
          document.documentElement.classList.add("mobile-device");
        } else {
          document.documentElement.classList.remove("mobile-device");
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <>
      {!isClient && <Loading />}

      <div style={{ display: isClient ? "block" : "none" }}>
        <Homepage />
      </div>
    </>
  );
}
