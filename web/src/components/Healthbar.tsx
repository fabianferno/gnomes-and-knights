"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

function Healthbar({ healthprop }: { healthprop: number }) {
  const [health, setHealth] = useState(75);
  const healths = [0, 25, 35, 45, 55, 75, 100];

  useEffect(() => {
    for (let i = 0; i < healths.length; i++) {
      if (healthprop < 25) {
        setHealth(25);
      } else if (healthprop >= healths[i]) {
        setHealth(healths[i]);
      }
    }
  }, [healthprop]); // This effect will run whenever healthprop changes

  return (
    <div>
      <Image
        src={`/assets/healthbar/${health}.png`}
        alt="healthbar"
        width={100}
        height={100}
      />
    </div>
  );
}

export default Healthbar;
