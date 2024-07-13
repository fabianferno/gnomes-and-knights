"use client";
import Grid from "@/components/Grid";
import Image from "next/image";
import WorldCoinConnect from "@/components/WorldCoin";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Profile from "@/components/Profile";

export default function Home() {
  const { primaryWallet } = useDynamicContext();

  return (
    <main className="mx-auto flex flex-col items-center justify-center max-w-sm">
      <div className="relative grid grid-cols-1 container place-items-center">
        <div className="text-center mb-5">
          <div className="text-3xl font-bold">
            <span className="flex justify-center items-center">
              <Image src="/logo.png" alt="" width={250} height={128} />
            </span>
          </div>
          <div className="font-bold text-zinc-400">A social strategy game</div>
        </div>
      </div>

      <section className="w-sm">
        <div className="ring-1 ring-zinc-700 rounded-xl p-1 mx-auto w-full bg-[#47ABA9] bg-opacity-75">
          {!primaryWallet ? (
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-md mb-5">
                Connect your wallet to get started
              </h3>
              <DynamicWidget />
            </div>
          ) : (
            <div className="flex justify-between items-start flex-col ">
              <div className="flex w-full  items-center">
                <DynamicWidget />

                <div className="-mt-10 ml-2">
                  <WorldCoinConnect />
                </div>
              </div>
              <main className="flex flex-col items-center justify-center ">
                <div className="pt-2 w-full px-12">
                  {/*Type 0 is Gnome, Type 1 is Warrior,id is the uniqe id,health max 1000,hits max 5,heals max 2*/}
                  <Profile type={0} id={123} health={490} hits={3} heals={1} />
                </div>
                <div className="w-96 h-96">
                  <Grid
                    grid={[0, 1, 5, 0, 3, 2, 1, 5, 6, 7, 0, 7, 5, 2, 0, 1]}
                  />
                </div>
              </main>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
