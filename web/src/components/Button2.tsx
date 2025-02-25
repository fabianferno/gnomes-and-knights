// components/Button.js
import React from "react";

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <button className=" text-black text-nowrap px-2 pt-1 pb-8  font-medium bg-[url('/assets/button/Button_Hover_3Slides.png')] bg-contain bg-no-repeat hover:bg-[url('/assets/button/Button_Blue_3Slides.png')] active:bg-[url('/assets/button/Button_Blue_3Slides_Pressed.png')] active:pt-2 inline-block">
        <div
          className="
        px-10"
        >
          {children}
        </div>
      </button>
    </div>
  );
};

export default Button;
