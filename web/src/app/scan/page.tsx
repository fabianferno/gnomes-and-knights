"use client";

import Button from "@/components/Button";
import CloseButton from "@/components/CloseButton";
import Grid from "@/components/Grid";
import Image from "next/image";
import WorldCoinConnect from "@/components/WorldCoin";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useAccount } from "wagmi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Wallet, keccak256, toUtf8Bytes } from "ethers";

const creatingAccountUsingNFC = () => {
  const ndef = new NDEFReader();
  ndef
    .scan()
    .then(() => {
      console.log("Scan started successfully.");
      // window.alert("Scan started successfully.");
      ndef.onreadingerror = (event) => {
        console.log(
          "Error! Cannot read data from the NFC tag. Try a different one?"
        );
        window.alert(
          "Error! Cannot read data from the NFC tag. Try a different one?"
        );
      };
      ndef.onreading = ({ message, serialNumber }) => {
        window.alert(
          "Scan started successfully." +
            JSON.stringify({ message, serialNumber })
        );
        const hash = keccak256(toUtf8Bytes(serialNumber));
        const privateKey = "0x" + hash.slice(2, 66);

        const wallet = new Wallet(privateKey);

        console.log("WalletAddress: ", wallet.address);
        console.log(wallet.privateKey);
        // console.log(serialNumber);
        // console.log("NDEF message read.");
        // console.log(false);
      };
    })
    .catch((error) => {
      console.log(`Error! Scan failed to start: ${error}.`);
    });
};
export default function Home() {
  const { primaryWallet } = useDynamicContext();

  return (
    <main className="mx-5 flex min-h-screen flex-col items-center justify-center pb-10 ">
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

      <section className="lg:max-w-6xl lg:w-full">
        <div className="ring-1 ring-zinc-700 rounded-xl p-1 w-full">
          {!primaryWallet ? (
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-md mb-5">
                Connect your wallet to get started
              </h3>
              <div className="flex gap-2">
                <DynamicWidget />
                {/* <div onClick={()=>{
                  console.log("clicked")
                  const serialNumber = "8928971"; // Coming from the NFC
                    // Generate private key from serial number (hashing for demonstration purposes)
                  const hash = keccak256(toUtf8Bytes(serialNumber));
                  const privateKey = "0x" + hash.slice(2, 66);

                  const wallet = new Wallet(privateKey);


                   console.log("WalletAddress: ", wallet.address);
  console.log(wallet.privateKey);
                }}>
                <Button>Connect via NFC</Button>

                </div> */}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-start flex-col ">
              <div className="flex w-full justify-between items-center">
                <DynamicWidget />

                <WorldCoinConnect />
              </div>

              <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div>
                  <Button>Play Now</Button>
                </div>
                <div className="w-10">
                  <CloseButton>Close</CloseButton>
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
      <section className="lg:max-w-6xl lg:w-full">
        <div className="ring-1 ring-zinc-700 rounded-xl p-1 w-full">
          <button onClick={creatingAccountUsingNFC}>Scan NFC</button>
        </div>
      </section>
    </main>
  );
}
