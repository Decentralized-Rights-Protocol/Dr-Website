# DRP Design System v2

## Typography
- **Display**: Syne (800 weight) — all headlines, brand moments
- **Body**: System UI stack — readable, lightweight
- **Mono**: SF Mono / Fira Code — labels, stats, scene counters

## Color Palette
| Token | Value | Use |
|---|---|---|
| `--drp-void` | `#030308` | Page background |
| `--drp-cyan` | `#00f2ff` | Primary accent, CTA |
| `--drp-gold` | `#ffd700` | Secondary accent, stats |
| `--drp-purple` | `#8b5cf6` | Tertiary, AI/governance |
| `--drp-green` | `#00ff88` | Success, rights verified |
| `--drp-red` | `#ff4040` | Broken systems scene |

## Homepage Architecture
The homepage is a **scroll-driven 4-scene cinematic narrative**:

1. **Broken Systems** (`sceneId: broken`) — red accent, chaotic particles
2. **Human Connection** (`sceneId: people`) — blue accent, clustering particles  
3. **The Protocol** (`sceneId: protocol`) — cyan accent, lattice network
4. **Verified World** (`sceneId: future`) — gold accent, harmonic spiral

Each scene:
- Controls 800 Three.js instanced mesh particles
- Shows connection lines between nearby nodes (< threshold distance)
- Has scroll-driven progression + dot navigation
- Transitions via `AnimatePresence` with spring easing

## Glass Components
```tsx
<div className="glass glass-hover rounded-2xl p-6">
  Content
</div>
```

## Glow Effects
```tsx
<div className="glow-cyan">Cyan glow</div>
<div className="glow-gold">Gold glow</div>
```

## Gradient Text
```tsx
<h1 className="text-gradient-cyan">Infrastructure</h1>
```

## Scene Label
```tsx
<span className="scene-label text-[--drp-cyan]">01 / 04 — Broken Systems</span>
```
