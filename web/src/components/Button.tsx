// components/Button.js
import React from "react";

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="select-none items-center justify-center text-black text-nowrap px-2 pt-1 pb-8  font-medium bg-[url('/assets/button/Button_Blue_3Slides.png')] bg-contain bg-no-repeat hover:bg-[url('/assets/button/Button_Hover_3Slides.png')] active:bg-[url('/assets/button/Button_Blue_3Slides_Pressed.png')] active:pt-2 inline-block">
        <div
          className="
        px-10"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Button;
