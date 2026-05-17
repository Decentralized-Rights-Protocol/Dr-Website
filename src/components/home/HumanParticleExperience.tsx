'use client'

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

// ─── Scene configuration ──────────────────────────────────────────────
const SCENES = [
  {
    id: 'broken',
    title: 'Broken Systems',
    headline: 'Rights lost in fragmented systems.',
    sub: 'Every year, billions are denied access, identity, and voice — because trust infrastructure simply does not exist.',
    accent: '#ff4040',
    particleMode: 'chaos',
  },
  {
    id: 'people',
    title: 'Human Connection',
    headline: 'Every node is a person.',
    sub: 'Interactions form societies. But without verification, contribution goes unrecognized and trust collapses.',
    accent: '#00b4ff',
    particleMode: 'cluster',
  },
  {
    id: 'protocol',
    title: 'The Protocol',
    headline: 'DRP: the trust layer.',
    sub: 'Proof of Activity. Proof of Status. AI-assisted governance. One immutable record of human dignity and action.',
    accent: '#00f2ff',
    particleMode: 'network',
  },
  {
    id: 'future',
    title: 'Verified World',
    headline: 'Rights, by design.',
    sub: 'A future where access, identity, and contribution are verified — and no one is invisible.',
    accent: '#ffd700',
    particleMode: 'harmony',
  },
]

// ─── Human particle system ────────────────────────────────────────────
const PARTICLE_COUNT = 800

interface HumanNode {
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  baseX: number; baseY: number; baseZ: number
  speed: number; offset: number; size: number
  groupId: number; phase: number
}

function HumanParticles({ sceneId, accent }: { sceneId: string; accent: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const nodes = useMemo<HumanNode[]>(() => {
    const arr: HumanNode[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 28
      const y = (Math.random() - 0.5) * 16
      const z = (Math.random() - 0.5) * 12
      arr.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.01,
        speed: 0.3 + Math.random() * 0.7,
        offset: Math.random() * Math.PI * 2,
        size: 0.04 + Math.random() * 0.06,
        groupId: Math.floor(Math.random() * 8),
        phase: Math.random() * Math.PI * 2,
      })
    }
    return arr
  }, [])

  // Line geometry for connections
  const lineGeo = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
    return new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(positions, 3))
  }, [])

  const color = useMemo(() => new THREE.Color(accent), [accent])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    const positions: number[] = []

    nodes.forEach((n, i) => {
      let tx = n.baseX, ty = n.baseY, tz = n.baseZ

      if (sceneId === 'broken') {
        // Chaotic drift with sharp jitter
        tx += Math.sin(t * n.speed * 2 + n.offset) * 3 + Math.sin(t * 7 + n.phase) * 0.5
        ty += Math.cos(t * n.speed * 1.5 + n.offset) * 3 + Math.cos(t * 5 + n.phase) * 0.5
        tz += Math.sin(t * n.speed + n.offset) * 2
      } else if (sceneId === 'people') {
        // Cluster into groups
        const angle = (n.groupId / 8) * Math.PI * 2
        const r = 6
        const gx = Math.cos(angle) * r
        const gy = Math.sin(angle) * r * 0.5
        tx = n.baseX * 0.2 + gx * 0.8 + Math.sin(t * 0.5 + n.offset) * 0.5
        ty = n.baseY * 0.2 + gy * 0.8 + Math.cos(t * 0.4 + n.offset) * 0.5
        tz = n.baseZ * 0.3
      } else if (sceneId === 'protocol') {
        // Organize into lattice / network
        const ix = i % 40; const iy = Math.floor(i / 40)
        const lx = (ix / 40 - 0.5) * 24
        const ly = (iy / 20 - 0.5) * 12
        tx = n.baseX * 0.1 + lx * 0.9 + Math.sin(t * 0.3 + n.offset) * 0.3
        ty = n.baseY * 0.1 + ly * 0.9 + Math.cos(t * 0.3 + n.offset) * 0.3
        tz = n.baseZ * 0.2
      } else if (sceneId === 'future') {
        // Spiral / harmonious orbit
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2 * 4 + t * 0.1
        const r = 2 + (i / PARTICLE_COUNT) * 10
        tx = Math.cos(angle) * r
        ty = Math.sin(angle) * r * 0.5 + Math.sin(t * 0.2 + n.offset) * 2
        tz = Math.sin(angle * 0.5) * r * 0.3
      }

      n.x = tx; n.y = ty; n.z = tz

      dummy.position.set(tx, ty, tz)
      dummy.scale.setScalar(n.size * (1 + Math.sin(t * 2 + n.phase) * 0.15))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)

      // Collect positions for line drawing
      if (i < 200) { // Only check a subset for performance
        for (let j = i + 1; j < Math.min(i + 20, 200); j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dz = nodes[i].z - nodes[j].z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          const threshold = sceneId === 'broken' ? 1.5 : sceneId === 'protocol' ? 4 : 3
          if (dist < threshold) {
            positions.push(nodes[i].x, nodes[i].y, nodes[i].z)
            positions.push(nodes[j].x, nodes[j].y, nodes[j].z)
          }
        }
      }
    })

    meshRef.current.instanceMatrix.needsUpdate = true

    // Update line geometry
    const buf = linesRef.current?.geometry.attributes.position as THREE.BufferAttribute
    if (buf) {
      const arr = buf.array as Float32Array
      const len = Math.min(positions.length, arr.length)
      for (let k = 0; k < len; k++) arr[k] = positions[k]
      for (let k = len; k < arr.length; k++) arr[k] = 0
      buf.needsUpdate = true
    }
  })

  const geo = useMemo(() => {
    // Human-like: slightly elongated sphere (head) above tiny cylinder (body) — simplified as merged geo
    const g = new THREE.SphereGeometry(1, 6, 6)
    return g
  }, [])

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.8,
    roughness: 0.2,
    metalness: 0.5,
    transparent: true,
    opacity: 0.85,
  }), [color])

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.25,
    vertexColors: false,
  }), [color])

  return (
    <>
      <instancedMesh ref={meshRef} args={[geo, mat, PARTICLE_COUNT]} />
      <lineSegments ref={linesRef} geometry={lineGeo} material={lineMat} />
    </>
  )
}

function Scene3D({ sceneId, accent }: { sceneId: string; accent: string }) {
  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 18]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={accent} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#0033ff" />
      <Stars radius={80} depth={40} count={600} factor={3} fade speed={0.5} />
      <HumanParticles sceneId={sceneId} accent={accent} />
    </>
  )
}

// ─── Scroll dots ──────────────────────────────────────────────────────
function SceneDots({ current, total, onJump }: { current: number; total: number; onJump: (i: number) => void }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: i === current ? SCENES[i].accent : 'rgba(255,255,255,0.3)',
            transform: i === current ? 'scale(1.6)' : 'scale(1)',
            boxShadow: i === current ? `0 0 8px ${SCENES[i].accent}` : 'none',
          }}
          aria-label={`Jump to scene ${i + 1}`}
        />
      ))}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────
export function HumanParticleExperience() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scene = SCENES[sceneIndex]

  const jumpTo = useCallback((i: number) => {
    if (isTransitioning || i === sceneIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setSceneIndex(i)
      setIsTransitioning(false)
    }, 400)
  }, [sceneIndex, isTransitioning])

  // Scroll-driven scene progression
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollY = window.scrollY
      const winH = window.innerHeight
      const newIndex = Math.min(Math.floor(scrollY / (winH * 0.85)), SCENES.length - 1)
      if (newIndex !== sceneIndex && !isTransitioning) {
        jumpTo(newIndex)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sceneIndex, isTransitioning, jumpTo])

  return (
    <div ref={containerRef} className="relative" style={{ height: `${SCENES.length * 100}vh` }}>
      {/* Fixed 3D canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }} style={{ background: '#030308' }}>
          <Scene3D sceneId={scene.id} accent={scene.accent} />
        </Canvas>
        {/* Cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,3,8,0.85) 100%)',
        }} />
      </div>

      {/* Scene navigation dots */}
      <SceneDots current={sceneIndex} total={SCENES.length} onJump={jumpTo} />

      {/* Fixed overlay UI */}
      <div className="fixed inset-0 z-10 flex flex-col justify-between pointer-events-none">
        {/* Top nav bar */}
        <nav className="px-8 pt-7 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: scene.accent, boxShadow: `0 0 20px ${scene.accent}60` }}>
              <span className="text-xs font-black text-black">D</span>
            </div>
            <span className="text-white font-semibold tracking-tight text-sm">Decentralized Rights Protocol</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/whitepaper" className="text-white/60 hover:text-white transition-colors">Whitepaper</Link>
            <Link href="/docs" className="text-white/60 hover:text-white transition-colors">Docs</Link>
            <Link href="https://app.decentralizedrights.com" className="px-4 py-1.5 rounded-full text-black font-semibold text-xs transition-all" style={{ background: scene.accent, boxShadow: `0 0 16px ${scene.accent}50` }}>Launch App</Link>
          </div>
        </nav>

        {/* Scene content */}
        <div className="px-10 pb-16 md:pb-24 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto"
            >
              {/* Scene tag */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: scene.accent }} />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: scene.accent }}>
                  {String(sceneIndex + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')} — {scene.title}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl font-black text-white leading-none tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                {scene.headline}
              </h1>

              {/* Sub */}
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                {scene.sub}
              </p>

              {/* CTA on last scene */}
              {sceneIndex === SCENES.length - 1 && (
                <div className="flex items-center gap-4">
                  <Link
                    href="/whitepaper"
                    className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: scene.accent, color: '#000', boxShadow: `0 0 24px ${scene.accent}50` }}
                  >
                    Read the Whitepaper
                  </Link>
                  <Link
                    href="https://app.decentralizedrights.com"
                    className="px-6 py-3 rounded-full font-semibold text-sm border text-white transition-all hover:bg-white/10"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                  >
                    Explore the App →
                  </Link>
                </div>
              )}

              {/* Scroll hint on first scene */}
              {sceneIndex === 0 && (
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex items-center gap-2 text-white/30 text-xs"
                >
                  <span>Scroll to explore</span>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* After-scroll: Full landing sections */}
      <div className="relative z-20" style={{ marginTop: `${SCENES.length * 100}vh` }}>
        <LandingSections />
      </div>
    </div>
  )
}

// ─── Landing sections after scroll ───────────────────────────────────
function LandingSections() {
  const capabilities = [
    { label: 'Proof of Status', desc: 'Portable attestations that verify trust without exposing personal data.', icon: '⬡', color: '#00f2ff' },
    { label: 'Proof of Activity', desc: 'On-chain evidence of meaningful participation and contribution.', icon: '◈', color: '#ffd700' },
    { label: 'AI Governance', desc: 'Decision support agents that improve transparency and institutional memory.', icon: '✦', color: '#8b5cf6' },
    { label: 'Rights Infrastructure', desc: 'A protocol layer for dignity, access, and cross-border accountability.', icon: '⊕', color: '#00ff88' },
    { label: 'Quantum-Safe', desc: 'Post-quantum cryptography engineered for long-term resilience.', icon: '⟐', color: '#ff6b6b' },
    { label: 'Transparent Audit', desc: 'Verifiable, auditable flows for identity and action provenance.', icon: '◎', color: '#00b4ff' },
  ]

  const sectors = ['Education', 'Healthcare', 'Agriculture', 'Identity', 'Governance', 'Sustainability']

  return (
    <div className="bg-[#030308]">
      {/* Capabilities bento */}
      <section className="px-6 md:px-16 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-[#00f2ff] mb-3">Protocol Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Every layer designed<br/>for human rights.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}
              >
                <div className="mb-4 text-2xl" style={{ color: c.color }}>{c.icon}</div>
                <h3 className="text-white font-bold mb-2 tracking-tight">{c.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 100%, ${c.color}08 0%, transparent 70%)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-16 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#ffd700] mb-3">How It Works</p>
              <h2 className="text-4xl font-black text-white tracking-tight mb-6">Three steps to<br/>verified trust.</h2>
              <div className="space-y-6">
                {[
                  { n: '01', t: 'Verify Status', d: 'Institutions and participants issue attestations with clear trust boundaries and consent controls.' },
                  { n: '02', t: 'Record Activity', d: 'Contributions are signed, timestamped, and linked to accountable actors on-chain.' },
                  { n: '03', t: 'Govern Transparently', d: 'Governance flows through AI-supported review with fully auditable decision logic.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <div className="shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                      <span className="text-xs font-mono text-white/40">{step.n}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{step.t}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-white/8 p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="space-y-3">
                  {[
                    { label: 'Proof submissions', value: '12,847', color: '#00f2ff' },
                    { label: 'Active validators', value: '341', color: '#ffd700' },
                    { label: 'Rights verified', value: '9,203', color: '#8b5cf6' },
                    { label: 'Governance proposals', value: '78', color: '#00ff88' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-white/50 text-sm font-mono">{stat.label}</span>
                      <span className="font-black text-xl tabular-nums" style={{ color: stat.color }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-xs font-mono text-white/20 uppercase tracking-widest">Testnet — live data</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector grid */}
      <section className="px-6 md:px-16 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-[#8b5cf6] mb-3">Deployment Sectors</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-12">Built for every<br/>sector of society.</h2>
          <div className="flex flex-wrap gap-3">
            {sectors.map((s) => (
              <div key={s} className="px-5 py-2.5 rounded-full border border-white/8 text-white/60 text-sm hover:border-white/20 hover:text-white transition-all cursor-default">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-6 md:px-16 py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            Build the rights<br/>infrastructure of tomorrow.
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            DRP is open, modular, and designed for institutional deployment. Read the whitepaper or launch the app today.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/whitepaper"
              className="px-8 py-3.5 rounded-full font-bold text-sm bg-[#00f2ff] text-black hover:bg-[#00d9e8] transition-all hover:scale-105"
              style={{ boxShadow: '0 0 32px rgba(0,242,255,0.3)' }}
            >
              Read Whitepaper
            </Link>
            <Link
              href="/docs"
              className="px-8 py-3.5 rounded-full font-bold text-sm border border-white/15 text-white hover:bg-white/5 transition-all"
            >
              View Documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#00f2ff] flex items-center justify-center">
                <span className="text-xs font-black text-black">D</span>
              </div>
              <span className="text-white font-semibold text-sm">Decentralized Rights Protocol</span>
            </div>
            <p className="text-white/30 text-xs">Infrastructure for verified rights. © {new Date().getFullYear()}</p>
          </div>
          <div className="flex gap-8 text-sm text-white/40">
            <Link href="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/tokens" className="hover:text-white transition-colors">Tokens</Link>
            <Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
            <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
