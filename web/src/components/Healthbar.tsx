"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

function Healthbar({ healthprop }: { healthprop: number }) {
  const [health, setHealth] = useState(750);
  const healths = [0, 250, 350, 450, 550, 750, 1000];

  useEffect(() => {
    for (let i = 0; i < healths.length; i++) {
      if (healthprop < 250) {
        setHealth(250);
      } else if (healthprop >= healths[i]) {
        setHealth(healths[i]);
      }
    }
  }, [healthprop]); // This effect will run whenever healthprop changes

  return (
    <div className="flex justify-between items-center">
      <p>Aura</p>
      <div className="flex flex-col justify-end items-end w-full">
        <p className="text-[10px] -mb-1 text-slate-600 -ml-3 mr-2">
          {healthprop}/1000
        </p>
        <div className="ml-1 -mt-2">
          <Image
            src={`/assets/healthbar/${health}.png`}
            className="ml-3"
            alt="healthbar"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}

export default Healthbar;
