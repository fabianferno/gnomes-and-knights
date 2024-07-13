"use client";
import { privateKeyToAccount } from "viem/accounts";
import { keccak256, toUtf8Bytes } from "ethers";
const ScanId = async ({
  setOpponentaddress,
}: {
  setOpponentaddress: React.Dispatch<React.SetStateAction<string>>;
}) => {
  console.log("Scanning NFC");
  let address = "0x";
  let UserprivateKey = undefined;
  const ndef = new NDEFReader();
  ndef.scan().then(() => {
    console.log("Scan started successfully.");
    window.alert("Scan started successfully.");
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

      setOpponentaddress(privateKeyToAccount(privateKey as any).address);
    };
  });
};

export default ScanId;
