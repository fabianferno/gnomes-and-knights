import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet ,baseSepolia} from 'viem/chains'
 
export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http()
})
const account = privateKeyToAccount(
      process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
);
