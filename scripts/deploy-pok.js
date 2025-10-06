const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting PoK contract deployment...");

  // Get the contract factory
  const PoK = await ethers.getContractFactory("PoK");
  
  // Deploy the contract
  console.log("📝 Deploying PoK contract...");
  const pok = await PoK.deploy("0x0000000000000000000000000000000000000000"); // Placeholder for $DeRi token address
  
  await pok.deployed();
  
  console.log("✅ PoK contract deployed successfully!");
  console.log("📍 Contract address:", pok.address);
  console.log("🔗 Transaction hash:", pok.deployTransaction.hash);
  
  // Verify the deployment
  console.log("🔍 Verifying deployment...");
  const owner = await pok.owner();
  console.log("👤 Contract owner:", owner);
  
  // Save deployment info
  const deploymentInfo = {
    contractName: "PoK",
    contractAddress: pok.address,
    transactionHash: pok.deployTransaction.hash,
    blockNumber: pok.deployTransaction.blockNumber,
    network: network.name,
    timestamp: new Date().toISOString()
  };
  
  const fs = require('fs');
  const path = require('path');
  
  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  // Save deployment info
  const deploymentFile = path.join(deploymentsDir, `pok-${network.name}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  
  console.log("💾 Deployment info saved to:", deploymentFile);
  
  // Instructions for next steps
  console.log("\n🎯 Next Steps:");
  console.log("1. Update the $DeRi token address in the contract");
  console.log("2. Verify the contract on Etherscan (if on mainnet/testnet)");
  console.log("3. Update your frontend with the contract address");
  console.log("4. Initialize the contract with verified lessons");
  
  return pok;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
