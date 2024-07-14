import { keccak256, toUtf8Bytes } from "ethers";
import { publicClient, walletClient } from "../Client";
import { abi } from "../abi/gnomesandknights";
import { privateKeyToAccount } from "viem/accounts";
import { apecoincontract, gnomeandknightscontract } from "../const";

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
  const winner =
    hash2?.logs[0]?.topics[2] || "0x00000000000000000000000000000000"; // Winner Address
  const winner_address = "0x" + winner.slice(26);
  return winner_address;
};
