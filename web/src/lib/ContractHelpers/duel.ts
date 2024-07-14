import { keccak256, toUtf8Bytes } from "ethers";
import { publicClient, walletClient } from "../Client";
import { abi } from "../abi/gnomesandknights";
import { privateKeyToAccount } from "viem/accounts";
import { apecoincontract, gnomeandknightscontract } from "../const";

// export const duelTx = async (serialNumber: string, address: string) => {
//   const hash = keccak256(toUtf8Bytes(serialNumber));
//   const privateKey = ("0x" + hash.slice(2, 66)) as `0x${string}`;
//   console.log(privateKey);
//   const account = privateKeyToAccount(privateKey);
//   console.log(account);

//   console.log(account.address, serialNumber);

//   try {
//     const { request } = await publicClient.simulateContract({
//       account,
//       address: gnomeandknightscontract,
//       abi: abi,
//       functionName: "duel",
//       args: [address],
//     });

//     const hash1 = await walletClient.writeContract(request);
//     const hash2 = await publicClient.waitForTransactionReceipt({
//       hash: hash1,
//     });
//     const winner =
//       hash2?.logs[0]?.topics[2] || "0x00000000000000000000000000000000"; // Winner Address
//     const winner_address = "0x" + winner.slice(26);
//     return { winner_address, hash2 };
//   } catch (e) {
//     console.log(e);
//     // await new Promise((resolve) => setTimeout(resolve, 5000));
//     // return {
//     //   winner_address: address,
//     //   hash2: {
//     //     transactionHash:
//     //       "0x530739438987da08c80b7e127a59e1f25f26553f1546137eaf075d2735ed6ea6",
//     //   },
//     // };
//   }
// };

export const duelTx = async (serialNumber: string, address: string) => {
  const hash = keccak256(toUtf8Bytes(serialNumber));
  const privateKey = ("0x" + hash.slice(2, 66)) as `0x${string}`;
  console.log(privateKey);
  const account = privateKeyToAccount(privateKey);
  console.log(account);

  console.log(account.address, serialNumber);

  const { request } = await publicClient.simulateContract({
    account,
    address: gnomeandknightscontract,
    abi: abi,
    functionName: "duel",
    args: [address],
  });

  const hash1 = await walletClient.writeContract(request);
  const hash2 = await publicClient.waitForTransactionReceipt({
    hash: hash1,
  });
  const winner = hash2?.logs[0]?.topics[2];
  const winner_address = winner;
  return { winner_address, hash2 };
};
