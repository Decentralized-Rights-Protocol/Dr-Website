# Decentralized Rights Protocol - Next.js Website

A modern, responsive Next.js website for the Decentralized Rights Protocol - a blockchain platform dedicated to protecting and advancing human rights globally.

## 🚀 Features

### 🎨 Design & User Experience
- **Dark/Light Mode Toggle** - Smooth theme switching with persistent preferences
- **3D Blockchain Animations** - Interactive Three.js visualizations
- **Responsive Design** - Optimized for all devices and screen sizes
- **Smooth Animations** - CSS transitions and scroll-triggered effects
- **Modern UI/UX** - Clean, professional design with humanitarian focus
- **Learn-to-Earn Module** - Interactive lessons with MDX content, quizzes, and rewards
- **DRP Explorer** - Modern galaxy-themed blockchain explorer with real-time transaction tracking

### 📚 Recent Updates

#### Learn Module Fixes (Latest)
- ✅ Fixed lesson loading from MDX files dynamically
- ✅ Added animated 404 page for missing lessons
- ✅ Implemented loading skeleton animations
- ✅ Improved error handling and fallback UI
- ✅ Enhanced lesson content rendering with ReactMarkdown

#### Explorer UI Improvements (Latest)
- ✅ Redesigned with dark galaxy gradient theme (#030b17 → #06172d)
- ✅ Added animated particle background system
- ✅ Modern rounded search bar with improved UX
- ✅ Pill-style tab navigation buttons
- ✅ Enhanced table styling with shadows, rounded borders, and hover effects
- ✅ Transaction card view with AI verification icons
- ✅ Improved responsive design for all screen sizes

#### Token Page Enhancements (Latest)
- ✅ Fixed RIGHTS animation alignment to prevent word overlap
- ✅ Improved responsive layout with proper flex containers
- ✅ Reduced animation speed for better readability
- ✅ Added proper spacing and margins for mobile devices

### 🔧 Technical Features
- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D blockchain visualizations
- **Quantum Safe Cryptography** - Future-proof security
- **Dual Token System** - $RIGHTS and $DeRi tokens
- **SDGs Alignment** - United Nations Sustainable Development Goals

### 📱 Sections
1. **Hero Section** - Eye-catching introduction with 3D animations
2. **Mission** - Humanitarian goals and values
3. **Technology** - Blockchain features and capabilities
4. **Token Economy** - Detailed token information and mechanics
5. **Key Features** - Quantum safe, human rights focus, SDGs alignment
6. **Impact** - Real-world statistics and success stories
7. **Community** - Join the movement section
8. **Learn-to-Earn** - Interactive educational platform with MDX-based lessons
9. **DRP Explorer** - Blockchain explorer with transaction tracking and AI verification
10. **Contact** - Get involved and connect
11. **404 Page** - Cool blockchain-themed error page

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd drp-nextjs
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

This project contains multiple sub-projects:

```
DRP website/
├── src/                         # Main website (decentralizedrights.com)
│   ├── app/
│   │   ├── learn/              # Learn-to-Earn module
│   │   ├── tokens/             # Token information pages
│   │   └── ...
│   ├── components/
│   │   ├── learn/              # Learn module components
│   │   └── tokens/             # Token page components
│   └── content/
│       └── learn/              # MDX lesson files
├── explorer/                    # Explorer subdomain (explorer.decentralizedrights.com)
│   └── src/
│       ├── app/
│       ├── components/
│       │   ├── ParticleBackground.tsx
│       │   └── TransactionCard.tsx
│       └── lib/
│           └── api.ts          # API client
├── api/                         # API subdomain (api.decentralizedrights.com)
├── app-portal/                  # App portal (app.decentralizedrights.com)
├── learn-api/                   # Python FastAPI backend for learn module
└── backend/                     # Main backend services
```

### Key Files Added/Updated:

#### Learn Module
- `src/lib/learn-utils.ts` - MDX file parser and lesson loader
- `src/app/api/learn/lesson/[id]/route.ts` - Dynamic lesson API endpoint
- `src/components/learn/LessonNotFound.tsx` - Animated 404 component
- `src/components/learn/LessonSkeleton.tsx` - Loading skeleton component

#### Explorer UI
- `explorer/src/components/ParticleBackground.tsx` - Animated particle system
- `explorer/src/components/TransactionCard.tsx` - Transaction card component
- `explorer/src/app/page.tsx` - Redesigned explorer page with galaxy theme

#### Token Page
- `src/components/tokens/RightsAnimation.tsx` - Fixed alignment and responsive design

## 🎯 Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **React 18** - Latest React features
- **Font Awesome** - Professional icons
- **Google Fonts** - Inter font family

## 🌐 Live Features

### Theme System
- **Dark Mode** (default) - Professional blockchain aesthetic
- **Light Mode** - Clean, accessible alternative
- **Persistent Preferences** - Remembers user choice
- **Smooth Transitions** - Animated theme switching

### Interactive Elements
- **3D Blockchain Particles** - Animated network visualization
- **Floating Elements** - Dynamic hero section animations
- **Scroll Animations** - Elements appear as you scroll
- **Hover Effects** - Interactive cards and buttons
- **Counter Animations** - Animated statistics

### 404 Error Page
- **Blockchain-themed** - Cool futuristic design
- **3D Error Animation** - Interactive particle system
- **Floating Blocks** - Animated blockchain visualization
- **Glitch Effects** - Modern error page aesthetics

## 📄 Token Information

### $RIGHTS Token
- **Purpose**: Governance & Utility
- **Total Supply**: 1 Billion tokens
- **Distribution**: 40% Community allocation
- **Features**: Staking rewards, governance rights, platform access

### $DeRi Token
- **Purpose**: Human Rights Impact
- **Earning**: Through human rights actions
- **Utility**: Platform benefits and recognition
- **Features**: Impact rewards, community incentives

## 🎨 Design Philosophy

The website embodies the core values of the Decentralized Rights Protocol:

- **Humanitarian Focus** - Every element serves the mission of protecting human rights
- **Technological Excellence** - Cutting-edge blockchain technology
- **Accessibility** - Available to everyone, everywhere
- **Transparency** - Open, verifiable, and community-driven
- **Innovation** - Quantum-safe, future-proof solutions

## 🔧 Customization

### Colors
The website uses CSS custom properties and Tailwind CSS for easy theming:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #06b6d4;
    /* ... more variables */
}
```

### Content
- Update components in `src/components/`
- Modify styling in `src/app/globals.css`
- Add new pages in `src/app/`

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions to improve the Decentralized Rights website:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is part of the Decentralized Rights Protocol initiative. All rights reserved.

## 🌍 Mission

The Decentralized Rights Protocol is building a decentralized platform that uses blockchain technology to protect, verify, and advance human rights globally. Join us in creating a more just and transparent world.

## 📞 Contact

- **Email**: dev@decentralizedrights.com
- **Website**: [decentralizedrights.com](https://decentralizedrights.com)
- **Community**: [Discord](https://discord.gg/zbWg92AnQQ)

---

**Built with ❤️ for humanity** - Decentralized Rights Protocol Team
