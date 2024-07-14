import { keccak256, toUtf8Bytes } from "ethers";
import { walletClient } from "../Client";
import { abi } from "../abi/gnomesandknights";
import { privateKeyToAccount } from "viem/accounts";
import { gnomeandknightscontract } from "../const";

export const updateMatrix = async (
  serialNumber: string,
  matrix: number[][]
) => {
  const hash = keccak256(toUtf8Bytes(serialNumber));
  const privateKey = ("0x" + hash.slice(2, 66)) as `0x${string}`;
  console.log(privateKey);
  const account = privateKeyToAccount(privateKey);
  console.log(account);

  const hash1 = await walletClient.writeContract({
    address: gnomeandknightscontract,
    abi: abi,
    functionName: "editGrid",
    account,
    args: [account.address, matrix],
  });
  return hash1;
};
