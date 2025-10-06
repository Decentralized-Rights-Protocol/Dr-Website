const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting DeRiTestToken deployment to testnet...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy DeRiTestToken
  console.log("\n📦 Deploying DeRiTestToken...");
  const DeRiTestToken = await ethers.getContractFactory("DeRiTestToken");
  const deriToken = await DeRiTestToken.deploy();
  await deriToken.deployed();

  console.log("✅ DeRiTestToken deployed to:", deriToken.address);

  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log("Network:", network.name, "Chain ID:", network.chainId);

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const name = await deriToken.name();
  const symbol = await deriToken.symbol();
  const totalSupply = await deriToken.totalSupply();
  const owner = await deriToken.owner();

  console.log("Token Name:", name);
  console.log("Token Symbol:", symbol);
  console.log("Total Supply:", ethers.utils.formatEther(totalSupply), "tokens");
  console.log("Owner:", owner);

  // Check reward rates
  console.log("\n💰 Reward Rates:");
  const activities = [
    "lesson_completion",
    "quiz_perfect", 
    "achievement_unlock",
    "level_completion",
    "streak_bonus"
  ];

  for (const activity of activities) {
    const rate = await deriToken.rewardRates(activity);
    console.log(`${activity}: ${ethers.utils.formatEther(rate)} tokens`);
  }

  // Check daily limits
  console.log("\n📊 Daily Limits:");
  const dailyCap = await deriToken.rewardCap();
  const maxPerTx = await deriToken.MAX_REWARD_PER_TX();
  console.log("Daily Reward Cap:", ethers.utils.formatEther(dailyCap), "tokens");
  console.log("Max Reward Per Transaction:", ethers.utils.formatEther(maxPerTx), "tokens");

  // Save deployment info
  const deploymentInfo = {
    network: {
      name: network.name,
      chainId: network.chainId.toString(),
      rpcUrl: process.env.RPC_URL || "Not set"
    },
    contract: {
      address: deriToken.address,
      name: name,
      symbol: symbol,
      totalSupply: totalSupply.toString(),
      owner: owner
    },
    deployment: {
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      blockNumber: await ethers.provider.getBlockNumber()
    },
    rewardRates: {},
    limits: {
      dailyCap: dailyCap.toString(),
      maxPerTx: maxPerTx.toString()
    }
  };

  // Get all reward rates
  for (const activity of activities) {
    const rate = await deriToken.rewardRates(activity);
    deploymentInfo.rewardRates[activity] = rate.toString();
  }

  // Save to file
  const outputDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, `deri-testnet-${network.chainId}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(deploymentInfo, null, 2));

  console.log(`\n💾 Deployment info saved to: ${outputFile}`);

  // Create environment file template
  const envTemplate = `# DeRiTestToken Deployment Configuration
# Generated on ${new Date().toISOString()}

# Network Configuration
RPC_URL=${process.env.RPC_URL || "https://sepolia.infura.io/v3/YOUR_INFURA_KEY"}
CHAIN_ID=${network.chainId}
NETWORK_NAME=${network.name}

# Contract Configuration
DERI_CONTRACT_ADDRESS=${deriToken.address}

# Wallet Configuration (SECURE: Use environment variables in production)
SIGNER_PRIVATE_KEY=your_signer_private_key_here
SIGNER_ADDRESS=${deployer.address}

# ScyllaDB Configuration
SCYLLA_HOSTS=localhost
SCYLLA_USERNAME=
SCYLLA_PASSWORD=
SCYLLA_SSL=false
SCYLLA_SSL_CERT=

# Learn API Configuration
LEARN_API_URL=http://localhost:8001
LEARN_DB_PATH=learn_progress.db

# Security Notes:
# 1. Never commit private keys to version control
# 2. Use environment variables for sensitive data
# 3. Consider using a hardware wallet for production
# 4. Implement proper key rotation policies
# 5. Use a dedicated reward distribution wallet
`;

  const envFile = path.join(outputDir, `.env.${network.chainId}.template`);
  fs.writeFileSync(envFile, envTemplate);

  console.log(`📝 Environment template saved to: ${envFile}`);

  // Display next steps
  console.log("\n🎯 Next Steps:");
  console.log("1. Copy the environment template and fill in your values");
  console.log("2. Set up your signer wallet with testnet tokens");
  console.log("3. Configure ScyllaDB connection");
  console.log("4. Start the FastAPI backend");
  console.log("5. Test the reward system");

  console.log("\n🔗 Contract Verification:");
  console.log("To verify the contract on Etherscan, run:");
  console.log(`npx hardhat verify --network ${network.name} ${deriToken.address}`);

  console.log("\n✅ Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
