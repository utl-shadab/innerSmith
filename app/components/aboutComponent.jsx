import React from "react";

import Image from "next/image";
import bgsvg from "@/public/svgs/aboutsec.svg";

const AboutComponent = ({ titleContent }) => {
  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat  bg-black relative flex items-center justify-center overflow-hidden">
      <div className=" mx-auto">
        <div
          className="absolute top-0 h-max left-0 right-0 flex justify-center text-center bg-black opacity-50 z-10"
          style={{ transform: "translateY(-45%)" }}
        >
          <Image
            src={bgsvg}
            height="416"
            width="624"
            alt=""
            className="w-[62rem] h-auto border-[1.5px] border-white border-opacity-20 rounded-4xl"
          />
        </div>
        <div className="w-[62rem] px-[4rem] mx-auto">
          <h1 className="text-white text-[5.5rem] text-left leading-[1.1] font-[500]   z-20 relative">
            {titleContent}
          </h1>
        </div>
        <div
          className="absolute bottom-0 h-max left-0 right-0 flex justify-center text-center bg-black opacity-50 z-10 "
          style={{ transform: "translateY(45%)" }}
        >
          <Image
            src={bgsvg}
            height="416"
            width="624"
            alt=""
            className="w-[62rem] h-auto border-[1.5px] border-white border-opacity-20 rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
