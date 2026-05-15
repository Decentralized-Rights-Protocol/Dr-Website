'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Float, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SCENE_DATA = [
  {
    title: 'Broken Systems',
    description: 'A world fragmented. Trust is broken, and nodes drift in chaotic isolation. Data is siloed, and voices are lost in the noise.',
    accent: '#8b5cf6'
  },
  {
    title: 'The Realization',
    description: 'In the stillness, we find clarity. The chaos slows as we recognize the need for a protocol that honors human dignity and verified action.',
    accent: '#3b82f6'
  },
  {
    title: 'Human Network',
    description: 'Abstract nodes transform into human figures. Connections emerge not from proximity, but from shared purpose and verified identity.',
    accent: '#00f2ff'
  },
  {
    title: 'DRP Emergence',
    description: 'The protocol stabilizes. A resilient structure forms—the Decentralized Rights Protocol. Secure, transparent, and built for the long term.',
    accent: '#ffcc33'
  },
  {
    title: 'System In Action',
    description: 'Activity is verified. AI-supported governance flows through the network, rewarding stewardship and ensuring rights are protected by design.',
    accent: '#8b5cf6'
  },
  {
    title: 'Future World',
    description: 'A harmonious ecosystem where humanity and technology coexist in balance. A world where rights are decentralized, and trust is the default.',
    accent: '#00f2ff'
  }
]

function HumanParticles({ sceneIndex, progress }: { sceneIndex: number; progress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = 1200
  
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30
      const y = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 30
      temp.push({ x, y, z, speed: 0.1 + Math.random() * 0.2, offset: Math.random() * 100 })
    }
    return temp
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    particles.forEach((p, i) => {
      let { x, y, z, speed, offset } = p
      
      let targetX = x
      let targetY = y
      let targetZ = z
      
      if (sceneIndex === 0) { // Broken Systems: Chaos
        targetX += Math.sin(time * speed + offset) * 2
        targetY += Math.cos(time * speed + offset) * 2
        targetZ += Math.sin(time * 0.5 + offset) * 2
      } else if (sceneIndex === 1) { // Realization: Slowing down
        const slowFactor = 1 - progress
        targetX += Math.sin(time * speed * slowFactor + offset) * (2 * slowFactor)
        targetY += Math.cos(time * speed * slowFactor + offset) * (2 * slowFactor)
      } else if (sceneIndex === 2) { // Human Network: Forming a Sphere/Net
        const angle = (i / count) * Math.PI * 2
        const radius = 8
        targetX = Math.cos(angle) * radius + Math.sin(time * 0.2 + i) * 0.5
        targetY = Math.sin(angle) * radius + Math.cos(time * 0.2 + i) * 0.5
        targetZ = Math.sin(time * 0.1 + i) * 5
      } else if (sceneIndex === 3) { // DRP Emergence: Structured Grid
        const gridSize = 10
        const ix = i % gridSize
        const iy = Math.floor(i / gridSize) % gridSize
        const iz = Math.floor(i / (gridSize * gridSize))
        targetX = (ix - gridSize / 2) * 2
        targetY = (iy - gridSize / 2) * 2
        targetZ = (iz - gridSize / 2) * 2
      } else if (sceneIndex >= 4) { // System in action: Flowing up
        targetX = x * 0.5
        targetY = ((y + time * 2) % 30) - 15
        targetZ = z * 0.5
      }
      
      dummy.position.set(targetX, targetY, targetZ)
      dummy.rotation.y = time * 0.5
      dummy.scale.setScalar(0.08 + Math.sin(time + i) * 0.02)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
      <meshStandardMaterial 
        color="#00f2ff" 
        emissive="#00f2ff" 
        emissiveIntensity={2} 
        transparent 
        opacity={0.6}
      />
    </instancedMesh>
  )
}

function CinematicCamera({ sceneIndex, progress }: { sceneIndex: number; progress: number }) {
  const { camera } = useThree()
  const currentPos = useRef(new THREE.Vector3(0, 0, 20))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    let targetPos = new THREE.Vector3(0, 0, 20)
    let targetLookAt = new THREE.Vector3(0, 0, 0)

    switch (sceneIndex) {
      case 0:
        targetPos.set(10 * Math.sin(progress * 2), 5 * Math.cos(progress), 20)
        break
      case 1:
        targetPos.set(0, 0, 15 - progress * 5)
        break
      case 2:
        targetPos.set(12, 8, 12)
        targetLookAt.set(0, 0, 0)
        break
      case 3:
        targetPos.set(0, 0, 10)
        break
      case 4:
        targetPos.set(-15, 0, 15)
        targetLookAt.set(0, 5, 0)
        break
      case 5:
        targetPos.set(0, 0, 25)
        break
    }

    currentPos.current.lerp(targetPos, 0.03)
    currentLookAt.current.lerp(targetLookAt, 0.03)
    
    camera.position.copy(currentPos.current)
    camera.lookAt(currentLookAt.current)
  })

  return null
}

export function HumanParticleExperience() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = gsap.utils.toArray('.story-section')
    
    sections.forEach((section: any, i: number) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setSceneIndex(i),
        onEnterBack: () => setSceneIndex(i),
        onUpdate: (self) => {
          if (self.isActive) setProgress(self.progress)
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full bg-drp-bg overflow-x-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas shadowMap>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={50} />
          <CinematicCamera sceneIndex={sceneIndex} progress={progress} />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
          <spotLight position={[0, 20, 0]} intensity={2} penumbra={1} castShadow />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <HumanParticles sceneIndex={sceneIndex} progress={progress} />
          
          <fog attach="fog" args={['#050505', 10, 50]} />
        </Canvas>
      </div>

      {/* Story Sections */}
      <div className="relative z-10">
        {SCENE_DATA.map((scene, i) => (
          <section key={scene.title} className="story-section min-h-screen flex items-center justify-center px-6">
             <div 
               className="max-w-3xl text-center space-y-8 p-12 md:p-16 rounded-[3rem] bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-1000"
               style={{ 
                 opacity: sceneIndex === i ? 1 : 0,
                 transform: `translateY(${sceneIndex === i ? 0 : 50}px)`,
                 boxShadow: sceneIndex === i ? `0 0 80px -20px ${scene.accent}44` : 'none'
               }}
             >
                <div className="space-y-4">
                  <p className="text-[10px] font-cinematic tracking-[0.6em] text-white/40 uppercase">
                    Stage {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
                    {scene.title}
                  </h2>
                  <div className="h-1 w-24 mx-auto rounded-full" style={{ backgroundColor: scene.accent }} />
                </div>
                
                <p className="text-xl md:text-2xl text-drp-gray leading-relaxed max-w-2xl mx-auto font-light">
                  {scene.description}
                </p>
                
                {i === 5 && (
                  <div className="pt-12">
                    <button 
                      onClick={() => window.location.href = '/dashboard'}
                      className="group relative px-12 py-5 rounded-full bg-white text-black font-cinematic text-xs font-bold transition-all hover:scale-105 hover:bg-drp-cyan"
                    >
                      Initialize Protocol
                      <div className="absolute inset-0 rounded-full bg-white blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                    </button>
                  </div>
                )}
             </div>
          </section>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {SCENE_DATA.map((_, i) => (
          <div 
            key={i}
            className="w-1 transition-all duration-500 rounded-full"
            style={{ 
              height: sceneIndex === i ? '40px' : '8px',
              backgroundColor: sceneIndex === i ? SCENE_DATA[i].accent : 'rgba(255,255,255,0.1)'
            }}
          />
        ))}
      </div>
    </div>
  )
}
