import React from "react";
import Image from "next/image";
function Grid() {
  return (
    <div className="grid p-5 grid-rows-4 grid-flow-col gap-1 bg-[url('/assets/ui/gridbg.png')] bg-cover bg-no-repeat relative w-full h-full">
      <div className="relative bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        <Image
          src="/assets/icons/sword.png"
          className="absolute px-0"
          alt=""
          width={40}
          height={40}
        />
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        <Image
          src="/assets/icons/sword.png"
          className="absolute px-0"
          alt=""
          width={40}
          height={40}
        />
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        03
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        <Image
          src="/assets/icons/sword.png"
          className="absolute px-0"
          alt=""
          width={40}
          height={40}
        />
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        05
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        <Image
          src="/assets/icons/sword.png"
          className="absolute px-0"
          alt=""
          width={40}
          height={40}
        />
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        07
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        <Image
          src="/assets/icons/sword.png"
          className="absolute px-0"
          alt=""
          width={40}
          height={40}
        />
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        09
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        10
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        11
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        12
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        13
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        14
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105  flex justify-center items-center">
        15
      </div>
      <div className="bg-[url('/assets/ui/tile.png')] bg-contain bg-no-repeat hover:scale-105 flex justify-center items-center">
        16
      </div>
    </div>
  );
}

export default Grid;
