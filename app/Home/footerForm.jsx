"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const FooterForm = ({ onClose, onSuccess }) => {
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.FNAME.value.trim();
    const email = form.EMAIL.value.trim();
    const wantsZenBox = form.ZENBOX.checked;

    if (!name || !email || !wantsZenBox) {
      setError("All fields are required, including the checkbox.");
      setStatus("error");
      return;
    }

    try {
      // Simulate async Mailchimp call
      await new Promise((res) => setTimeout(res, 1000));
      setStatus("success");
      onSuccess(); // Notify parent to switch to <Success />
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setError("");
    onClose();
  };

  return (
    <div className="bg-[#F4FAFF] rounded-[16px] overflow-hidden shadow-lg flex w-full relative">
      {/* Close Button */}
      <button
        className="absolute z-40 top-4 right-6 text-black text-[2rem] font-normal cursor-pointer hover:bg-black hover:text-white rounded-full p-2 transition duration-300"
        onClick={handleClose}
      >
        &#10006;
      </button>

      {/* Left Image */}
      <div className="relative w-1/2 max-sm:hidden">
        <Image
          src="/images/Footerbg.png"
          alt="Zen landscape"
          fill
          className="object-cover"
        />
      </div>

      {/* Form Content */}
      <div className="w-full p-10 space-y-10 z-10">
        <h2 className="text-[4rem] font-semibold text-[#1A1A1A]">
          Join the Waitlist
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            name="FNAME"
            placeholder="Your name here"
            className="w-full text-[2.2rem] px-4 py-3 rounded-md bg-white text-black placeholder-gray-400"
            required
          />

          <input
            type="email"
            name="EMAIL"
            placeholder="Your email address here"
            className="w-full text-[2.2rem] px-4 py-3 rounded-md bg-white text-black placeholder-gray-400"
            required
          />

          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="zenbox"
                className="text-black font-medium text-[1.5rem] uppercase"
              >
                I WANT THE ZEN BOX
              </label>
              <input
                type="checkbox"
                id="zenbox"
                name="ZENBOX"
                className="w-[1.8rem] h-[1.8rem] accent-black ml-2"
              />
            </div>

            <button
              type="submit"
              className="px-[2.9rem] py-[1.4rem] mt-[1rem] text-[1.8rem] bg-white text-black rounded-md border border-black font-semibold flex items-center gap-2 hover:bg-black hover:text-white transition"
            >
              JOIN NOW
              <FiArrowUpRight className="text-[2rem]" />
            </button>
          </div>
        </form>

        {status === "error" && (
          <p className="text-red-600 text-[1.6rem] font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default FooterForm;
