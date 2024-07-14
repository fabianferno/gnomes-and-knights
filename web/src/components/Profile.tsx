import React from "react";
import Image from "next/image";
import Healthbar from "./Healthbar";
import Hitbar from "./Hitbar";
import Healbar from "./Healbar";
import { useEffect, useState } from "react";
import { getBalance } from "@/lib/getBalance";

function Profile({
  type,
  id,
  heals,
  hits,
  address,
}: {
  type: number;
  id: number;
  hits: number;
  heals: number;
  address: string;
}) {
  const [auraBalance, setAuraBalance] = React.useState(290);
  const [ethBalance, setEthBalance] = React.useState("0");

  useEffect(() => {
    // TODO: Fetch Aura balance using the player address

    getBalance(address as any).then((balance) => {
      // Store balance without loosing decimals
      setEthBalance(balance);
    });
  }, []);

  return (
    <div className="relative flex justify-between items-center">
      <div className="relative bg-[url('/assets/ui/gnomeframe.png')] bg-no-repeat bg-contain w-32 h-32">
        <Image
          src={`/assets/${type == 0 ? "gnome" : "warrior"}/idle.gif`}
          alt=""
          width={200}
          height={200}
          className="inset-0 z-0 scale-125"
        />
      </div>
      <div className=" -mt-3">
        <p className=" text-center font-semibold font-lg text-black">
          {/* Gnome #1234 */}
          {type == 0 ? "Gnome" : "Warrior"} #{id}
        </p>
        <div className="-my-1 -mb-2 text-black">
          <Healthbar healthprop={auraBalance} />
        </div>
        <div className="-my-1 -mt-1 text-black">
          <Hitbar hits={hits} />
        </div>
        <div className="text-black">
          <Healbar heals={heals} />
        </div>
        <div className="text-black">
          <p>ETH: {ethBalance}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
