
import { ethers } from 'ethers'
import { publicClient } from './Client';


export const getBalance = async ( address : `0x${string}`) => {
const balance = await publicClient.getBalance({ 
  address: address,

})
return ethers.formatUnits(balance.toString());
}


