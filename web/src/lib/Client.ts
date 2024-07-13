// import { createPublicClient, createWalletClient, custom, http } from 'viem'
// import { privateKeyToAccount } from 'viem/accounts'
// import { mainnet ,baseSepolia} from 'viem/chains'
 

// const account = privateKeyToAccount(
//       process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
// );

import { http, createPublicClient, defineChain, createWalletClient } from 'viem'


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
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.testnet.inco.org" },
  },
});

 
export const publicClient = createPublicClient({
  chain: inco,
  transport: http(),
})

export const walletClient = createWalletClient({
  chain: inco,
  transport: http()
})