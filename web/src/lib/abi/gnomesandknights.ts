export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        internalType: "string",
        name: "_nfc",
        type: "string",
      },
    ],
    name: "createProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_apecoin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "nfc",
        type: "string",
      },
    ],
    name: "CreateProfile",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player2",
        type: "address",
      },
    ],
    name: "duel",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player2",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "Duel",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "euint8[4][4]",
        name: "grid",
        type: "uint256[4][4]",
      },
    ],
    name: "editGrid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "heal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "heals",
        type: "uint16",
      },
    ],
    name: "PlayerHealed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "heals",
        type: "uint16",
      },
    ],
    name: "transferHeals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "euint8[4][4]",
        name: "grid",
        type: "uint256[4][4]",
      },
    ],
    name: "UpdateGrid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "hits",
        type: "uint16",
      },
    ],
    name: "UpdateHits",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "nfc",
        type: "string",
      },
    ],
    name: "UpdateProfile",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "euint8[4][4]",
        name: "a",
        type: "uint256[4][4]",
      },
      {
        internalType: "euint8[4][4]",
        name: "b",
        type: "uint256[4][4]",
      },
    ],
    name: "addTwoMatrices",
    outputs: [
      {
        internalType: "euint8[4][4]",
        name: "",
        type: "uint256[4][4]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "apecoin",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BOARD_SIZE",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "hits",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "heals",
        type: "uint16",
      },
      {
        internalType: "bool",
        name: "isGnome",
        type: "bool",
      },
      {
        internalType: "string",
        name: "nfc",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "random",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "euint8[4][4]",
        name: "matrix",
        type: "uint256[4][4]",
      },
    ],
    name: "sumOfAllElementsInAMatrix",
    outputs: [
      {
        internalType: "euint8",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];
