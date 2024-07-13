"use client";

import { approveApe } from "@/lib/ContractHelpers/approveApe";
import { getBalance } from "@/lib/getBalance";
import { createProfile } from "@/lib/ContractHelpers/createProfile";
import ethers from "ethers";
import { mintApe } from "@/lib/ContractHelpers/mint";

export default function Home() {
  return (
    <div
      onClick={async () => {
        // const balance = await getBalance(
        //   "0x09FDa79db5c62e8c7EA7774780124573872812F7"
        // );
        // console.log(balance);
        // const hash = await approveApe("04:12:68:22:4f:13:90");
        // console.log(hash);
        // const hash = await mintApe("04:12:68:22:4f:13:90");

        // console.log(hash);
        const hash = await createProfile("04:12:68:22:4f:13:90");
        console.log(hash);
      }}
    >
      getbalance
    </div>
  );
}
