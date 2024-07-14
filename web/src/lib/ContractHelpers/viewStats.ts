import { keccak256, toUtf8Bytes } from "ethers";
import { publicClient, walletClient } from "../Client";
import { abi } from "../abi/gnomesandknights";
import { privateKeyToAccount } from "viem/accounts";
import { apecoincontract, gnomeandknightscontract } from "../const";

export const playerStats = async (address: string) => {
  const data = await publicClient.readContract({
    address: gnomeandknightscontract,
    abi: abi,
    functionName: "players",
    args: [address],
  });
  return data;
};
