"use client";
import Grid from "@/components/Grid";
import Image from "next/image";
import WorldCoinConnect from "@/components/WorldCoinConnect";
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
import Toast from "@/components/Toast";
import { duelTx } from "@/lib/ContractHelpers/duel";
import { heal } from "@/lib/ContractHelpers/heal";
import { updateMatrix } from "@/lib/ContractHelpers/updateMatrix";
import { playerStats } from "@/lib/ContractHelpers/viewStats";
import { items } from "@/lib/constants";
import { privateKeyToAccount } from "viem/accounts";
import { Wallet, keccak256, toUtf8Bytes } from "ethers";
import getAccountFromNFC from "@/lib/getAccountFromNFC";

export default function Home() {
  const [scanning, setScanning] = useState(false); // just to trigger the scanning page
  const [loggedin, setLoggedin] = useState(false); // once wallet is created
  const [start, setStart] = useState(false); // starts the nfc scanner
  const [worldcoinVerified, setWorldcoinVerified] = useState(false); //should be set to true once worldcoin verification is done
  const [tactics, setTactics] = useState([
    0, 13, 5, 0, 3, 2, 1, 11, 6, 7, 0, 10, 5, 4, 0, 15,
  ]); // grid items
  const [modal, setModal] = useState(false); //item edit modal open close
  const [itemid, setItemid] = useState(6); //item to be edited
  const [editTactics, setEditTactics] = useState(false); //for editing the grid
  const [duel, setDuel] = useState(false); //for duel page
  const [duelComplete, setduelComplete] = useState(false); //should be ture once the result is received
  const [confirmDuelDialog, setconfirmDuelDialog] = useState(false); //triggers duel modal
  const [confirmHealDialog, setconfirmHealDialog] = useState(false); // triggers heal modal
  const [DuelResults, setDuelResults] = useState("0"); //set duel winner address here
  const [Duelsign, setDuelsign] = useState(false); //triggers duel sign modal
  const [showresults, setShowresults] = useState(false); //after results is loaded its true when the user clicks show results button
  const [won, setWon] = useState(false);
  const [opponentaddress, setOpponentaddress] = useState("0");
  const [showtoast, setShowtoast] = useState(false);
  const [hash, setHash] = useState("");
  // Declare all states here
  const [playerType, setPlayerType] = useState(0);
  const [playerId, setplayerId] = useState(123);
  const [playerAddress, setPlayerAddress] = useState("0x1234567890");
  const [playerHits, setplayerHits] = useState(3);
  const [playerHeals, setplayerHeals] = useState(1);
  const [loading, setLoading] = useState(false); //triggers loader at any point

  // Fetch player stats
  useEffect(() => {
    if (localStorage.getItem("serialNumber") !== null) {
      const player_address = getAccountFromNFC(
        localStorage.getItem("serialNumber") || ""
      ).address;
      playerStats(player_address).then((result: any) => {
        setplayerHeals(result[2]);
        setplayerHits(result[1]);
        setPlayerAddress(player_address);
        setPlayerType(result[1] == false ? 0 : 1);
        setplayerId(result[4]);
        console.log(
          "Results from player stats" +
            JSON.stringify(result) +
            localStorage.getItem("serialNumber") +
            player_address
        );

        // Get a random number using the result as a string
        const random = Math.floor(Math.random() * result[3]);

        // Set the tactics to the random number from 1 to 16
        const arrangements = [
          random % 16,
          (random + 1) % 16,
          (random + 2) % 16,
          0,
          (random + 4) % 16,
          (random + 5) % 16,
          (random + 6) % 16,
          (random + 7) % 16,
          (random + 8) % 16,
          (random + 9) % 16,
          0,
          (random + 11) % 16,
          0,
          (random + 13) % 16,
          (random + 14) % 16,
          0,
        ];

        setTactics(arrangements);
      });
    }
  }, []);

  // Scan NFC
  useEffect(() => {
    (async () => {
      if (start) {
        setScanning(false);
        console.log("Scanning NFC");
        await onBoard({ setLoggedin, setStart });
      }
    })();
  }, [start]);

  // To show the toast
  useEffect(() => {
    if (hash !== "") {
      setShowtoast(true);
      const timer = setTimeout(() => {
        setShowtoast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  useEffect(() => {
    if (localStorage.getItem("serialNumber") !== null && start) {
      setStart(false);
      setLoggedin(true);
    }
  }, []);

  // Check if the user has a verified worldcoin proof
  useEffect(() => {
    const signature = localStorage.getItem("worldcoinSignature");
    if (signature) {
      setWorldcoinVerified(true);
    }
  }, []);

  useEffect(() => {
    if (playerAddress == DuelResults) {
      setWon(true);
    }
  }, [duelComplete]);

  return (
    <>
      {showtoast && <Toast hash={hash} />}
      {loading && (
        <div className=" -mt-5">
          <Loader type={playerType} />
        </div>
      )}
      {modal && (
        <div className=" -mt-5">
          <Modal itemid={itemid} closemodal={setModal} />
        </div>
      )}
      {duelComplete && showresults && (
        <div className=" -mt-5">
          <Result type={playerType} won={won} />
        </div>
      )}
      {confirmDuelDialog && (
        <div className="-mt-5">
          <Dialog
            close={setconfirmDuelDialog}
            type={playerType}
            opponentaddress={opponentaddress}
            gif={"attack2"}
            yes={(opponentaddress: string) => {
              setDuelsign(true);
              duelTx(
                localStorage.getItem("serialNumber") || "",
                opponentaddress
              ).then(({ winner_address, hash2 }) => {
                setHash(hash2.transactionHash);
                setDuelResults(winner_address);
                setduelComplete(true);
              });
            }}
          >
            Do You want to Duel with{" "}
            {opponentaddress == "0"
              ? "ANON"
              : opponentaddress.slice(0, 6) + "..." + opponentaddress.slice(-6)}
            ?
          </Dialog>
        </div>
      )}
      {confirmHealDialog && (
        <div className=" -mt-5">
          <Dialog
            close={setconfirmHealDialog}
            type={playerType}
            opponentaddress={opponentaddress}
            gif={"idle"}
            yes={(opponentaddress: string) => {
              heal(
                localStorage.getItem("serialNumber") || "",
                opponentaddress
              ).then((result) => {
                setHash(result);
                console.log("Healing Done");
              });
            }}
          >
            Do You want to heal{" "}
            {opponentaddress == "0"
              ? "ANON"
              : opponentaddress.slice(0, 6) + "..." + opponentaddress.slice(-6)}
            ?
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
                        duelComplete && setShowresults(!showresults);
                      }}
                    >
                      <Button disabled={!duelComplete}>
                        {!duelComplete ? (
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
                          type={playerType}
                          id={playerId}
                          address={playerAddress}
                          hits={playerHits}
                          heals={playerHeals}
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
                                setconfirmDuelDialog(true);
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
                                setconfirmHealDialog(true);
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
                          Scan NFC
                        </p>
                      </Button>
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
