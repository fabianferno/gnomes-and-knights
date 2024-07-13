import { Wallet, keccak256, toUtf8Bytes } from "ethers";

const creatingAccountUsingNFC = () => {
  const ndef = new NDEFReader();
  ndef
    .scan()
    .then(() => {
      console.log("Scan started successfully.");
      // window.alert("Scan started successfully.");
      ndef.onreadingerror = (event) => {
        console.log(
          "Error! Cannot read data from the NFC tag. Try a different one?"
        );
        window.alert(
          "Error! Cannot read data from the NFC tag. Try a different one?"
        );
      };
      ndef.onreading = ({ message, serialNumber }) => {
        window.alert(
          "Scan started successfully." +
            JSON.stringify({ message, serialNumber })
        );
        const hash = keccak256(toUtf8Bytes(serialNumber));
        const privateKey = "0x" + hash.slice(2, 66);

        const wallet = new Wallet(privateKey);

        console.log("WalletAddress: ", wallet.address);
        console.log(wallet.privateKey);
        // console.log(serialNumber);
        // console.log("NDEF message read.");
        // console.log(false);
      };
    })
    .catch((error) => {
      console.log(`Error! Scan failed to start: ${error}.`);
    });
};


export default function DynamicLogin() {
    return (
        <div>
            <button onClick={creatingAccountUsingNFC}>Scan NFC</button>
        </div>
    )

}