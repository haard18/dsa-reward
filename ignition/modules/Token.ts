import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const INITIAL_SUPPLY = BigInt(1_000_000 * 10 ** 18); // 1,000,000 tokens with 18 decimals

const TokenModule = buildModule("TokenModule", (m) => {
  // Parameter for the initial token supply
  const initialSupply = m.getParameter("initialSupply", INITIAL_SUPPLY);

  // Deploy the DSACoin contract with the specified initial supply
  const dsacoin = m.contract("DSACoin", [initialSupply]);

  return { dsacoin };
});

export default TokenModule;
