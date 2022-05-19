// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const {
  abi,
  bytecode,
} = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const contractName = "UniswapV3Factory";
  const ContractFactory = await hre.ethers.getContractFactory(abi, bytecode);
  const contract = await ContractFactory.deploy();
  console.log("🚀 ~ file: deploy.js ~ line 19 ~ main ~ ndc", contract);

  await contract.deployed();

  console.log(`${contractName} deployed to:`, contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
