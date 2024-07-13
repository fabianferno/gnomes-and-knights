import React from "react";
import Button from "./Button";
import Button3 from "./Button3";
import Image from "next/image";
function Dialog({
  children,
  close,
  opponentaddress,
  type,
  gif,
}: {
  children: React.ReactNode;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  type: number;
  opponentaddress: string;
  gif: string;
}) {
  return (
    <div className="h-screen w-screen absolute z-10 flex justify-center items-center flex-col backdrop-blur-sm text-black">
      <div className="h-screen w-screen absolute bg-slate-900 opacity-80"></div>
      <div className="bg-[url('/assets/ui/gridbg.png')] bg-cover bg-no-repeat p-6 rounded-lg shadow-lg z-20 w-fit h-fit">
        <div className="flex flex-col items-center">
          <p className="mt-2 text-center text-4xl">{children}</p>
        </div>
        <div>
          <div className="flex justify-center items-center">
            <Image
              src={`/assets/${type == 0 ? "gnome" : "warrior"}/${gif}.gif`}
              alt="gif"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="flex ml-6">
          <Button disabled={false}>
            <div className="text-3xl p-4 mb-2 -mt-5">Yes</div>
          </Button>
          <div
            onClick={() => {
              close(false);
            }}
          >
            <Button3 disabled={false}>
              <div className="text-3xl p-4 mb-2 -mt-5">No</div>
            </Button3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
