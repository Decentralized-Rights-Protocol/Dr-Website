# DRP Learn-to-Earn: Testnet to Mainnet Migration Guide

## Overview

This document outlines the process for migrating the DRP Learn-to-Earn system from testnet to mainnet, including smart contract deployment, user data migration, and system configuration updates.

## Table of Contents

1. [Pre-Migration Checklist](#pre-migration-checklist)
2. [Smart Contract Migration](#smart-contract-migration)
3. [User Data Migration](#user-data-migration)
4. [System Configuration](#system-configuration)
5. [Security Considerations](#security-considerations)
6. [Testing & Validation](#testing--validation)
7. [Go-Live Process](#go-live-process)
8. [Post-Migration Tasks](#post-migration-tasks)

## Pre-Migration Checklist

### Smart Contract Preparation
- [ ] Audit DeRiTestToken contract for mainnet deployment
- [ ] Update contract parameters (supply, reward rates, limits)
- [ ] Prepare mainnet DeRiToken contract (remove "Test" suffix)
- [ ] Set up mainnet deployment scripts
- [ ] Configure gas optimization for mainnet

### Infrastructure Preparation
- [ ] Set up mainnet RPC endpoints
- [ ] Configure mainnet wallet with sufficient ETH for gas
- [ ] Set up monitoring and alerting for mainnet
- [ ] Prepare backup and disaster recovery procedures
- [ ] Configure SSL certificates for production domains

### Data Preparation
- [ ] Export all testnet user data from ScyllaDB
- [ ] Validate data integrity and completeness
- [ ] Prepare user migration scripts
- [ ] Set up data backup procedures
- [ ] Plan for data rollback if needed

## Smart Contract Migration

### 1. Deploy Mainnet Contract

```bash
# Set mainnet environment variables
export RPC_URL="https://mainnet.infura.io/v3/YOUR_INFURA_KEY"
export CHAIN_ID="1"
export NETWORK_NAME="mainnet"

# Deploy to mainnet
npx hardhat run scripts/deploy-deri-mainnet.js --network mainnet
```

### 2. Contract Configuration

Update the mainnet contract with production parameters:

```solidity
// Mainnet DeRiToken.sol
contract DeRiToken is ERC20, Ownable, ReentrancyGuard, Pausable {
    // Production supply: 1 billion tokens
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10**18;
    
    // Production reward rates (higher than testnet)
    uint256 public constant LESSON_COMPLETION = 50 * 10**18;  // 50 tokens
    uint256 public constant QUIZ_PERFECT = 25 * 10**18;      // 25 tokens
    uint256 public constant ACHIEVEMENT_UNLOCK = 100 * 10**18; // 100 tokens
    uint256 public constant LEVEL_COMPLETION = 200 * 10**18;  // 200 tokens
    uint256 public constant STREAK_BONUS = 75 * 10**18;      // 75 tokens
    
    // Production daily limits
    uint256 public constant DAILY_REWARD_CAP = 100_000 * 10**18; // 100K tokens
    uint256 public constant MAX_REWARD_PER_TX = 5_000 * 10**18;  // 5K tokens
}
```

### 3. Contract Verification

```bash
# Verify contract on Etherscan
npx hardhat verify --network mainnet <CONTRACT_ADDRESS>

# Verify contract on other block explorers if needed
```

## User Data Migration

### 1. Export Testnet Data

```python
# Export user progress and rewards from testnet
from scylladb_integration import ScyllaDBManager

def export_testnet_data():
    db = ScyllaDBManager()
    
    # Export user stats
    user_stats = db.session.execute("SELECT * FROM user_stats")
    
    # Export reward logs
    reward_logs = db.session.execute("SELECT * FROM reward_logs")
    
    # Export achievements
    achievements = db.session.execute("SELECT * FROM achievements")
    
    # Save to JSON files
    with open('testnet_user_stats.json', 'w') as f:
        json.dump([dict(row) for row in user_stats], f, default=str)
    
    with open('testnet_reward_logs.json', 'w') as f:
        json.dump([dict(row) for row in reward_logs], f, default=str)
    
    with open('testnet_achievements.json', 'w') as f:
        json.dump([dict(row) for row in achievements], f, default=str)

export_testnet_data()
```

### 2. Migrate User Data

```python
def migrate_user_data():
    # Load testnet data
    with open('testnet_user_stats.json', 'r') as f:
        testnet_stats = json.load(f)
    
    # Connect to mainnet database
    mainnet_db = ScyllaDBManager(mainnet_config)
    
    # Migrate user statistics
    for user_stat in testnet_stats:
        # Convert testnet rewards to mainnet equivalent
        mainnet_rewards = convert_rewards_to_mainnet(user_stat['total_rewards_earned'])
        
        # Insert into mainnet database
        mainnet_db.session.execute("""
            INSERT INTO user_stats (
                user_id, wallet_address, total_lessons_completed,
                total_score, total_time_spent, total_rewards_earned,
                current_streak, longest_streak, last_activity,
                achievements, level_progress, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            user_stat['user_id'],
            user_stat['wallet_address'],
            user_stat['total_lessons_completed'],
            user_stat['total_score'],
            user_stat['total_time_spent'],
            mainnet_rewards,
            user_stat['current_streak'],
            user_stat['longest_streak'],
            user_stat['last_activity'],
            user_stat['achievements'],
            user_stat['level_progress'],
            datetime.now()
        ))

def convert_rewards_to_mainnet(testnet_rewards):
    """Convert testnet rewards to mainnet equivalent"""
    # Example: 1 testnet token = 0.1 mainnet token
    conversion_rate = 0.1
    return int(testnet_rewards * conversion_rate)
```

### 3. Airdrop Mainnet Tokens

```python
def airdrop_mainnet_tokens():
    """Airdrop mainnet tokens to users based on testnet activity"""
    
    # Load user data
    with open('testnet_user_stats.json', 'r') as f:
        user_stats = json.load(f)
    
    # Connect to mainnet contract
    mainnet_contract = get_mainnet_contract()
    
    # Airdrop tokens to each user
    for user_stat in user_stats:
        wallet_address = user_stat['wallet_address']
        testnet_rewards = user_stat['total_rewards_earned']
        mainnet_rewards = convert_rewards_to_mainnet(testnet_rewards)
        
        # Send airdrop transaction
        tx = mainnet_contract.functions.distributeReward(
            wallet_address,
            mainnet_rewards,
            "testnet_migration_airdrop"
        )
        
        # Wait for transaction confirmation
        receipt = tx.wait()
        print(f"Airdropped {mainnet_rewards} tokens to {wallet_address}")
```

## System Configuration

### 1. Environment Variables

Update production environment variables:

```bash
# Production Environment (.env.production)
RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
CHAIN_ID=1
NETWORK_NAME=mainnet

# Mainnet Contract
DERI_CONTRACT_ADDRESS=0x...  # Mainnet contract address

# Production Wallet (use hardware wallet or secure key management)
SIGNER_PRIVATE_KEY=your_secure_private_key
SIGNER_ADDRESS=0x...

# Production ScyllaDB
SCYLLA_HOSTS=prod-scylla-1,prod-scylla-2,prod-scylla-3
SCYLLA_USERNAME=prod_user
SCYLLA_PASSWORD=secure_password
SCYLLA_SSL=true
SCYLLA_SSL_CERT=/path/to/cert.pem

# Production API
LEARN_API_URL=https://api.drp-protocol.org
LEARN_DB_PATH=/var/lib/drp/learn_progress.db
```

### 2. Update Frontend Configuration

```typescript
// config/production.ts
export const config = {
  network: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
    explorerUrl: 'https://etherscan.io'
  },
  contract: {
    address: '0x...', // Mainnet contract address
    abi: [...], // Mainnet contract ABI
  },
  api: {
    baseUrl: 'https://api.drp-protocol.org',
    timeout: 30000
  }
};
```

### 3. Update Backend Configuration

```python
# config/production.py
class ProductionConfig:
    # Network configuration
    NETWORK_NAME = "mainnet"
    RPC_URL = "https://mainnet.infura.io/v3/YOUR_INFURA_KEY"
    CHAIN_ID = 1
    
    # Contract configuration
    CONTRACT_ADDRESS = "0x..."  # Mainnet contract address
    
    # Security configuration
    SIGNER_PRIVATE_KEY = os.getenv("SIGNER_PRIVATE_KEY")
    SIGNER_ADDRESS = os.getenv("SIGNER_ADDRESS")
    
    # Database configuration
    SCYLLA_HOSTS = ["prod-scylla-1", "prod-scylla-2", "prod-scylla-3"]
    SCYLLA_USERNAME = os.getenv("SCYLLA_USERNAME")
    SCYLLA_PASSWORD = os.getenv("SCYLLA_PASSWORD")
    SCYLLA_SSL = True
    
    # API configuration
    API_BASE_URL = "https://api.drp-protocol.org"
    CORS_ORIGINS = ["https://drp-protocol.org", "https://learn.drp-protocol.org"]
```

## Security Considerations

### 1. Private Key Management

- **Hardware Wallets**: Use hardware wallets for production signer accounts
- **Key Rotation**: Implement regular key rotation policies
- **Multi-Sig**: Consider multi-signature wallets for critical operations
- **HSM**: Use Hardware Security Modules for enterprise deployments

### 2. Access Control

```solidity
// Implement role-based access control
contract DeRiToken is ERC20, AccessControl {
    bytes32 public constant REWARD_DISTRIBUTOR = keccak256("REWARD_DISTRIBUTOR");
    bytes32 public constant ADMIN = keccak256("ADMIN");
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN, msg.sender);
    }
    
    function distributeReward(address recipient, uint256 amount, string memory reason) 
        external onlyRole(REWARD_DISTRIBUTOR) {
        // Reward distribution logic
    }
}
```

### 3. Rate Limiting

```python
# Implement rate limiting for API endpoints
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/reward")
@limiter.limit("10/minute")  # 10 requests per minute per IP
async def distribute_reward(request: Request, ...):
    # Reward distribution logic
```

### 4. Monitoring & Alerting

```python
# Set up monitoring for critical operations
import logging
from prometheus_client import Counter, Histogram, Gauge

# Metrics
reward_distribution_counter = Counter('reward_distributions_total', 'Total reward distributions')
reward_amount_histogram = Histogram('reward_amount_wei', 'Reward amounts in wei')
active_users_gauge = Gauge('active_users_total', 'Total active users')

def monitor_reward_distribution(amount, success):
    reward_distribution_counter.inc()
    reward_amount_histogram.observe(amount)
    
    if not success:
        logging.error(f"Reward distribution failed: {amount}")
        # Send alert to monitoring system
```

## Testing & Validation

### 1. Smart Contract Testing

```bash
# Run comprehensive tests
npx hardhat test

# Run gas optimization tests
npx hardhat test --gas-report

# Run security tests
npx hardhat test test/security/
```

### 2. Integration Testing

```python
# Test reward distribution
async def test_reward_distribution():
    # Test with small amounts first
    test_amount = 1 * 10**18  # 1 token
    
    response = await reward_service.distribute_reward(
        RewardRequest(
            wallet_address="0x...",
            activity_type="lesson_completion",
            score=100
        )
    )
    
    assert response.success == True
    assert response.transaction_hash is not None
```

### 3. Load Testing

```python
# Load test the reward system
import asyncio
import aiohttp

async def load_test_rewards():
    async with aiohttp.ClientSession() as session:
        tasks = []
        for i in range(100):  # 100 concurrent requests
            task = session.post('/api/reward', json={
                'wallet_address': f'0x{i:040x}',
                'activity_type': 'lesson_completion',
                'score': 90
            })
            tasks.append(task)
        
        results = await asyncio.gather(*tasks)
        success_count = sum(1 for r in results if r.status == 200)
        print(f"Success rate: {success_count/100*100}%")
```

## Go-Live Process

### 1. Pre-Launch Checklist

- [ ] All tests passing
- [ ] Security audit completed
- [ ] Monitoring systems active
- [ ] Backup procedures tested
- [ ] Team trained on production procedures
- [ ] Incident response plan ready

### 2. Launch Sequence

1. **Deploy Smart Contract** (Day -1)
   - Deploy to mainnet
   - Verify contract
   - Test with small amounts

2. **Migrate User Data** (Day 0)
   - Export testnet data
   - Import to mainnet database
   - Validate data integrity

3. **Airdrop Tokens** (Day 0)
   - Airdrop mainnet tokens to users
   - Monitor transaction success
   - Handle any failures

4. **Update Frontend** (Day 0)
   - Deploy updated frontend
   - Update contract addresses
   - Test user interactions

5. **Monitor & Support** (Day 0+)
   - Monitor system health
   - Respond to user issues
   - Track key metrics

### 3. Rollback Plan

```bash
# Emergency rollback procedure
# 1. Pause contract
npx hardhat run scripts/pause-contract.js --network mainnet

# 2. Revert frontend to testnet
git checkout testnet-config
npm run build
npm run deploy

# 3. Notify users
# Send notification about temporary rollback
```

## Post-Migration Tasks

### 1. Immediate Tasks (Day 1)

- [ ] Monitor system performance
- [ ] Check all user transactions
- [ ] Verify reward distributions
- [ ] Review error logs
- [ ] Update documentation

### 2. Short-term Tasks (Week 1)

- [ ] Analyze user adoption metrics
- [ ] Optimize gas usage
- [ ] Implement additional security measures
- [ ] Set up automated monitoring
- [ ] Plan feature enhancements

### 3. Long-term Tasks (Month 1+)

- [ ] Implement governance features
- [ ] Add new reward mechanisms
- [ ] Optimize database performance
- [ ] Plan for scaling
- [ ] Regular security audits

## Monitoring & Metrics

### Key Performance Indicators

```python
# Track important metrics
metrics = {
    'daily_active_users': 0,
    'total_rewards_distributed': 0,
    'average_reward_amount': 0,
    'transaction_success_rate': 0,
    'gas_usage_efficiency': 0,
    'user_retention_rate': 0
}

def update_metrics():
    # Update metrics from database and blockchain
    pass
```

### Alerting Rules

```yaml
# Prometheus alerting rules
groups:
  - name: drp-learn-alerts
    rules:
      - alert: HighRewardDistributionFailure
        expr: rate(reward_distribution_failures_total[5m]) > 0.1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High reward distribution failure rate"
          
      - alert: LowUserActivity
        expr: active_users_total < 100
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Low user activity detected"
```

## Conclusion

This migration guide provides a comprehensive framework for moving the DRP Learn-to-Earn system from testnet to mainnet. The key to a successful migration is thorough preparation, careful execution, and continuous monitoring.

Remember to:
- Test everything thoroughly before going live
- Have rollback procedures ready
- Monitor system health continuously
- Keep users informed throughout the process
- Document all changes and procedures

For questions or support, contact the DRP development team at dev@drp-protocol.org.
