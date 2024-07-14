"use client";

import { approveApe } from "@/lib/ContractHelpers/approveApe";
import { getBalance } from "@/lib/getBalance";
import { createProfile } from "@/lib/ContractHelpers/createProfile";
import ethers from "ethers";
import { mintApe } from "@/lib/ContractHelpers/mint";
import { duel } from "@/lib/ContractHelpers/duel";
import { publicClient } from "@/lib/Client";
import { updateMatrix } from "@/lib/ContractHelpers/updateMatrix";
import { viewStats } from "@/lib/ContractHelpers/viewStats";

export default function Home() {
  return (
    <div
      onClick={async () => {
        // const balance = await getBalance(
        //   "0x09FDa79db5c62e8c7EA7774780124573872812F7"
        // );
        // console.log(balance);
        // const hash = await approveApe("04:3d:5e:22:4f:13:90");
        // console.log(hash);
        // const hash = await mintApe("04:12:68:22:4f:13:90");
        // console.log(hash);
        // const hash = await createProfile("04:12:68:22:4f:13:90");
        // console.log(hash);
        // const hash = await duel(
        //   "04:32:7c:9a:51:13:90",
        //   "0xeB20282EB31bc083EBd00645cA4c5d323fDf7fB8"
        // );
        // const hash1 = await publicClient.waitForTransactionReceipt({
        //   hash: hash,
        // });
        // console.log(hash1);
        // const hash1 = await updateMatrix("04:12:68:22:4f:13:90", [
        //   [20, 76, 30, 10],
        //   [23, 54, 34, 21],
        //   [22, 56, 34, 53],
        //   [23, 54, 34, 21],
        // ]);
        // console.log(hash1);
        // const hash = await viewStats(
        //   "0xeB20282EB31bc083EBd00645cA4c5d323fDf7fB8"
        // );
        // console.log(hash);
      }}
    >
      getbalance
    </div>
  );
}
