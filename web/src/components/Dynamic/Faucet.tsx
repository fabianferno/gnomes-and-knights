import { ethers } from "ethers";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { defineChain } from "viem";

export const inco = defineChain({
  id: 9090,
  name: "Inco Gentry Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "INCO",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.inco.org"],
      // webSocket: ["wss://testnet.inco.org"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.testnet.inco.org" },
  },
});

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
    const hash = await walletClient.sendTransaction({
      to: address as `0x${string}`,
      value: ethers.parseEther("0.01"),
    });

    console.log(hash);
  };

  return (
    <div>
      <button onClick={SendToken}>Claim token</button>
    </div>
  );
}

export const approveApe = async () => {};
