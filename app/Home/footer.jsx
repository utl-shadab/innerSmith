"use client";

import React, { useState } from "react";
import FooterForm from "./footerForm";
import Image from "next/image";
import logo from "@/public/mainLogo.svg";
import { FiArrowUpRight } from "react-icons/fi";
import Success from "./success";

const Footer = () => {
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState("idle"); // "idle" | "success"

  const handleClose = () => {
    setShowForm(false);
    setFormStatus("idle");
  };

  const handleSuccess = () => {
    setFormStatus("success");
  };

  return (
    <section className="h-screen w-full footerSection bg-black text-white overflow-hidden relative">
      <div className="flex flex-col justify-center items-center h-full relative z-[2]">
        <h2
          className={`text-[8rem] font-[400] leading-[1.27] text-center w-1/2 max-md:w-full transition-height duration-500 ease-in-out max-sm:px-[5px] ${
            showForm
              ? "absolute w-full top-3 px-8 max-sm:mt-[3rem] text-center max-sm:hidden"
              : ""
          }`}
        >
          Ready to take charge of your emotions?
          <span className="block font-[300] !text-[2.4rem] mt-6">
            The tools are here. You just have to begin.
          </span>
        </h2>

        <div className={`mt-[5rem] mb-[3rem] ${showForm ? "hidden" : "block"}`}>
          <Image
            src={logo}
            alt="InnerSmith Logo"
            width={1000}
            height={300}
            className="w-[50rem] h-auto"
          />
        </div>

        <div
          className={`overflow-hidden transition-height duration-500 ease-in-out ${
            showForm ? "max-h-[65rem] mt-[10rem]" : "max-h-[12rem] mt-[5rem]"
          }`}
        >
          <div
            onClick={showForm ? () => null : () => setShowForm(true)}
            className={`bg-white text-black rounded-[16px] footerButton ${
              showForm
                ? ""
                : "py-[1.5rem] px-[3rem] flex justify-between items-center"
            }`}
          >
            {!showForm ? (
              <h3 className="text-[2.8rem] leading-[1.2] font-[400] cursor-pointer">
                Join the waitlist{" "}
                <span className="ml-1 font-[600]">
                  <FiArrowUpRight className="inline" />
                </span>
              </h3>
            ) : formStatus === "success" ? (
              <Success onClose={handleClose} />
            ) : (
              <FooterForm onClose={handleClose} onSuccess={handleSuccess} />
            )}
          </div>

          <p className="text-[2rem] text-white leading-[1.2] mt-[2rem] text-center">
            (12k+ people have already joined)
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
