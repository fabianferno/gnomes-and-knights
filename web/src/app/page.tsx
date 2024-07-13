"use client";
import Grid from "@/components/Grid";
import Image from "next/image";
import WorldCoinConnect from "@/components/WorldCoin";
import Profile from "@/components/Profile";
// import { useAccount } from "wagmi";
import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import Loader from "@/components/Loader";
import { useState } from "react";
import Editgrid from "@/components/Editgrid";
import Modal from "@/components/Modal";

export default function Home() {
  // const { primaryWallet } = useDynamicContext();
  // const account = useAccount();
  const [scanning, setScanning] = useState(false);
  const [loggedin, setLoggedin] = useState(true);
  const [worldcoinVerified, setWorldcoinVerified] = useState(true);
  const [tactics, setTactics] = useState([
    0, 13, 5, 0, 3, 2, 1, 11, 6, 7, 0, 10, 5, 4, 0, 15,
  ]);
  const [modal, setModal] = useState(false);
  const [itemid, setItemid] = useState(6);
  const [editTactics, setEditTactics] = useState(false);
  const updateTactic = (index: number, value: number) => {
    setTactics((prevTactics) => {
      const newTactics = [...prevTactics];
      newTactics[index] = value;
      return newTactics;
    });
  };
  //Type 0 is Gnome, Type 1 is Warrior,id is the uniqe id,health max 1000,hits max 5,heals max 2
  const playertype = 0;
  const id = 123;
  const health = 490;
  const hits = 3;
  const heals = 1;
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && (
        <div className=" -mt-5">
          <Loader type={playertype} />
        </div>
      )}
      {modal && (
        <div className=" -mt-5">
          <Modal itemid={itemid} closemodal={setModal} />
        </div>
      )}
      <main className="mx-auto flex flex-col items-center justify-center max-w-sm mt-5">
        {loggedin && worldcoinVerified && (
          <div className="relative grid grid-cols-1 container place-items-center">
            <div className="text-center mb-5">
              <div className="text-3xl font-bold">
                <span className="flex justify-center items-center">
                  <Image src="/logo.png" alt="" width={250} height={128} />
                </span>
              </div>
              <div className="font-bold text-zinc-900">
                A social strategy game
              </div>
            </div>
          </div>
        )}

        {!scanning ? (
          !loggedin ? (
            <div className="flex justify-center items-center flex-col h-screen">
              <div className="relative grid grid-cols-1 container place-items-center">
                <div className="text-center mb-1">
                  <div className="text-3xl font-bold">
                    <span className="flex justify-center items-center">
                      <Image src="/logo.png" alt="" width={350} height={179} />
                    </span>
                  </div>
                  <div className="font-bold text-zinc-900">
                    A social strategy game
                  </div>
                </div>
              </div>
              <div onClick={() => setScanning(!scanning)}>
                <Button>
                  <p className="text-lg font-semibold pt-0.5">Scan NFC</p>
                </Button>
              </div>
            </div>
          ) : worldcoinVerified ? (
            <section className="w-sm justify-center items-center flex flex-col">
              <div className="ring-1 ring-zinc-700 rounded-xl p-1 mx-auto w-full bg-[#47ABA9] bg-opacity-75">
                <div className="flex justify-between items-start flex-col ">
                  <main className="flex flex-col items-center justify-center h-fit">
                    <div className="pt-2 w-full px-12">
                      <Profile
                        type={playertype}
                        id={id}
                        health={health}
                        hits={hits}
                        heals={heals}
                      />
                    </div>
                    <div className="w-96 ">
                      {!editTactics ? (
                        <Grid
                          grid={tactics}
                          triggermodal={setModal}
                          itemid={setItemid}
                        />
                      ) : (
                        <Editgrid grid={tactics} setgrid={setTactics} />
                      )}
                    </div>
                    <div className="flex justify-center items-center relative">
                      <div
                        onClick={() => {
                          setLoading(!loading);
                        }}
                      >
                        <Button2>
                          <p className="text-lg font-semibold pt-0.5">
                            Start Duel
                          </p>
                        </Button2>
                      </div>
                      <div
                        onClick={() => {
                          setEditTactics(!editTactics);
                        }}
                      >
                        <Button>
                          <p className="text-lg font-semibold pt-0.5">
                            {!editTactics ? "Edit Tactics" : "Save Tactics"}
                          </p>
                        </Button>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </section>
          ) : (
            <div className="flex justify-center items-center flex-col h-screen">
              <div className="relative grid grid-cols-1 container place-items-center">
                <div className="text-center mb-1">
                  <div className="text-3xl font-bold">
                    <span className="flex justify-center items-center">
                      <Image src="/logo.png" alt="" width={350} height={179} />
                    </span>
                  </div>
                  <div className="font-bold text-zinc-900 text-xl">
                    Login With WorldCoin
                  </div>
                </div>
              </div>
              <div className="">
                <Button>
                  <WorldCoinConnect />
                </Button>
              </div>
            </div>
          )
        ) : (
          <>
            <div className="relative grid grid-cols-1 container place-items-center">
              <div className="text-center mb-5">
                <div className="text-3xl font-bold">
                  <span className="flex justify-center items-center">
                    <Image src="/logo.png" alt="" width={250} height={128} />
                  </span>
                </div>
                <div className="font-bold text-zinc-900">
                  A social strategy game
                </div>
              </div>
            </div>
            <section className="w-sm justify-center items-center flex flex-col">
              <div className="ring-1 ring-zinc-700 rounded-xl p-1 mx-auto w-full bg-[#47ABA9] bg-opacity-75">
                <div className="flex justify-between items-start flex-col ">
                  <div className="flex w-full  items-center justify-between">
                    <Image
                      src="/assets/ui/nfc.png"
                      alt=""
                      width={400}
                      height={400}
                      key={1}
                      className=" z-0"
                    />
                    <Image
                      src="/assets/ui/tree.gif"
                      alt=""
                      width={100}
                      height={100}
                      className="absolute z-10"
                    />
                    <Image
                      src="/assets/ui/tree.gif"
                      alt=""
                      width={100}
                      height={100}
                      className=" mb-64 ml-44 absolute z-20"
                    />
                    <Image
                      src="/assets/ui/tree.gif"
                      alt=""
                      width={100}
                      height={100}
                      className=" mt-24 ml-64 absolute z-20"
                    />
                    <Image
                      src="/assets/ui/sheep.gif"
                      alt=""
                      width={80}
                      height={80}
                      className=" mb-16 ml-36 absolute z-20"
                    />
                    <Image
                      src="/assets/ui/sheep.gif"
                      alt=""
                      width={80}
                      height={80}
                      className=" mt-80 ml-48 absolute z-20 scale-x-[-1]"
                    />
                    <div className="flex flex-col gap-5 z-20  ml-24 mt-80 pt-28  absolute justify-center items-center">
                      <p className="  text-4xl text-black  font-bold  ">
                        {" "}
                        Scanning NFC
                      </p>
                      <div className="">
                        <Image
                          src="/assets/ui/nfcloading.gif"
                          alt=""
                          width={80}
                          height={80}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* <Faucet address="0x76050f043A864114EaFAeCC35BE4AD8dBe8FeA9B" /> */}
      </main>
    </>
  );
}
