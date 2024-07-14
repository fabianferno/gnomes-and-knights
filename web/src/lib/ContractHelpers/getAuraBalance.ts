import { ethers, keccak256, toUtf8Bytes } from "ethers";
import { walletClient, publicClient } from "../Client";
import { abi } from "../abi/ApeCoin";
import { privateKeyToAccount } from "viem/accounts";
import { apecoincontract, gnomeandknightscontract } from "../const";

export const auraBalance = async (serialNumber: string) => {
  const hash = keccak256(toUtf8Bytes(serialNumber));
  const privateKey = ("0x" + hash.slice(2, 66)) as `0x${string}`;
  console.log(privateKey);
  const account = privateKeyToAccount(privateKey);
  console.log(account);

  const balance = await publicClient.readContract({
    address: apecoincontract,
    abi: abi,
    functionName: "balanceOf",
    account,
    args: [account.address],
  });

  return balance;
};
