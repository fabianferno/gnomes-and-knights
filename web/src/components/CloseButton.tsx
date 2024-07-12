// components/Button.js
"use client";
import React from "react";
import Image from "next/image";
const CloseButton = ({ children }: { children: React.ReactNode }) => {
  const [hovering, setHovering] = React.useState(false);
  return (
    <button
      onMouseEnter={() => setHovering(true)}
      className=" relative text-black px-2 pt-1 pb-8 text-2xl font-medium bg-[url('/assets/button/Button_Red_9Slides.png')] bg-contain bg-no-repeat hover:bg-[url('/assets/button/Button_Hover_9Slides.png')] active:bg-[url('/assets/button/Button_Red_9Slides_Pressed.png')] active:pt-1 inline-block"
    >
      <div className="active:pb-2 pt-1 flex items-center justify-center ">
        {!hovering ? (
          <Image
            className=""
            src="/assets/icons/close1.png"
            alt={""}
            width={100}
            height={100}
          />
        ) : (
          <Image
            className=""
            src="/assets/icons/close2.png"
            alt={""}
            width={100}
            height={100}
          />
        )}
      </div>
    </button>
  );
};

export default CloseButton;
