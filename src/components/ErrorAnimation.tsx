'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ErrorAnimation() {
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

    // Create error particles
    createErrorParticles(scene)
    
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

  const createErrorParticles = (scene: THREE.Scene) => {
    const particleCount = 50
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      // Error colors (red to orange)
      const color = new THREE.Color()
      color.setHSL(0.1 + Math.random() * 0.1, 0.8, 0.6)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    })
    
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current.push(particles)
  }

  const animate = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    const animateLoop = () => {
      animationIdRef.current = requestAnimationFrame(animateLoop)
      
      // Rotate particles
      particlesRef.current.forEach((particle, index) => {
        if (particle.rotation) {
          particle.rotation.x += 0.002 * (index + 1)
          particle.rotation.y += 0.003 * (index + 1)
        }
      })
      
      // Rotate camera slightly
      camera.position.x = Math.sin(Date.now() * 0.0002) * 0.3
      camera.position.y = Math.cos(Date.now() * 0.0002) * 0.3
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
