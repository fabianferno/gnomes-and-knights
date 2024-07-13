import React from "react";
function Dialog({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen absolute z-10 flex justify-center items-center flex-col backdrop-blur-sm text-black">
      <div className="h-screen w-screen absolute bg-slate-900 opacity-80"></div>
      <div className="bg-[url('/assets/ui/gridbg.png')] bg-contain bg-no-repeat p-6 rounded-lg shadow-lg z-20 w-96 h-96">
        <div className="flex flex-col items-center">
          <p className="mt-2 text-center">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
