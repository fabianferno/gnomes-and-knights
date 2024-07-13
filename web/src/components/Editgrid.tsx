"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

function Editgrid({
  grid,
  setgrid,
}: {
  grid: number[];
  setgrid: Dispatch<SetStateAction<number[]>>;
}) {
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
  const [swap, setSwap] = useState([-1, -1]);
  return (
    <div className="grid p-5 grid-rows-4 grid-flow-col gap-1 bg-[url('/assets/ui/gridbg.png')] bg-cover bg-no-repeat relative w-full h-96">
      {grid.map((item, index) => (
        <div
          key={index}
          className={`relative ${
            item === 0
              ? "bg-[url('/assets/ui/tile4.png')]"
              : "bg-[url('/assets/ui/tile3.png')]"
          } bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center ${
            swap[0] === index ? "ring-4 ring-blue-500" : ""
          } active:ring-4 active:ring-blue-500`}
          onClick={() => {
            if (swap[0] === -1) {
              setSwap([index, item]);
            } else {
              const newGrid = [...grid];
              newGrid[swap[0]] = item;
              newGrid[index] = swap[1];
              setgrid(newGrid);
              setSwap([-1, -1]);
            }
          }}
          style={{ animationDelay: `${Math.random() * 0.2}s` }} // Adding random delay to each item
        >
          {item !== 0 && (
            <Image
              src={`/assets/inventory/${inventory[item]}.png`}
              className="absolute px-0"
              alt={inventory[item]}
              width={50}
              height={50}
            />
          )}
        </div>
      ))}
      <style jsx>{`
        @keyframes vibrate {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(1px, 1px);
          }
          50% {
            transform: translate(1px, -1px);
          }
          75% {
            transform: translate(-1px, 1px);
          }
          100% {
            transform: translate(-1px, -1px);
          }
        }

        .relative {
          animation: vibrate 0.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default Editgrid;
