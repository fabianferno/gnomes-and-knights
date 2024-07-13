import { keccak256, toUtf8Bytes } from "ethers";
import { walletClient } from "../Client";
import { abi } from "../abi/ApeCoin";
import { privateKeyToAccount } from "viem/accounts";
import { apecoincontract, gnomeandknightscontract } from "../const";

export const mintApe = async (serialNumber: string) => {
  const hash = keccak256(toUtf8Bytes(serialNumber));
  const privateKey = ("0x" + hash.slice(2, 66)) as `0x${string}`;
  console.log(privateKey);
  const account = privateKeyToAccount(privateKey);
  console.log(account);

  const hash1 = await walletClient.writeContract({
    address: apecoincontract,
    abi: abi,
    functionName: "mint",
    account,
    args: [account.address, 1000],
  });
  return hash1;
};
