import React from "react";
import Image from "next/image";
import Healthbar from "./Healthbar";
function Profile() {
  return (
    <div className="relative flex">
      <div className="relative bg-[url('/assets/ui/gnomeframe.png')] bg-no-repeat bg-contain w-24 h-24">
        <Image
          src="/assets/warrior/idle.gif"
          alt=""
          width={200}
          height={200}
          className="inset-0 z-0 scale-125"
        />
      </div>
      <div className="">
        <p className="">Gnome #1234</p>
        <Healthbar healthprop={908} />
      </div>
    </div>
  );
}

export default Profile;
