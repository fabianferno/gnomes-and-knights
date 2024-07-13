import React from "react";
import Image from "next/image";
function Healbar({ heals }: { heals: number }) {
  return (
    <div className="flex  items-center">
      <p className="mr-3">Heals</p>

      <div className="flex">
        <Image
          src={`/assets/heal/${heals > 0 ? "full" : "empty"}.png`}
          alt="heals"
          width={20}
          height={20}
        />
        <Image
          src={`/assets/heal/${heals > 1 ? "full" : "empty"}.png`}
          alt="heals"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}

export default Healbar;
