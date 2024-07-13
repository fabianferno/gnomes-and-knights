import React from "react";
import Image from "next/image";
import Button from "./Button";

function Result({ type, won }: { type: number; won: boolean }) {
  return (
    <div className="h-screen w-screen absolute z-10 justify-center items-center flex flex-col backdrop-blur-sm">
      <div className="h-screen w-screen absolute bg-slate-900 opacity-80 justify-center items-center flex"></div>
      {won ? (
        <Image
          src={`/assets/${type == 0 ? "gnome" : "warrior"}/attack1.gif`}
          alt="loading"
          width={300}
          height={300}
          className="opacity-100 z-20"
          key={1}
        />
      ) : (
        <Image
          src={`/assets/warrior/dead.gif`}
          alt="loading"
          width={300}
          height={300}
          className="opacity-100 z-20"
          key={1}
        />
      )}
      {won ? (
        <div className="text-4xl text-white z-20">Big W +100 Aura</div>
      ) : (
        <div className="text-4xl text-white z-20">Big L -100 Aura</div>
      )}
      <div className="mt-5">
        <Button disabled={false}>Home</Button>
      </div>

      <style jsx>{`
        .loading-dots {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .loading-dots::before,
        .loading-dots::after,
        .loading-dots div {
          content: "";
          width: 10px;
          height: 10px;
          margin: 0 5px;
          background: white;
          border-radius: 50%;
          animation: loading-dots 1s infinite;
        }

        .loading-dots::before {
          animation-delay: 0s;
        }

        .loading-dots div {
          animation-delay: 0.2s;
        }

        .loading-dots::after {
          animation-delay: 0.4s;
        }

        @keyframes loading-dots {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default Result;
