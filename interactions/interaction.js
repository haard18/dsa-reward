const {ethers} =require('ethers') ;
const abi = require('../artifacts/contracts/Token.sol/DSACoin.json');
require('dotenv').config();
const INFURA_API_KEY=process.env.INFURA_API_KEY;
const SEPOLIA_PRIVATE_KEY=process.env.SEPOLIA_PRIVATE_KEY;
console.log(INFURA_API_KEY);
console.log(SEPOLIA_PRIVATE_KEY);
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/' + INFURA_API_KEY);

const wallet= new ethers.Wallet(SEPOLIA_PRIVATE_KEY, provider);
const contractAddress="0x26e4503932593FD638489266aFbE49577f582C05"
const contractABI=abi.abi
const dsacoin = new ethers.Contract(contractAddress, contractABI, wallet);
// Function to airdrop tokens
async function airdropTokens(recipients, amount) {
    const tx = await dsacoin.airdrop(recipients, ethers.parseUnits(amount.toString(), 18));
    await tx.wait();
    console.log("Airdrop completed:", tx.hash);
}
async function mintTokens(to, amount) {
    try {
        const tx = await dsacoin.mint(to, ethers.parseUnits(amount.toString(), 18));
        await tx.wait();
        console.log(`Minted ${amount} tokens to ${to}:`, tx.hash);
    } catch (error) {
        console.error("Minting failed:", error);
    }
}

// Function to burn tokens
async function burnTokens(amount) {
    try {
        const tx = await dsacoin.burn(ethers.parseUnits(amount.toString(), 18));
        await tx.wait();
        console.log(`Burned ${amount} tokens:`, tx.hash);
    } catch (error) {
        console.error("Burning failed:", error);
    }
}

// Function to airdrop tokens
async function airdropTokens(recipients, amount) {
    try {
        const tx = await dsacoin.airdrop(recipients, ethers.parseUnits(amount.toString(), 18));
        await tx.wait();
        console.log("Airdrop completed:", tx.hash);
    } catch (error) {
        console.error("Airdrop failed:", error);
    }
}

// Function to check balance
async function getBalance(address) {
    try {
        const balance = await dsacoin.balanceOf(address);
        console.log(`Balance of ${address}: ${ethers.formatUnits(balance, 18)} DSA`);
    } catch (error) {
        console.error("Fetching balance failed:", error);
    }
}

// Example usage
(async () => {
    const recipient = "0x560B5Dc6d0D2d87da46Ec44b1be0A8D6A83b503A"; // Replace with a valid address
    const recipients = [recipient];
    const amount = 1; // 1 token

    console.log("\n--- Minting ---");
    await mintTokens(recipient, amount);

    console.log("\n--- Checking Balance ---");
    await getBalance(recipient);

    console.log("\n--- Burning ---");
    await burnTokens(amount);

    console.log("\n--- Airdropping ---");
    await airdropTokens(recipients, amount);

    console.log("\n--- Final Balance ---");
    await getBalance(recipient);
})();