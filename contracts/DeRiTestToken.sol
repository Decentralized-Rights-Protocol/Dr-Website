// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title DeRiTestToken
 * @dev Testnet ERC-20 token for DRP Learn-to-Earn rewards
 * @notice This is a test token for the DRP Learn platform rewards system
 * @author DRP Team
 */
contract DeRiTestToken is ERC20, Ownable, ReentrancyGuard, Pausable {
    
    // Events
    event RewardDistributed(address indexed recipient, uint256 amount, string reason);
    event BatchRewardDistributed(address[] recipients, uint256[] amounts, string reason);
    event RewardCapUpdated(uint256 newCap);
    event RewardRateUpdated(uint256 newRate);
    
    // Constants
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10**18; // 1M tokens
    uint256 public constant MAX_REWARD_PER_TX = 1000 * 10**18; // 1000 tokens max per reward
    uint256 public constant DAILY_REWARD_CAP = 10000 * 10**18; // 10K tokens daily cap
    
    // State variables
    uint256 public rewardCap = DAILY_REWARD_CAP;
    uint256 public dailyRewardUsed = 0;
    uint256 public lastResetDay = 0;
    
    // Reward rates for different activities
    mapping(string => uint256) public rewardRates;
    
    // Track daily rewards per user
    mapping(address => uint256) public dailyUserRewards;
    mapping(address => uint256) public lastUserRewardDay;
    
    // Authorized reward distributors (backend signers)
    mapping(address => bool) public authorizedDistributors;
    
    // Modifiers
    modifier onlyAuthorizedDistributor() {
        require(authorizedDistributors[msg.sender], "DeRiTestToken: Not authorized distributor");
        _;
    }
    
    modifier withinDailyCap(uint256 amount) {
        _resetDailyCounterIfNeeded();
        require(dailyRewardUsed + amount <= rewardCap, "DeRiTestToken: Daily reward cap exceeded");
        _;
    }
    
    modifier withinUserDailyLimit(address user, uint256 amount) {
        _resetUserDailyCounterIfNeeded(user);
        require(dailyUserRewards[user] + amount <= MAX_REWARD_PER_TX, "DeRiTestToken: User daily limit exceeded");
        _;
    }
    
    constructor() ERC20("DeRi Test Token", "DeRi-TEST") {
        _mint(msg.sender, INITIAL_SUPPLY);
        
        // Set initial reward rates
        rewardRates["lesson_completion"] = 10 * 10**18; // 10 tokens
        rewardRates["quiz_perfect"] = 5 * 10**18; // 5 tokens
        rewardRates["achievement_unlock"] = 25 * 10**18; // 25 tokens
        rewardRates["level_completion"] = 50 * 10**18; // 50 tokens
        rewardRates["streak_bonus"] = 15 * 10**18; // 15 tokens
        
        // Owner is initially authorized
        authorizedDistributors[msg.sender] = true;
        
        lastResetDay = block.timestamp / 1 days;
    }
    
    /**
     * @dev Distribute reward to a single user
     * @param recipient Address to receive the reward
     * @param amount Amount of tokens to reward
     * @param reason Reason for the reward (for logging)
     */
    function distributeReward(
        address recipient,
        uint256 amount,
        string memory reason
    ) external onlyAuthorizedDistributor whenNotPaused withinDailyCap(amount) withinUserDailyLimit(recipient, amount) {
        require(recipient != address(0), "DeRiTestToken: Invalid recipient");
        require(amount > 0, "DeRiTestToken: Amount must be positive");
        require(amount <= MAX_REWARD_PER_TX, "DeRiTestToken: Amount exceeds max per transaction");
        
        _mint(recipient, amount);
        
        // Update daily counters
        dailyRewardUsed += amount;
        dailyUserRewards[recipient] += amount;
        
        emit RewardDistributed(recipient, amount, reason);
    }
    
    /**
     * @dev Distribute rewards to multiple users in batch
     * @param recipients Array of addresses to receive rewards
     * @param amounts Array of amounts corresponding to recipients
     * @param reason Reason for the rewards (for logging)
     */
    function distributeBatchRewards(
        address[] calldata recipients,
        uint256[] calldata amounts,
        string memory reason
    ) external onlyAuthorizedDistributor whenNotPaused {
        require(recipients.length == amounts.length, "DeRiTestToken: Arrays length mismatch");
        require(recipients.length <= 100, "DeRiTestToken: Batch size too large");
        
        uint256 totalAmount = 0;
        
        // Calculate total amount and validate
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "DeRiTestToken: Invalid recipient");
            require(amounts[i] > 0, "DeRiTestToken: Amount must be positive");
            require(amounts[i] <= MAX_REWARD_PER_TX, "DeRiTestToken: Amount exceeds max per transaction");
            totalAmount += amounts[i];
        }
        
        require(totalAmount <= rewardCap, "DeRiTestToken: Total amount exceeds daily cap");
        
        // Distribute rewards
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
            dailyUserRewards[recipients[i]] += amounts[i];
        }
        
        dailyRewardUsed += totalAmount;
        
        emit BatchRewardDistributed(recipients, amounts, reason);
    }
    
    /**
     * @dev Get reward amount for a specific activity
     * @param activity Activity type
     * @return Amount of tokens for the activity
     */
    function getRewardAmount(string memory activity) external view returns (uint256) {
        return rewardRates[activity];
    }
    
    /**
     * @dev Calculate reward based on lesson completion score
     * @param baseReward Base reward amount
     * @param score Quiz score (0-100)
     * @return Calculated reward amount
     */
    function calculateRewardWithScore(uint256 baseReward, uint256 score) external pure returns (uint256) {
        require(score <= 100, "DeRiTestToken: Invalid score");
        
        if (score >= 90) {
            return baseReward + (baseReward * 20 / 100); // 20% bonus for 90%+
        } else if (score >= 80) {
            return baseReward + (baseReward * 10 / 100); // 10% bonus for 80%+
        } else if (score >= 70) {
            return baseReward; // Base reward for 70%+
        } else {
            return 0; // No reward for <70%
        }
    }
    
    /**
     * @dev Add authorized distributor
     * @param distributor Address to authorize
     */
    function addAuthorizedDistributor(address distributor) external onlyOwner {
        require(distributor != address(0), "DeRiTestToken: Invalid distributor");
        authorizedDistributors[distributor] = true;
    }
    
    /**
     * @dev Remove authorized distributor
     * @param distributor Address to remove authorization
     */
    function removeAuthorizedDistributor(address distributor) external onlyOwner {
        authorizedDistributors[distributor] = false;
    }
    
    /**
     * @dev Update reward rate for an activity
     * @param activity Activity type
     * @param rate New reward rate
     */
    function updateRewardRate(string memory activity, uint256 rate) external onlyOwner {
        require(rate <= MAX_REWARD_PER_TX, "DeRiTestToken: Rate exceeds max per transaction");
        rewardRates[activity] = rate;
        emit RewardRateUpdated(rate);
    }
    
    /**
     * @dev Update daily reward cap
     * @param newCap New daily cap
     */
    function updateRewardCap(uint256 newCap) external onlyOwner {
        require(newCap > 0, "DeRiTestToken: Cap must be positive");
        rewardCap = newCap;
        emit RewardCapUpdated(newCap);
    }
    
    /**
     * @dev Pause contract (emergency only)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Emergency withdraw (owner only)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = balanceOf(address(this));
        if (balance > 0) {
            _transfer(address(this), owner(), balance);
        }
    }
    
    /**
     * @dev Reset daily counter if needed
     */
    function _resetDailyCounterIfNeeded() internal {
        uint256 currentDay = block.timestamp / 1 days;
        if (currentDay > lastResetDay) {
            dailyRewardUsed = 0;
            lastResetDay = currentDay;
        }
    }
    
    /**
     * @dev Reset user daily counter if needed
     */
    function _resetUserDailyCounterIfNeeded(address user) internal {
        uint256 currentDay = block.timestamp / 1 days;
        if (currentDay > lastUserRewardDay[user]) {
            dailyUserRewards[user] = 0;
            lastUserRewardDay[user] = currentDay;
        }
    }
    
    /**
     * @dev Get remaining daily reward capacity
     */
    function getRemainingDailyCapacity() external view returns (uint256) {
        uint256 currentDay = block.timestamp / 1 days;
        if (currentDay > lastResetDay) {
            return rewardCap;
        }
        return rewardCap - dailyRewardUsed;
    }
    
    /**
     * @dev Get user's remaining daily reward capacity
     */
    function getUserRemainingDailyCapacity(address user) external view returns (uint256) {
        uint256 currentDay = block.timestamp / 1 days;
        if (currentDay > lastUserRewardDay[user]) {
            return MAX_REWARD_PER_TX;
        }
        return MAX_REWARD_PER_TX - dailyUserRewards[user];
    }
    
    /**
     * @dev Override transfer to include pause functionality
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        super._beforeTokenTransfer(from, to, amount);
        require(!paused() || from == address(0) || to == address(0), "DeRiTestToken: Token transfer paused");
    }
}
