import { ethers } from "ethers";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { erc20Abi } from "viem";

export const mintAPE = [
  {
    inputs: [{ name: "tokenId", type: "uint32" }],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function Faucet({ address }: { address: string }) {
  const SendToken = async () => {
    console.log("Send Token");

    const account = privateKeyToAccount(
      process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
    );

    const walletClient = createWalletClient({
      account,
      chain: baseSepolia,
      transport: http(),
    });
    // const hash = await walletClient.sendTransaction({
    //   to: address as `0x${string}`,
    //   value: ethers.parseEther("0.01"),
    // });
    // console.log(hash);

    // console.log("Approve APE");

    // const approve = await walletClient.writeContract({
    //   address: "0x5dEaC602762362FE5f135FA5904351916053cF70",
    //   abi: erc20Abi,
    //   functionName: "approve",
    //   args: [account.address, ethers.MaxUint256],
    // });
    // console.log(approve);

    console.log("Miniting APE");

    const mint = await walletClient.writeContract({
      address: "0x5dEaC602762362FE5f135FA5904351916053cF70",
      abi: mintAPE,
      functionName: "mint",
      args: [1000], // add address
    });

    const createProfile = await walletClient.writeContract({
      address: "0x5dEaC602762362FE5f135FA5904351916053cF70", // address of  the main contract
      abi: mintAPE, // change it to its api
      functionName: "createProfile",
      args: [1000], // add address
    });
  };

  return (
    <div>
      <button onClick={SendToken}>Claim token</button>
    </div>
  );
}
