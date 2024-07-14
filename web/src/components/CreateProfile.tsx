// import { ethers } from "ethers";
// import { createWalletClient, http } from "viem";
// import { privateKeyToAccount } from "viem/accounts";
// import { baseSepolia } from "viem/chains";
// import { erc20Abi } from "viem";

// export const mintAPE = [
//   {
//     inputs: [{ name: "tokenId", type: "uint32" }],
//     name: "mint",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ] as const;

// export default function Faucet({ address }: { address: string }) {
//   const SendToken = async () => {
//     console.log("Send Token");

//     const account = privateKeyToAccount(
//       process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
//     );

//     const walletClient = createWalletClient({
//       account,
//       chain: baseSepolia,
//       transport: http(),
//     });
//     // const hash = await walletClient.sendTransaction({
//     //   to: address as `0x${string}`,
//     //   value: ethers.parseEther("0.01"),
//     // });
//     // console.log(hash);

//     // console.log("Approve APE");

//     // const approve = await walletClient.writeContract({
//     //   address: "0x5dEaC602762362FE5f135FA5904351916053cF70",
//     //   abi: erc20Abi,
//     //   functionName: "approve",
//     //   args: [account.address, ethers.MaxUint256],
//     // });
//     // console.log(approve);

//     console.log("Miniting APE");

//     const mint = await walletClient.writeContract({
//       address: "0x5dEaC602762362FE5f135FA5904351916053cF70",
//       abi: mintAPE,
//       functionName: "mint",
//       args: [1000], // add address
//     });

//     const createProfile = await walletClient.writeContract({
//       address: "0x5dEaC602762362FE5f135FA5904351916053cF70", // address of  the main contract
//       abi: mintAPE, // change it to its api
//       functionName: "createProfile",
//       args: [1000], // add address
//     });
//   };

//   return (
//     <div>
//       <button onClick={SendToken}>Claim token</button>
//     </div>
//   );
// }

/// TRIALLLL //////

import { ethers } from "ethers";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { Wallet, keccak256, toUtf8Bytes } from "ethers";

export const onBoard = async ({
  setLoggedin,
  setStart,
}: {
  setLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log("Scanning NFC");
  let address = "0x";
  let UserprivateKey = undefined;
  const ndef = new NDEFReader();
  ndef
    .scan()
    .then(() => {
      window.alert("Scanning for NFCs... place your tag on device");
      ndef.onreadingerror = (event) => {
        console.log(
          "Error! Cannot read data from the NFC tag. Try a different one?"
        );
        window.alert(
          "Error! Cannot read data from the NFC tag. Try a different one?"
        );
      };
      ndef.onreading = ({ message, serialNumber }) => {
        const hash = keccak256(toUtf8Bytes(serialNumber));
        const privateKey = "0x" + hash.slice(2, 66);
        UserprivateKey = privateKey;

        privateKeyToAccount(privateKey as any).address;

        window.alert(
          "Scan started successfully." +
            JSON.stringify({
              message,
              serialNumber,
              privateKey,
              publicKey: privateKeyToAccount(privateKey as any).address,
            })
        );

        // Set serial number on localstorage
        localStorage.setItem("serialNumber", serialNumber);

        const wallet = new Wallet(privateKey);

        console.log("WalletAddress: ", wallet.address);
        address = wallet.address;

        console.log(wallet.privateKey);
        localStorage.setItem("publicKey", wallet.address);

        // Call the setter

        setStart(false);
        setLoggedin(true);
      };
    })
    .catch((error) => {
      console.log(`Error! Scan failed to start: ${error}.`);
    });

  // Fund the account with some ETH
  //   const account = privateKeyToAccount(
  //     process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
  //   );

  //   const walletClient = createWalletClient({
  //     account,
  //     chain: baseSepolia,
  //     transport: http(),
  //   });
  //   const hash = await walletClient.sendTransaction({
  //     to: address as `0x${string}`,
  //     value: ethers.parseEther("0.01"),
  //   });
  //   console.log(hash);
};
