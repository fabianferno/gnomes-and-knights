import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { items } from "@/lib/constants";
import CloseButton from "./CloseButton";

function Modal({
  itemid,
  closemodal,
}: {
  itemid: number;
  closemodal: Dispatch<SetStateAction<boolean>>;
}) {
  const itemdetails = items[itemid];

  return (
    <div className="h-screen w-screen absolute z-10 flex justify-center items-center flex-col backdrop-blur-sm text-black">
      <div className="h-screen w-screen absolute bg-slate-900 opacity-80"></div>
      <div className="bg-[url('/assets/ui/gridbg.png')] bg-contain bg-no-repeat p-6 rounded-lg shadow-lg z-20 w-96 h-96">
        <div
          className=" scale-50 -mt-4 -mb-10 ml-64"
          onClick={() => closemodal(false)}
        >
          <CloseButton />
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={itemdetails.image}
            alt={itemdetails.name}
            width={80}
            height={80}
            className="border-2 border-zinc-950"
          />
          <h1 className="text-2xl font-bold mt-4">{itemdetails.name}</h1>
          <p className="text-sm text-gray-600">{itemdetails.type}</p>
          <p className="mt-2 text-center">{itemdetails.description}</p>
          <p className="mt-2 font-semibold">
            {itemdetails.type === "attack" ? "Attack" : "Defense"} Value:{" "}
            {itemdetails.value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
