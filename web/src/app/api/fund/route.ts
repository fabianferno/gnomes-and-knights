// export const dynamic = "force-dynamic"; // defaults to auto
import { NextResponse } from "next/server";
import { ethers } from "ethers";

const fundWalletIfEmpty = async (wallet: string, chain: string = "inco") => {
  const provider = new ethers.JsonRpcProvider(
    chain === "inco"
      ? "https://testnet.inco.org"
      : "https://api.helium.fhenix.zone"
  );
  const balance = await provider.getBalance(wallet);
  if (balance === BigInt(0)) {
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);
    const tx = await signer.sendTransaction({
      to: wallet,
      value: ethers.parseEther("0.01"),
    });
    const txs = await tx.wait();
    console.log("Funded wallet", wallet);

    return txs;
  }
};

export async function POST(request: Request) {
  const req = await request.json();
  const { wallet, chain } = req;

  try {
    await fundWalletIfEmpty(wallet, chain);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ funded: false });
  }

  return NextResponse.json({ funded: true });
}
