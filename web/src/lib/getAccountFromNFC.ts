import { keccak256, toUtf8Bytes } from "ethers";
import { privateKeyToAccount } from "viem/accounts";

export default function getAccountFromNFC(uuid: string) {
  const hash = keccak256(toUtf8Bytes(uuid));
  const privateKey = "0x" + hash.slice(2, 66);
  const account = privateKeyToAccount(privateKey as any);
  return account;
}
