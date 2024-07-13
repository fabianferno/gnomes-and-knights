// components/Button.js
import React from "react";

const Button = ({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled: boolean;
}) => {
  return (
    <div className="relative">
      <div
        className={`select-none items-center justify-center text-black text-nowrap px-2 pt-1 pb-8  font-medium  bg-contain bg-no-repeat hover:bg-[url('/assets/button/Button_Hover_3Slides.png')] active:bg-[url('/assets/button/Button_Blue_3Slides_Pressed.png')] active:pt-2 inline-block ${
          disabled
            ? `bg-[url('/assets/button/Button_Disable_3Slides.png')] cursor-not-allowed`
            : `bg-[url('/assets/button/Button_Blue_3Slides.png')]`
        }`}
      >
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
