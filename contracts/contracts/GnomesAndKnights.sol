// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "./IERC20.sol";

contract GnomesAndKnights {
  address public owner;
  uint256 constant BIAS = 2 ** 127;

  // TODO: Add mappings
  mapping(address => Player) public players;
  uint256 gnomesCount;
  uint256 knightsCount;

  // TODO: Struct to store all the players and their grids
  struct Player {
    address player;
    uint[4][4] battlegrid;
    uint16 hits;
    uint16 heals;
    uint128 aura;
    bool isGnome;
  }

  constructor() {
    owner = msg.sender;
  }

  function createProfile(address player) public {
    // TODO: create a profile
    Player memory newPlayer;
    newPlayer.player = player;
    // TODO: Call randomness function on Pyth to set the grid
    newPlayer.battlegrid = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    newPlayer.hits = 5;
    newPlayer.heals = 2;
    newPlayer.aura = 1000;

    // TODO: add the player to the list of players
    players[player] = newPlayer;

    // TODO: Assign the player to Gnome or Knight based on the equivalent number of gnomes and knights
    if (gnomesCount <= knightsCount) {
      newPlayer.isGnome = true;
      gnomesCount++;
    } else {
      newPlayer.isGnome = false;
      knightsCount++;
    }
  }

  function duel(address player1, address player2) public {
    // TODO: Check if both players are in the list of players
    require(players[player1].player != address(0), "Player 1 does not exist");
    require(players[player2].player != address(0), "Player 2 does not exist");

    // TODO: Get player grids and do vector product
    uint[4][4] memory grid1 = players[player1].battlegrid;
    uint[4][4] memory grid2 = players[player2].battlegrid;

    uint[4][4] memory result = mat4Mult(grid1, grid2);

    // If matrix product is positive, player 1 wins
  }

  function heal(address player) public {}

  // Function to apply the bias to a signed integer
  function bias(int256 value) internal pure returns (uint256) {
    return value >= 0 ? uint256(value) + BIAS : uint256(value + int256(BIAS));
  }

  // Function to remove the bias from a biased value
  function unbias(uint256 value) internal pure returns (int256) {
    return value >= BIAS ? int256(value - BIAS) : int256(value) - int256(BIAS);
  }

  function mat4Mult(
    uint[4][4] calldata mat1,
    uint[4][4] calldata mat2
  ) private pure returns (uint[4][4] memory) {
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
