// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DSACoin is ERC20, Ownable {
    constructor(
        uint256 initialSupply
    ) ERC20("DSA Coin", "DSA") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    // Mint new tokens - only owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Burn tokens - anyone can burn their tokens
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    // Airdrop tokens to multiple addresses
    function airdrop(
        address[] calldata recipients,
        uint256 amount
    ) public onlyOwner {
        for (uint256 i = 0; i < recipients.length; i++) {
            _transfer(msg.sender, recipients[i], amount);
        }
    }

    function getBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }
}
