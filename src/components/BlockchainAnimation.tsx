'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BlockchainAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const particlesRef = useRef<THREE.Points[]>([])
  const animationIdRef = useRef<number>()

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.offsetWidth / canvasRef.current.offsetHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    })
    
    renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight)
    renderer.setClearColor(0x000000, 0)
    
    sceneRef.current = scene
    rendererRef.current = renderer

    // Create blockchain particles
    createBlockchainParticles(scene)
    
    // Camera position
    camera.position.z = 5
    
    // Start animation
    animate(scene, camera, renderer)
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current || !camera || !renderer) return
      
      camera.aspect = canvasRef.current.offsetWidth / canvasRef.current.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  const createBlockchainParticles = (scene: THREE.Scene) => {
    const particleCount = 100
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      // Random colors (blue to purple gradient)
      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    })
    
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current.push(particles)
    
    // Create connecting lines
    createConnectingLines(scene, positions)
  }

  const createConnectingLines = (scene: THREE.Scene, positions: Float32Array) => {
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions: number[] = []
    
    for (let i = 0; i < positions.length; i += 9) {
      for (let j = i + 9; j < positions.length; j += 9) {
        const distance = Math.sqrt(
          Math.pow(positions[i] - positions[j], 2) +
          Math.pow(positions[i + 1] - positions[j + 1], 2) +
          Math.pow(positions[i + 2] - positions[j + 2], 2)
        )
        
        if (distance < 3) {
          linePositions.push(positions[i], positions[i + 1], positions[i + 2])
          linePositions.push(positions[j], positions[j + 1], positions[j + 2])
        }
      }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.3
    })
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)
    particlesRef.current.push(lines as any)
  }

  const animate = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    const animateLoop = () => {
      animationIdRef.current = requestAnimationFrame(animateLoop)
      
      // Rotate particles
      particlesRef.current.forEach((particle, index) => {
        if (particle.rotation) {
          particle.rotation.x += 0.001 * (index + 1)
          particle.rotation.y += 0.002 * (index + 1)
        }
      })
      
      // Rotate camera slightly
      camera.position.x = Math.sin(Date.now() * 0.0001) * 0.5
      camera.position.y = Math.cos(Date.now() * 0.0001) * 0.5
      camera.lookAt(scene.position)
      
      renderer.render(scene, camera)
    }
    
    animateLoop()
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-30"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
