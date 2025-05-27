"use client";

import Image from "next/image";
import React from "react";
import success from "@/public/svgs/success.png";

const Success = ({ onClose }) => {
  return (
    <div className="bg-[#F4FAFF] rounded-[16px] overflow-hidden shadow-lg flex w-full relative px-[7rem] py-[4rem] text-black">
      {/* Close Icon */}
      <button
        className="absolute z-40 top-4 right-6 text-black text-[2rem] font-normal cursor-pointer hover:bg-black hover:text-white rounded-full p-2 transition duration-300"
        onClick={onClose}
      >
        &#10006;
      </button>

      <div className="flex flex-col items-center gap-[3rem] mx-auto">
        <Image
          src={success}
          height={106}
          width={106}
          alt="congrats"
          className="h-auto w-[11rem]"
        />
        <h2 className="text-[4rem] leading-[1] font-[400] text-center">
          Thanks For Signing Up!
        </h2>

        <p className="text-[1.6rem] leading-[1.5] font-[400] text-center">
          You have been added to the InnerSmith waitlist.
          <br />
          We’re excited to have you on this journey.
        </p>

        <hr className="w-full border-t border-gray-300" />

        <p className="text-[1.8rem] leading-[1.2] font-[600] text-center">
          Stay Tuned For More Updates
        </p>
      </div>
    </div>
  );
};

export default Success;
