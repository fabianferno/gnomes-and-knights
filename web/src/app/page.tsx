"use client";
import Grid from "@/components/Grid";
import Image from "next/image";
import WorldCoinConnect from "@/components/WorldCoin";
import Profile from "@/components/Profile";
import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import Editgrid from "@/components/Editgrid";
import Modal from "@/components/Modal";
import { onBoard } from "@/components/CreateProfile";
import Result from "@/components/Resultpage";
import Dialog from "@/components/Dialog";
import scanId from "@/components/ScanId";
import { duelTx } from "@/lib/ContractHelpers/duel";
import { heal } from "@/lib/ContractHelpers/heal";
import { updateMatrix } from "@/lib/ContractHelpers/updateMatrix";
import { items } from "@/lib/constants";

export default function Home() {
  const [scanning, setScanning] = useState(false); // just to trigger the scanning page
  const [loggedin, setLoggedin] = useState(false); //once wallet is created
  const [start, setStart] = useState(true); //starts the nfc scanner
  const [worldcoinVerified, setWorldcoinVerified] = useState(true); //should be set to true once worldcoin verification is done
  const [tactics, setTactics] = useState([
    0, 13, 5, 0, 3, 2, 1, 11, 6, 7, 0, 10, 5, 4, 0, 15,
  ]); //grid items
  const [modal, setModal] = useState(false); //item edit modal open close
  const [itemid, setItemid] = useState(6); //item to be edited
  const [editTactics, setEditTactics] = useState(false); //for editing the grid
  const [duel, setDuel] = useState(false); //for duel page
  const [DuelDone, setDuelDone] = useState(false); //should be ture once the result is received
  const [DuelConfirmation, setDuelConfirmation] = useState(false); //triggers duel modal
  const [DuelResults, setDuelResults] = useState("0x1234567890"); //set duel winner address here
  const [Duelsign, setDuelsign] = useState(true); //triggers duel sign modal
  const [healingConfirmation, sethealingConfirmation] = useState(false); // triggers heal modal
  const [showresults, setShowresults] = useState(false); //after results is loaded its true when the user clicks show results button
  const [won, setWon] = useState(false);
  const [opponentaddress, setOpponentaddress] = useState("0x1234567890");

  //Type 0 is Gnome, Type 1 is Warrior,id is the uniqe id,health max 1000,hits max 5,heals max 2
  const playertype = 0; //o for gnome 1 for warrior
  const id = 123; //id of the player
  const health = 490; //aura
  const hits = 3; //hits
  const heals = 1; //heals
  const playeraddress = "0x1234567890"; //player address

  const [loading, setLoading] = useState(false); //triggers loader at any point

  useEffect(() => {
    (async () => {
      if (start) {
        setScanning(false);
        console.log("Scanning NFC");
        // window.alert(Scanning NFC: ${start});
        // onBoard().then(() => {
        //   setLoggedin(true);
        // });
        await onBoard({ setLoggedin, setStart });
      }
    })();
  }, [start]);

  useEffect(() => {
    if (localStorage.getItem("serialNumber") !== null && start) {
      setStart(false);

      // setScanning(false);
      setLoggedin(true);
    }
  }, []);

  useEffect(() => {
    const signature = localStorage.getItem("worldcoinSignature");
    if (signature) {
      setWorldcoinVerified(true);
      const worldcoinSignature = JSON.parse(signature);

      console.log("Loaded worldcoin");
    }
  }, []);

  useEffect(() => {
    if (playeraddress == DuelResults) {
      setWon(true);
    }
  }, [DuelDone]);
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
      {DuelDone && showresults && (
        <div className=" -mt-5">
          <Result type={playertype} won={won} />
        </div>
      )}
      {Duelsign && (
        <div className="-mt-5">
          <Dialog
            close={setDuelConfirmation}
            type={playertype}
            opponentaddress={opponentaddress}
            gif={"attack1"}
            yes={(opponentaddress: string) => {}}
            hidden={true}
          >
            Tap NFC Tag to Sign Transaction
          </Dialog>
        </div>
      )}
      {DuelConfirmation && (
        <div className=" -mt-5">
          <Dialog
            close={setDuelConfirmation}
            type={playertype}
            opponentaddress={opponentaddress}
            gif={"attack2"}
            yes={(opponentaddress: string) => {
              setDuelsign(true);
              duelTx(
                localStorage.getItem("serialNumber") || "",
                opponentaddress
              ).then((winner_address) => {
                setDuelResults(winner_address);
                setDuelDone(true);
              });
            }}
          >
            Do You want to Duel with {opponentaddress.slice(0, 6)}...
            {opponentaddress.slice(-6)}?
          </Dialog>
        </div>
      )}
      {healingConfirmation && (
        <div className=" -mt-5">
          <Dialog
            close={sethealingConfirmation}
            type={playertype}
            opponentaddress={opponentaddress}
            gif={"idle"}
            yes={(opponentaddress: string) => {
              heal(
                localStorage.getItem("serialNumber") || "",
                opponentaddress
              ).then((result) => {
                console.log("Healing Done");
              });
            }}
          >
            Do You want to heal {opponentaddress.slice(0, 6)}...
            {opponentaddress.slice(-6)}?
          </Dialog>
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
              <div
                onClick={() => {
                  setScanning(true);
                }}
              >
                <Button disabled={false}>
                  <p className="text-lg font-semibold pt-0.5">Lets Go!</p>
                </Button>
              </div>
            </div>
          ) : worldcoinVerified ? (
            duel ? (
              <>
                <section className="w-sm justify-center items-center flex flex-col">
                  <div className="ring-1 ring-zinc-700 rounded-xl p-1 mx-auto w-full bg-[url('/assets/ui/tile322.png')] bg-opacity-75">
                    <div className="flex justify-between items-start flex-col ">
                      <main className="flex flex-col items-center justify-center h-fit">
                        <Image
                          src="/assets/warrior/attack2.gif"
                          alt=""
                          width={300}
                          height={300}
                          className="-mb-16"
                        />
                        <Image
                          src="/assets/gnome/attack3.gif"
                          alt=""
                          width={300}
                          height={300}
                          className="-mt-16"
                        />
                      </main>
                    </div>
                  </div>
                  <Image
                    src="/assets/ui/sword.gif"
                    alt=""
                    key={1}
                    width={200}
                    height={200}
                    className="mt-2 rounded-full"
                  />
                  <div className="flex text-center flex-col justify-center items-center  p-2 mt-3 rounded-md ">
                    {/* <p className="text-black text-2xl font-semibold">
                      Duel Underway
                    </p> */}

                    <div
                      className="text-black text-2xl font-extrabold -mt-14"
                      onClick={() => {
                        DuelDone && setShowresults(!showresults);
                      }}
                    >
                      <Button disabled={!DuelDone}>
                        {!DuelDone ? (
                          <p className="pt-2">Duel Underway</p>
                        ) : (
                          <p className="pt-2">View Results</p>
                        )}
                      </Button>
                    </div>
                  </div>
                </section>
              </>
            ) : (
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
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center relative">
                          <div
                            onClick={async () => {
                              setLoading(!loading);
                              await scanId({ setOpponentaddress }).then(() => {
                                setDuelConfirmation(true);
                                setLoading(false);
                              });
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
                              if (!editTactics) {
                                // Change single dimension into 2d array using mappings from items
                                // 4x4 grid
                                let newTactics = [];
                                // tactics = [0, 13, 5, 0, 3, 2, 1, 11, 6, 7, 0, 10, 5, 4, 0, 15];
                                for (let i = 0; i < 4; i++) {
                                  let row = [];
                                  for (let j = 0; j < 4; j++) {
                                    row.push(items[tactics[i * 4 + j]].value);
                                  }
                                  newTactics.push(row);
                                }
                                updateMatrix(
                                  localStorage.getItem("serialNumber") || "",
                                  newTactics
                                ).then((txHash) => {
                                  window.alert(`Tactics Updated: ${txHash}`);
                                });
                              }
                              setEditTactics(!editTactics);
                            }}
                          >
                            <Button disabled={false}>
                              <p className="text-lg font-semibold pt-0.5">
                                {!editTactics ? "Edit Tactics" : "Save Tactics"}
                              </p>
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-center items-center relative">
                          <div
                            onClick={async () => {
                              setLoading(!loading);
                              await scanId({ setOpponentaddress }).then(() => {
                                sethealingConfirmation(true);
                                setLoading(false);
                              });
                            }}
                          >
                            <Button2>
                              <p className="text-lg font-semibold pt-0.5">
                                Heal Ally
                              </p>
                            </Button2>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </section>
            )
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
                <Button disabled={false}>
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
                    <div
                      className="flex flex-col gap-5 z-20  ml-20 mt-80 pt-28  absolute justify-center items-center"
                      onClick={() => setStart(true)}
                    >
                      <Button disabled={false}>
                        <p className="  text-4xl text-black  font-bold  ">
                          {" "}
                          Scan NFC
                        </p>
                      </Button>
                      {/* <div className="">
                        <Image
                          src="/assets/ui/nfcloading.gif"
                          alt=""
                          width={80}
                          height={80}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
          
    </>
  );
}
