"use client";
import { useState, useEffect, useRef } from "react";
import Home from "../Home/home";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../Home/loader";
import VerticalParallax from "../components/VerticalParallax";
import About from "../Home/about";
import Affected from "../Home/affected";
import Textpage1 from "../Home/textpage1";
import Textpage2 from "../Home/textpage2";
import Journey from "../Home/journey";
import TextImage1 from "../Home/textImage1";
import TextImage2 from "../Home/textImage2";
import Textsvg1 from "../Home/textsvg1";
import Textsvg2 from "../Home/textsvg2";
import Textsvg3 from "../Home/textsvg3";

import Slider2 from "../Home/slider2";
import Slider1 from "../Home/slider1";
import Slider3 from "../Home/slider3";
import Mobileslider from "../Home/mobileslider";
import Notifiaction from "../Home/Notifiaction";
import Footer from "../Home/footer";
import VideoSection from "../Home/videoSection";

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    setTimeout(() => {
      setShowContent(true);
      document.body.style.overflowY = "auto";
    }, 7000);

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      {!showContent && <Loader />}

      <div
        className={`transition-opacity duration-1000 relative ease-in ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Home />
        <About />
        <Affected />
        <Textpage1 />
        {/* <Textpage2 /> */}
        <Journey />
        <TextImage1 />
        <TextImage2 />
        <Textsvg1 />

        <Textsvg2 />

        <Textsvg3 />

        <Mobileslider />
        <VideoSection />
        <Notifiaction />
        <Footer />
      </div>
    </>
  );
};

export default Homepage;
