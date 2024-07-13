import React from "react";
import Image from "next/image";
function Hitbar({ hits }: { hits: number }) {
  return (
    <div className="flex justify-between items-center">
      <p>Hits</p>

      <div className="flex">
        <Image
          src={`/assets/hit/${hits > 0 ? "full" : "empty"}.png`}
          alt="hits"
          width={20}
          height={20}
        />
        <Image
          src={`/assets/hit/${hits > 1 ? "full" : "empty"}.png`}
          alt="hits"
          width={20}
          height={20}
        />
        <Image
          src={`/assets/hit/${hits > 2 ? "full" : "empty"}.png`}
          alt="hits"
          width={20}
          height={20}
        />
        <Image
          src={`/assets/hit/${hits > 3 ? "full" : "empty"}.png`}
          alt="hits"
          width={20}
          height={20}
        />
        <Image
          src={`/assets/hit/${hits > 4 ? "full" : "empty"}.png`}
          alt="hits"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}

export default Hitbar;
