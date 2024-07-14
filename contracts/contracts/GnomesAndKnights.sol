// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity >=0.8.13 <0.9.0;

import "fhevm@v0.3.0/lib/TFHE.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function mint(address to, uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract GnomesAndKnights {
    address public owner;
    uint256 constant BIAS = 2 ** 127;
    IERC20 public apecoin;

    uint8 public constant BOARD_SIZE = 4; // max size is 5
    // TODO: Add mappings
    mapping(address => Player) public players;
    uint256 gnomesCount;
    uint256 knightsCount;

    struct Player {
        address player;
        uint16 hits;
        uint16 heals;
        bool isGnome;
        string nfc;
        bytes32 random;
        euint8[BOARD_SIZE][BOARD_SIZE] grid;
    }

    // TODO: Define events
    event Duel(address player1, address player2, address winner);
    event CreateProfile(address player, string nfc);
    event UpdateProfile(address player, string nfc);
    event UpdateGrid(address player, euint8[BOARD_SIZE][BOARD_SIZE] grid);
    event UpdateHits(address player, uint16 hits);
    event PlayerHealed(address player, uint16 heals);

    modifier onlyPlayers(address player) {
        require(players[msg.sender].player != address(0), "Player does not exist");
        require(players[player].player != address(0), "Player does not exist");
        _;
    }

    constructor(address _apecoin) {
        owner = msg.sender;
        apecoin = IERC20(_apecoin);
    }

    function createProfile(address _player, string calldata _nfc) public {
        require(_player != address(0), "Not a valid address");

        // create a profile
        Player memory newPlayer;
        newPlayer.player = _player;
        newPlayer.hits = 5;
        newPlayer.heals = 2;
        newPlayer.nfc = _nfc;

        // Get a randomness blockhash
        bytes32 _random = blockhash(block.number);
        newPlayer.random = _random;

        // Assign the player to Gnome or Knight based on the equivalent number of gnomes and knights
        if (gnomesCount <= knightsCount) {
            newPlayer.isGnome = true;
            gnomesCount++;
        } else {
            newPlayer.isGnome = false;
            knightsCount++;
        }

        // transfer apecoin to the contract from the player
        apecoin.transferFrom(_player, address(this), 1000);

        // emit the event
        emit CreateProfile(_player, _nfc);

        // Generate grid of random numbers for the player with each cell containg a random number between 0 and 12
        for (uint8 i = 1; i < BOARD_SIZE; i++) {
            for (uint8 j = 0; j < BOARD_SIZE; j++) {
                newPlayer.grid[i][j] = TFHE.asEuint8(uint8(_random[i + j]) % 17);
            }
        }
        newPlayer.grid[0][0] = TFHE.asEuint8(0);
        newPlayer.grid[0][1] = TFHE.asEuint8(0);
        newPlayer.grid[0][2] = TFHE.asEuint8(0);
        newPlayer.grid[0][3] = TFHE.asEuint8(0);

        // add the player to the list of players
        players[_player] = newPlayer;
    }

    // Connect with team mate and heal
    function heal(address player) public onlyPlayers(player) {
        // Get the player
        Player storage p = players[player];

        // Check if the player has any heals left
        require(p.heals > 0, "Player does not have any heals left");

        // Update the player's heals
        p.heals++;

        // Update the player
        players[player] = p;
        emit PlayerHealed(player, p.heals);
    }

    function duel(address player2) public returns (address) {
        // Get players
        Player storage p1 = players[msg.sender];
        Player storage p2 = players[player2];

        // Add two matrices
        euint8[BOARD_SIZE][BOARD_SIZE] memory result = addTwoMatrices(p1.grid, p2.grid);

        // Find sum of all elements in a matrix
        euint8 sum = sumOfAllElementsInAMatrix(result);

        // Decrypt the sum
        uint8 _sum = TFHE.decrypt(sum);

        // Convert the sum back to a signed integer
        int256 sumInt = unbias(_sum);

        // Check if the sum is greater than 0
        if (sumInt > 0) {
            // Player 1 wins
            p1.hits++;
            p2.hits--;

            // Transfer aura from player 2 to player 1
            apecoin.transferFrom(player2, msg.sender, 100);
        } else {
            // Player 2 wins
            p2.hits++;
            p1.hits--;

            // Transfer aura from player 1 to player 2
            apecoin.transferFrom(msg.sender, player2, 100);
        }

        // Update the states
        p1.heals--;
        p2.heals--;

        players[msg.sender] = p1;
        players[player2] = p2;

        // Emit the event
        emit Duel(msg.sender, player2, sumInt > 0 ? msg.sender : player2);

        // Update the hits
        emit UpdateHits(msg.sender, p1.hits);
        return sumInt > 0 ? msg.sender : player2;
    }

    // Edit the player grid
    function editGrid(address player, euint8[BOARD_SIZE][BOARD_SIZE] memory grid) public onlyPlayers(player) {
        // Get the player
        Player storage p = players[player];

        // Update the player's grid
        p.grid = grid;

        // Update the player
        players[player] = p;

        // Emit the event
        emit UpdateGrid(player, grid);
    }

    // Transfer heals within the team
    function transferHeals(address player, uint16 heals) public onlyPlayers(player) {
        // Get the player
        Player storage p = players[player];

        // Check if the player has enough heals
        require(p.heals >= heals, "Player does not have enough heals");

        // Update the player's heals
        p.heals -= heals;

        // Update the player
        players[player] = p;
    }

    function sumOfAllElementsInAMatrix(euint8[BOARD_SIZE][BOARD_SIZE] memory matrix) public pure returns (euint8) {
        // Find sum of all elements in a matrix
        euint8 sum = TFHE.asEuint8(0);
        for (uint8 i = 0; i < BOARD_SIZE; i++) {
            for (uint8 j = 0; j < BOARD_SIZE; j++) {
                sum = TFHE.add(sum, matrix[i][j]);
            }
        }

        return sum;
    }

    function addTwoMatrices(
        euint8[BOARD_SIZE][BOARD_SIZE] memory a,
        euint8[BOARD_SIZE][BOARD_SIZE] memory b
    ) public pure returns (euint8[BOARD_SIZE][BOARD_SIZE] memory) {
        euint8[BOARD_SIZE][BOARD_SIZE] memory result;
        for (uint8 i = 0; i < BOARD_SIZE; i++) {
            for (uint8 j = 0; j < BOARD_SIZE; j++) {
                result[i][j] = TFHE.add(a[i][j], b[i][j]);
            }
        }
        return result;
    }

    function bias(int256 value) internal pure returns (uint256) {
        return value >= 0 ? uint256(value) + BIAS : uint256(int256(value) + int256(BIAS));
    }

    function unbias(uint256 value) internal pure returns (int256) {
        return value >= BIAS ? int256(value - BIAS) : int256(int256(value) - int256(BIAS));
    }
}
