import React from "react";
import Image from "next/image";

function Grid({ grid }: { grid: number[] }) {
  const inventory = [
    "0",
    "bomb",
    "damal",
    "trap",
    "sword",
    "shield1",
    "armour",
    "helmet",
    "mirror",
  ];

  return (
    <div className="grid p-5 grid-rows-4 grid-flow-col gap-1 bg-[url('/assets/ui/gridbg.png')] bg-cover bg-no-repeat relative w-full h-96">
      {grid.map((item, index) => (
        <div
          key={index}
          className={`relative ${
            item === 0
              ? "bg-[url('/assets/ui/tile.png')]"
              : "bg-[url('/assets/ui/tile3.png')]"
          } bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center`}
        >
          {item !== 0 && (
            <Image
              src={`/assets/inventory/${inventory[item]}.png`}
              className="absolute px-0"
              alt={inventory[item]}
              width={40}
              height={40}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Grid;
