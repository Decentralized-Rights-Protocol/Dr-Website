# DRP Learn-to-Earn System

A comprehensive education platform that rewards users with $DeRi tokens for learning about blockchain, DRP, and AI governance.

## 🎯 Overview

The DRP Learn-to-Earn system combines education with token rewards, creating an engaging way for users to master blockchain concepts while earning cryptocurrency. The system includes:

- **5 Progressive Learning Levels** with structured curriculum
- **Interactive Lessons** with quizzes and assessments
- **Proof of Knowledge (PoK) NFTs** as certificates
- **$DeRi Token Rewards** for completed lessons
- **AI Tutor Assistant** for personalized help
- **Leaderboards** and achievement system
- **Wallet Integration** for seamless rewards

## 📁 Project Structure

```
/learn/                          # Next.js frontend routes
├── page.tsx                     # Main learn page
├── lesson/[id]/page.tsx         # Individual lesson page
├── dashboard/page.tsx           # User progress dashboard
├── leaderboard/page.tsx         # Learning leaderboard
└── ai-tutor/page.tsx           # AI assistant interface

/content/learn/                  # Educational content
├── 1/blockchain-basics.mdx     # Level 1 lessons
├── 2/drp-architecture.mdx      # Level 2 lessons
├── 3/building-contributing.mdx # Level 3 lessons
├── 4/real-world-integration.mdx# Level 4 lessons
└── 5/mastery-governance.mdx    # Level 5 lessons

/learn-api/                      # FastAPI backend
├── main.py                     # API server
└── requirements.txt            # Python dependencies

/contracts/                      # Smart contracts
└── PoK.sol                     # Proof of Knowledge NFT contract

/src/app/api/learn/             # Next.js API routes
├── lesson/[id]/route.ts        # Lesson data endpoint
├── progress/route.ts           # User progress endpoint
├── complete/route.ts           # Lesson completion endpoint
├── dashboard/route.ts          # Dashboard data endpoint
└── leaderboard/route.ts        # Leaderboard data endpoint
```

## 🚀 Quick Start

### 1. Frontend Setup (Next.js)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Backend Setup (FastAPI)

```bash
# Navigate to learn-api directory
cd learn-api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start API server
python main.py
```

### 3. Smart Contract Setup

```bash
# Install Hardhat (if not already installed)
npm install --save-dev hardhat

# Compile contracts
npx hardhat compile

# Deploy to testnet
npx hardhat run scripts/deploy.js --network <network>
```

## 📚 Curriculum Levels

### Level 1: Blockchain Foundations
- What is Blockchain?
- Cryptography & Hashing
- Consensus Mechanisms
- Smart Contracts 101

### Level 2: DRP in Action
- DRP Architecture
- PoST & PoAT Consensus
- Elder Quorum System
- Activity Proofs

### Level 3: Building & Contributing
- DRP Development Kit
- Building DApps
- Contributing to DRP
- Testing & Deployment

### Level 4: Real-World Integration
- Enterprise Integration
- Supply Chain Applications
- Identity & Access Management
- Cross-Chain Interoperability

### Level 5: Mastery & Governance
- Advanced DRP Concepts
- Governance Mechanisms
- Economic Models
- Future of DRP

## 🎮 Features

### Interactive Learning
- **Lesson Cards**: Visual progress tracking
- **Quiz Interface**: Multiple choice and practical assessments
- **Progress Tracker**: Real-time learning analytics
- **Certificate NFTs**: Blockchain-verified achievements

### Reward System
- **$DeRi Tokens**: Earned for lesson completion
- **Score-based Rewards**: Higher scores = more tokens
- **Streak Bonuses**: Consistent learning rewards
- **Achievement Badges**: Special recognition for milestones

### AI Integration
- **DRP Learning Assistant**: Personalized tutoring
- **Context-aware Help**: Understands current lesson
- **Interactive Q&A**: Natural language questions
- **Learning Style Adaptation**: Adjusts to user preferences

### Social Features
- **Leaderboards**: Global and weekly rankings
- **Achievement Sharing**: Show off your progress
- **Community Challenges**: Collaborative learning goals
- **Mentorship Program**: Connect with advanced learners

## 🔧 API Endpoints

### User Management
- `POST /users/register` - Register new user
- `GET /progress/{wallet_address}` - Get user progress
- `GET /achievements/{wallet_address}` - Get user achievements

### Learning Content
- `GET /lessons` - Get all lessons
- `GET /lessons/{lesson_id}` - Get specific lesson
- `POST /quiz/submit` - Submit quiz answers

### Social Features
- `GET /leaderboard` - Get leaderboard data
- `GET /dashboard` - Get dashboard analytics

## 🎯 Smart Contract Features

### Proof of Knowledge (PoK) Contract
- **NFT Certificates**: Unique tokens for each completed lesson
- **Reward Distribution**: Automated $DeRi token payouts
- **Achievement Tracking**: On-chain progress records
- **Verification System**: Tamper-proof completion records

### Key Functions
- `completeLesson()` - Record lesson completion and mint certificate
- `claimRewards()` - Claim accumulated $DeRi tokens
- `getUserProgress()` - Query user's learning history
- `verifyLesson()` - Admin function to verify lesson authenticity

## 🎨 UI Components

### Core Components
- **LessonCard**: Displays lesson information and progress
- **QuizInterface**: Interactive quiz with multiple choice questions
- **ProgressBar**: Visual progress tracking
- **AchievementBadge**: Displays earned achievements
- **LeaderboardTable**: Shows rankings and statistics

### Navigation
- **LevelSelector**: Choose learning level
- **ModuleNavigation**: Browse lesson modules
- **ProgressTracker**: View overall progress
- **WalletConnect**: Connect wallet for rewards

## 🔐 Security Features

### Smart Contract Security
- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Admin-only functions protected
- **Input Validation**: All inputs validated
- **Emergency Functions**: Admin can pause/withdraw if needed

### API Security
- **CORS Protection**: Configured for specific origins
- **Input Sanitization**: All inputs cleaned and validated
- **Rate Limiting**: Prevents abuse
- **Authentication**: Wallet-based user identification

## 📊 Analytics & Monitoring

### Learning Analytics
- **Completion Rates**: Track lesson completion
- **Time Spent**: Monitor learning engagement
- **Score Distribution**: Analyze quiz performance
- **User Retention**: Measure learning persistence

### System Monitoring
- **API Performance**: Response times and error rates
- **Smart Contract Events**: Track on-chain activities
- **User Growth**: Monitor platform adoption
- **Reward Distribution**: Track token payouts

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
vercel --prod
```

### Backend (Railway/Heroku)
```bash
# Deploy to Railway
railway deploy

# Or deploy to Heroku
git push heroku main
```

### Smart Contracts (Ethereum/Polygon)
```bash
# Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: [docs.drp.learn](https://decentralizedrights.com/learn)
- **Discord**: [DRP Community](https://discord.gg/zbWg92AnQQ)
- **Email**: contact@decentralizedrights.com
- **GitHub Issues**: [Report bugs](hub.com/Decentralized-Rights-Protocol/Dr-Blockchain)

## 🎉 Acknowledgments

- OpenZeppelin for smart contract libraries
- Next.js team for the amazing framework
- FastAPI for the robust backend
- The DRP community for feedback and support

---

**Start your learning journey today and earn $DeRi tokens while mastering blockchain technology!** 🚀
