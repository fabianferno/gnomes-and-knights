import React from "react";

function Toast({ hash }: { hash: string }) {
  const baselink = "https://explorer.testnet.inco.org/address/";
  return (
    <div
      id="toast-bottom-right"
      className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5"
    >
      <a href={`${baselink}${hash}`} target="_blank">
        <div className=" text-md">
          <p>New Transaction</p>
          <p>{hash}</p>
        </div>
      </a>
    </div>
  );
}

export default Toast;
