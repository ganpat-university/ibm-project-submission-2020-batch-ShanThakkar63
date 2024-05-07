const hre = require("hardhat");

async function main() {
  const InventoryManagementSystem = await hre.ethers.getContractFactory("InventoryManagementSystem");
  const contract = await InventoryManagementSystem.deploy(); //instance of contract

  // Wait for the contract to be deployed
  await contract.waitForDeployment();

  // Access the deployed contract address
  console.log("Address of contract:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
