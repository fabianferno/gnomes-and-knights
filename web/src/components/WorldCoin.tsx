"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import Button from "./Button";
import axios from "axios";
import { createProfile } from "@/lib/ContractHelpers/createProfile";

export default function WorldCoinConnect() {
  const [worldcoinVerified, setWorldcoinVerified] = useState(false);
  const [worldcoinId, setWorldcoinId] = useState<any>(null);

  const [preparingAccount, setPreparingAccount] = useState(false);

  const account = useAccount();

  useEffect(() => {
    const signature = localStorage.getItem("worldcoinSignature");
    if (signature) {
      setWorldcoinVerified(true);
      const worldcoinSignature = JSON.parse(signature);
      setWorldcoinId({
        nullifier_hash: worldcoinSignature.message,
      });
      console.log("Loaded worldcoin");
    }
  }, []);

  const handleVerify = async (proof: any) => {
    // console.log(proof);
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proof }),
    });
    if (!response.ok) {
      throw new Error(`Error verifying Worldcoin: ${response.statusText}`);
    }

    const data = await response.json();
    setWorldcoinVerified(data.verified);
  };

  const handleSign = async (message: string) => {
    setPreparingAccount(true);
    const response = await fetch("/api/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error(`Error signing Worldcoin: ${response.statusText}`);
    }

    const signedMessage = await response.json();

    // Store the signed message in the localStorage
    localStorage.setItem(
      "worldcoinSignature",
      JSON.stringify({
        message,
        signature: signedMessage,
      })
    );

    // Fund the user's wallet
    const responseFund = await axios.post("/api/fund", {
      wallet: localStorage.getItem("publicKey") || "",
      chain: "inco",
      serialNumber: localStorage.getItem("serialNumber") || "",
    });

    if (!responseFund.data.funded) {
      window.alert("Error funding wallet");
    } else {
      // TODO: Create Profile
      createProfile(localStorage.getItem("serialNumber") || "").then(() => {
        console.log("Profile created successfully.");
        window.alert(
          "Profile created. Minted Aura tokens using Wrapped Apecoins..."
        );
        setPreparingAccount(false);
      });
    }
  };

  const onSuccess = async (proof: any) => {
    // Sign the verified nullifier hash and store in the localStorage
    await handleSign(proof.nullifier_hash);

    setWorldcoinId(proof);
  };

  return (
    <>
      {!worldcoinId ? (
        <IDKitWidget
          app_id="app_staging_6885a9ae16c352e8434d6b164197e372" // obtained from the Developer Portal
          action="verify-human" // this is your action id from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // optional callback when the proof is received
          verification_level={VerificationLevel.Device}
        >
          {({ open }) => (
            <div
              className="font-bold text-lg text-zinc-600 cursor-pointer"
              onClick={open}
            >
              World ID
            </div>
          )}
        </IDKitWidget>
      ) : (
        <div className="text-right mt-1 mr-1">
          <span className="text-xs bg-zinc-400 text-white px-2 py-1 rounded-full">
            Worldcoin ✅{" "}
            {preparingAccount && "Creating Account using ApeCoin..."}
          </span>
          <p className="text-zinc-600 text-xs mt-2 text-right">
            {worldcoinId.nullifier_hash.slice(0, 12)}
          </p>
        </div>
      )}
    </>
  );
}
