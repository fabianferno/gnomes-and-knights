import { walletClient } from "../Client";

export const check = async () =>{
       const checkUser = await walletClient.writeContract({
      address: "0x5dEaC602762362FE5f135FA5904351916053cF70",
      abi: , // add abi
      functionName: "checkUser",
      args: [], // add NFC id
    });

}