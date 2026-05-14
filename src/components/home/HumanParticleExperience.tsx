'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SCENE_DATA = [
  {
    title: 'Broken Systems',
    description: 'A world fragmented. Trust is broken, and nodes drift in chaotic isolation. Data is siloed, and voices are lost in the noise.',
    accent: 'var(--drp-gray)'
  },
  {
    title: 'The Realization',
    description: 'In the stillness, we find clarity. The chaos slows as we recognize the need for a protocol that honors human dignity and verified action.',
    accent: 'var(--drp-blue)'
  },
  {
    title: 'Human Network',
    description: 'Abstract nodes transform into human figures. Connections emerge not from proximity, but from shared purpose and verified identity.',
    accent: 'var(--drp-cyan)'
  },
  {
    title: 'DRP Emergence',
    description: 'The protocol stabilizes. A resilient structure forms—the Decentralized Rights Protocol. Secure, transparent, and built for the long term.',
    accent: 'var(--drp-gold)'
  },
  {
    title: 'System In Action',
    description: 'Activity is verified. AI-supported governance flows through the network, rewarding stewardship and ensuring rights are protected by design.',
    accent: 'var(--drp-purple)'
  },
  {
    title: 'Future World',
    description: 'A harmonious ecosystem where humanity and technology coexist in balance. A world where rights are decentralized, and trust is the default.',
    accent: 'var(--drp-cyan)'
  }
]

// Human Node Geometry Shader (Abstract representation)
// For now, we'll use a custom shader or just points with specific behavior
const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uSceneProgress;
  uniform float uSceneIndex;
  
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;

  void main() {
    vColor = customColor;
    vec3 pos = position;
    
    // Scene-specific behavior logic (simplified for now)
    if (uSceneIndex == 0.0) { // Broken Systems - Chaos
      pos += sin(pos.z * 10.0 + uTime) * 0.1;
    } else if (uSceneIndex == 1.0) { // Realization - Slowing
      pos += sin(pos.z * 5.0 + uTime * 0.5) * 0.05;
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }
`

function HumanParticles({ sceneIndex, progress }: { sceneIndex: number; progress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = 1000 // Reduced count for instanced mesh detail
  
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      temp.push({ x, y, z, speed: 0.1 + Math.random() * 0.2 })
    }
    return temp
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    particles.forEach((p, i) => {
      const { x, y, z, speed } = p
      
      let targetX = x
      let targetY = y
      let targetZ = z
      
      // Scene Logic
      if (sceneIndex === 0) { // Broken
        targetX += Math.sin(time * speed + i) * 0.5
        targetY += Math.cos(time * speed + i) * 0.5
      } else if (sceneIndex >= 2) { // Human Network
        // Particles start aligning or forming clusters
        const angle = (i / count) * Math.PI * 2
        targetX = Math.cos(angle) * 5
        targetY = Math.sin(angle) * 5
        targetZ = Math.sin(time * 0.1 + i) * 2
      }
      
      dummy.position.set(targetX, targetY, targetZ)
      dummy.rotation.y = time * 0.2
      dummy.scale.setScalar(0.1)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshStandardMaterial 
          color="#00f2ff" 
          emissive="#00f2ff" 
          emissiveIntensity={1.5} 
          transparent 
          opacity={0.7}
        />
      </instancedMesh>
    </group>
  )
}

export function HumanParticleExperience() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Storytelling Scroll Logic
    const sections = gsap.utils.toArray('.story-section')
    
    sections.forEach((section: any, i: number) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setSceneIndex(i),
        onEnterBack: () => setSceneIndex(i),
        onUpdate: (self) => {
           if (sceneIndex === i) setProgress(self.progress)
        }
      })
    })
  }, [sceneIndex])

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600vh] bg-drp-bg">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <HumanParticles sceneIndex={sceneIndex} progress={progress} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Story Sections */}
      <div className="relative z-10">
        {SCENE_DATA.map((scene, i) => (
          <section key={scene.title} className="story-section h-screen flex items-center justify-center px-6">
             <div className="max-w-3xl text-center space-y-8 p-12 rounded-[2rem] bg-black/40 backdrop-blur-md border border-white/5">
                <p className="text-xs font-cinematic text-drp-gray opacity-50 tracking-[0.5em]">
                  Scene {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="text-5xl md:text-7xl font-cinematic" style={{ color: scene.accent }}>
                  {scene.title}
                </h2>
                <p className="text-xl md:text-2xl text-drp-gray leading-relaxed max-w-2xl mx-auto">
                  {scene.description}
                </p>
                {i === 5 && (
                  <div className="pt-8">
                    <button className="px-8 py-4 rounded-full bg-drp-cyan text-drp-bg font-bold hover:scale-110 transition-transform">
                      Enter the Protocol
                    </button>
                  </div>
                )}
             </div>
          </section>
        ))}
      </div>
    </div>
  )
}
