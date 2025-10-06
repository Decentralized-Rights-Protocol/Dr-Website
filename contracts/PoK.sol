// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Proof of Knowledge (PoK) NFT Contract
 * @dev Manages educational achievements and $DeRi token rewards for DRP Learn-to-Earn
 */
contract PoK is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Token contract for $DeRi rewards
    IERC20 public deriToken;
    
    // Struct for lesson completion data
    struct LessonCompletion {
        string lessonId;
        uint256 score;
        uint256 timestamp;
        bool verified;
    }
    
    // Struct for certificate data
    struct Certificate {
        string title;
        string description;
        uint256 level;
        uint256 rewardAmount;
        string metadataURI;
        bool isActive;
    }
    
    // Mappings
    mapping(uint256 => Certificate) public certificates;
    mapping(address => LessonCompletion[]) public userCompletions;
    mapping(address => uint256) public userRewards;
    mapping(string => bool) public verifiedLessons;
    
    // Events
    event LessonCompleted(
        address indexed user,
        string indexed lessonId,
        uint256 score,
        uint256 reward
    );
    
    event CertificateMinted(
        address indexed user,
        uint256 indexed tokenId,
        string title,
        uint256 level
    );
    
    event RewardsClaimed(
        address indexed user,
        uint256 amount
    );
    
    // Modifiers
    modifier onlyVerifiedLesson(string memory lessonId) {
        require(verifiedLessons[lessonId], "Lesson not verified");
        _;
    }
    
    constructor(address _deriToken) ERC721("DRP Proof of Knowledge", "DRP-PoK") {
        deriToken = IERC20(_deriToken);
    }
    
    /**
     * @dev Record lesson completion and mint certificate if eligible
     * @param lessonId Unique identifier for the lesson
     * @param score User's quiz score (0-100)
     * @param level Lesson level (1-5)
     * @param title Certificate title
     * @param description Certificate description
     */
    function completeLesson(
        string memory lessonId,
        uint256 score,
        uint256 level,
        string memory title,
        string memory description
    ) external onlyVerifiedLesson(lessonId) nonReentrant {
        require(score >= 70, "Score too low to complete lesson");
        require(level >= 1 && level <= 5, "Invalid level");
        
        // Record completion
        userCompletions[msg.sender].push(LessonCompletion({
            lessonId: lessonId,
            score: score,
            timestamp: block.timestamp,
            verified: true
        }));
        
        // Calculate reward based on level and score
        uint256 baseReward = level * 10; // Base reward per level
        uint256 scoreMultiplier = score / 10; // 10% bonus per 10 points
        uint256 totalReward = baseReward + (baseReward * scoreMultiplier / 10);
        
        // Add to user's pending rewards
        userRewards[msg.sender] += totalReward;
        
        // Mint certificate NFT
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(msg.sender, tokenId);
        
        // Store certificate data
        certificates[tokenId] = Certificate({
            title: title,
            description: description,
            level: level,
            rewardAmount: totalReward,
            metadataURI: string(abi.encodePacked("https://api.drp.learn/certificates/", _toString(tokenId))),
            isActive: true
        });
        
        emit LessonCompleted(msg.sender, lessonId, score, totalReward);
        emit CertificateMinted(msg.sender, tokenId, title, level);
    }
    
    /**
     * @dev Claim accumulated $DeRi token rewards
     */
    function claimRewards() external nonReentrant {
        uint256 amount = userRewards[msg.sender];
        require(amount > 0, "No rewards to claim");
        
        userRewards[msg.sender] = 0;
        
        require(
            deriToken.transfer(msg.sender, amount),
            "Token transfer failed"
        );
        
        emit RewardsClaimed(msg.sender, amount);
    }
    
    /**
     * @dev Get user's total completed lessons
     */
    function getUserCompletedLessons(address user) external view returns (uint256) {
        return userCompletions[user].length;
    }
    
    /**
     * @dev Get user's pending rewards
     */
    function getPendingRewards(address user) external view returns (uint256) {
        return userRewards[user];
    }
    
    /**
     * @dev Get user's completion history
     */
    function getUserCompletions(address user) external view returns (LessonCompletion[] memory) {
        return userCompletions[user];
    }
    
    /**
     * @dev Get certificate data by token ID
     */
    function getCertificate(uint256 tokenId) external view returns (Certificate memory) {
        require(_exists(tokenId), "Certificate does not exist");
        return certificates[tokenId];
    }
    
    /**
     * @dev Verify a lesson (only owner)
     */
    function verifyLesson(string memory lessonId) external onlyOwner {
        verifiedLessons[lessonId] = true;
    }
    
    /**
     * @dev Batch verify lessons (only owner)
     */
    function batchVerifyLessons(string[] memory lessonIds) external onlyOwner {
        for (uint256 i = 0; i < lessonIds.length; i++) {
            verifiedLessons[lessonIds[i]] = true;
        }
    }
    
    /**
     * @dev Update $DeRi token contract address (only owner)
     */
    function updateDeriToken(address _deriToken) external onlyOwner {
        deriToken = IERC20(_deriToken);
    }
    
    /**
     * @dev Emergency withdraw function (only owner)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = deriToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        
        require(
            deriToken.transfer(owner(), balance),
            "Emergency withdraw failed"
        );
    }
    
    /**
     * @dev Override tokenURI to return certificate metadata
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        
        Certificate memory cert = certificates[tokenId];
        
        return string(abi.encodePacked(
            'data:application/json;base64,',
            _base64Encode(abi.encodePacked(
                '{"name":"', cert.title, '",',
                '"description":"', cert.description, '",',
                '"image":"https://api.drp.learn/images/certificate-', _toString(cert.level), '.png",',
                '"attributes":[',
                '{"trait_type":"Level","value":', _toString(cert.level), '},',
                '{"trait_type":"Reward","value":', _toString(cert.rewardAmount), '},',
                '{"trait_type":"Type","value":"Proof of Knowledge"}',
                ']}'
            ))
        ));
    }
    
    /**
     * @dev Helper function to convert uint256 to string
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
    
    /**
     * @dev Helper function for base64 encoding
     */
    function _base64Encode(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return "";
        
        string memory table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        
        string memory result = new string(4 * ((data.length + 2) / 3));
        
        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)
            
            for {
                let i := 0
            } lt(i, mload(data)) {
                i := add(i, 3)
            } {
                let input := and(mload(add(data, add(32, i))), 0xffffff)
                
                let out := mload(add(tablePtr, and(shr(250, input), 0x3F)))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(244, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(238, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(232, input), 0x3F))), 0xFF))
                out := shl(224, out)
                
                mstore(resultPtr, out)
                
                resultPtr := add(resultPtr, 4)
            }
            
            switch mod(mload(data), 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }
        }
        
        return result;
    }
}

// Interface for $DeRi token
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}
