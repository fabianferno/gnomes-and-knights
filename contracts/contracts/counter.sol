// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";
import {Permissioned, Permission} from "@fhenixprotocol/contracts/access/Permissioned.sol";

contract GnomesAndKnights is Permissioned {
  euint32 private counter;
  address public owner;

  // TODO: Struct to store all the players and their grids
  struct Player {
    address player;
    uint[4][4] grid;
  }

  constructor() {
    owner = msg.sender;
  }

  function createProfile(address player) public {
    // TODO: create a profile
    // TODO: add the player to the list of players
    // TODO: Call randomness function on Pyth
    // TODO: Assign the player to Gnome or Knight
  }

  function duel(address player1, address player2) public {
    // TODO: Check if both players are in the list of players
    // TODO: Get player grids and do vector product
  }

  function heal(address player) public {}

  function add(inEuint32 calldata encryptedValue) public {
    euint32 value = FHE.asEuint32(encryptedValue);
    counter = counter + value;
  }

  function getCounter() public view returns (uint256) {
    return FHE.decrypt(counter);
  }

  function getCounterPermit(
    Permission memory permission
  ) public view onlySender(permission) returns (uint256) {
    return FHE.decrypt(counter);
  }

  function getCounterPermitSealed(
    Permission memory permission
  ) public view onlySender(permission) returns (string memory) {
    return FHE.sealoutput(counter, permission.publicKey);
  }

  function mat3Mult(
    uint[4][4] calldata mat1,
    uint[4][4] calldata mat2
  ) private returns (uint[4][4] memory) {
    // multiplies 3x3 matrix with 3x3 matrix
    uint r1 = mat1.length; // rows of mat1
    uint c1 = mat1[0].length; // columns of mat1
    uint c2 = mat2[0].length; // columns of mat2

    uint[4][4] memory result;

    for (uint i = 0; i < r1; ++i) {
      for (uint j = 0; j < c2; ++j) {
        for (uint k = 0; k < c1; ++k) {
          result[i][j] += mat1[i][k] * mat2[k][j];
        }
      }
    }

    return (result);
  }
}
