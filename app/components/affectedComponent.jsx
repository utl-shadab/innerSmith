import React from "react";

const AffectedComponent = ({ titleCount, textrel }) => {
  return (
    <div>
      <div className="affectedContainer h-screen  flex justify-center items-center gap-16 max-lg:flex-col">
        <div className="text-white text-[8rem] text-left text-nowrap">
          You're Not Alone &#8213;
        </div>
        <div className="flex flex-col ">
          <h1 className="text-[#FF7171] font-bold leading-[1] text-[9rem] border-b-2 border-[#FF7171] pb-4 text-nowrap">
            {titleCount}
            <span className="uppercase !text-[4rem] font-[400] ml-[10px]">
              PEOPLE
            </span>
          </h1>
          <h3 className="font-[400] text-white text-[4rem] pt-4 text-wrap leading-[1.1]">
            {textrel}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AffectedComponent;
