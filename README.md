# Decentralized Rights Protocol (DRP)

A human-rights-centered blockchain infrastructure for dignity, accountability, and long-term impact. Built with quantum-safe cryptography and AI-verified reality proofs.

👉 [Live Site](https://decentralizedrights.com)
👉 [App Portal](https://app.decentralizedrights.com)

## 🎭 Cinematic Experience

The DRP website is designed as a continuous storytelling journey through 6 stages of protocol evolution:
1. **Broken Systems**: Fragmented trust and chaotic isolation.
2. **The Realization**: Slowing down to find clarity in dignity.
3. **Human Network**: Transforming abstract nodes into a connected human network.
4. **DRP Emergence**: Stabilizing into a resilient protocol structure.
5. **System in Action**: Verifying activity through AI-supported governance.
6. **Future World**: A harmonious ecosystem of decentralized rights.

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **3D Engine**: Three.js + React Three Fiber + Drei
- **Animations**: GSAP + ScrollTrigger
- **Backend**: Convex (Real-time DB & Functions)
- **Styling**: Tailwind CSS + Custom Cinematic Design System
- **Cryptography**: NIST-aligned quantum-safe primitives

## ⚙️ Key Features & Fixes

- **Human Particle System**: Custom instanced mesh system representing human nodes that evolve with the narrative.
- **Cinematic Camera**: Scroll-driven camera work that guides the user through the 3D environment.
- **Protocol Command Center**: A premium dashboard for stewardship, activity verification, and rewards tracking.
- **Functional Reliability**:
    - Resolved infinite loading in recent activities through address normalization.
    - Fixed activity verification submission workflow with robust error handling.
    - Optimized 3D performance with instanced rendering and hardware-aware scaling.

## 🚀 Development & Deployment

### Local Setup
1. Clone the repo
2. `npm install --legacy-peer-deps`
3. `npx convex dev`
4. `npm run dev`

### Production Build
```bash
npm run build
```

### Vercel Deployment
Ensure the following environment variables are set:
- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_AI_URL`
- `CONVEX_DEPLOYMENT`

## ⚖️ License

MIT License - See [LEGAL](./legal) for terms of service and privacy policies.
