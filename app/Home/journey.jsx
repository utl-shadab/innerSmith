"use client";
import React from "react";

const rightData = [
  "Dealing with Financial Stress",
  "Coping with Grief",
  "Healing from Burnout",
  "Finding Your Way After a Breakup",
  "Recovery After an Accident",
];
const leftData = [
  "Rebuilding Self-Worth",
  "Managing Chronic Stress",
  "Tackling Identity Challenges",
  "Coping With Conflict at Workplace",
  "Maintaining Work-Life Balance",
];
const Journey = () => {
  return (
    <section className="h-screen bg-white flex flex-col justify-center items-center">
      <div className=" max-sm:px-[15px]">
        <h2 className="text-[6rem] font-[400] text-center text-[#000000]">
          Wherever you are in life,
          <span className="block max-sm:inline">
            {" "}
            we craft a step-by-step healing journey
          </span>{" "}
          <span className="text-[#00A6FF] ">just for you.</span>
        </h2>
      </div>
      <div className="w-full mt-[10vh]">
        <div className="w-full overflow-hidden py-5 relative">
          <div className="flex w-max animateright-scroll">
            {[...rightData, ...rightData, ...rightData].map((text, index) => (
              <div
                className={`flex items-center gap-10  py-6 px-8 mx-3 ${
                  index % 2 === 0
                    ? "text-[#000] bg-[#E2E2E2]"
                    : "text-[#00A6FF] bg-[rgba(92,198,255,0.24)]  "
                }`}
                key={index}
              >
                <h2
                  className={`font-[400] ${
                    index % 2 === 0 ? "text-[#000] " : "text-[#00A6FF] "
                  } text-[3.2rem] flex items-center `}
                >
                  {text}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden mt-[3rem] py-5 relative">
          <div className="flex w-max animate-scroll">
            {[...leftData, ...leftData, ...leftData].map((text, index) => (
              <div
                className={`flex items-center gap-10 rightanimate py-6 px-8 mx-3 ${
                  index % 2 === 0
                    ? "text-[#000] bg-[#E2E2E2]"
                    : "text-[#00A6FF] bg-[rgba(92,198,255,0.24)]  "
                }`}
                key={index}
              >
                <h2
                  className={`font-[400] ${
                    index % 2 === 0 ? "text-[#000] " : "text-[#00A6FF] "
                  } text-[3.2rem] flex items-center `}
                >
                  {text}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
