
import React from "react";
import Lottie from "lottie-react";
import laptopAnimation from "../../public/manlappy.json"; 

const laptopLottie = () => {
  return (
    <div className="w-full max-w-[500px] mx-auto">
      <Lottie animationData={laptopAnimation} loop={true} autoplay={true} />
    </div>
  );
};

export default laptopLottie;
