import React from "react";
import Image from "next/image";
import { items } from "@/lib/constants";

function Grid({
  grid,
  triggermodal,
  itemid,
}: {
  grid: number[];
  triggermodal: React.Dispatch<React.SetStateAction<boolean>>;
  itemid: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="grid p-5 grid-rows-4 grid-flow-col gap-1 bg-[url('/assets/ui/gridbg.png')] bg-cover bg-no-repeat relative w-full h-96">
      {grid.map((item, index) => (
        <div
          key={index}
          className={`relative ${
            item === 0
              ? "bg-[url('/assets/ui/tile4.png')]"
              : "bg-[url('/assets/ui/tile3.png')]"
          } bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center`}
          onClick={() => {
            if (item !== 0) {
              itemid(item);
              triggermodal(true);
            }
          }}
        >
          {item !== 0 && (
            <Image
              src={items[item].image}
              className="absolute px-0"
              alt={items[item].name}
              width={50}
              height={50}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Grid;
