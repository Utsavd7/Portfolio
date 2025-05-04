"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils } from "three"

export function Scene({ activeSection, isMobile, scrollProgress }) {
  // References for 3D objects
  const cameraRef = useRef()
  const gridRef = useRef()
  const sphere1Ref = useRef()
  const sphere2Ref = useRef()
  const sphere3Ref = useRef()
  const particlesRef = useRef()

  // Animation based on scroll position and active section
  useFrame((state, delta) => {
    const scrollOffset = scrollProgress || 0

    // Camera movement
    if (cameraRef.current) {
      // Smooth camera position changes based on scroll
      cameraRef.current.position.y = MathUtils.lerp(cameraRef.current.position.y, -scrollOffset * 20, 0.05)

      // Subtle camera rotation based on mouse position
      const mouseX = state.mouse.x * 0.1
      const mouseY = state.mouse.y * 0.1
      cameraRef.current.rotation.x = MathUtils.lerp(cameraRef.current.rotation.x, -mouseY * 0.1, 0.1)
      cameraRef.current.rotation.y = MathUtils.lerp(cameraRef.current.rotation.y, mouseX * 0.1, 0.1)
    }

    // Grid animation
    if (gridRef.current) {
      gridRef.current.position.y = -scrollOffset * 20
      gridRef.current.rotation.x = -Math.PI / 2

      // Pulse effect
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 0.95
      gridRef.current.scale.set(pulse, pulse, pulse)
    }

    // Sphere animations with more dynamic behaviors
    if (sphere1Ref.current) {
      // More complex orbit pattern
      const time = state.clock.elapsedTime
      sphere1Ref.current.position.x = Math.sin(time * 0.3) * 4
      sphere1Ref.current.position.z = Math.cos(time * 0.3) * 4
      sphere1Ref.current.position.y = Math.sin(time * 0.5) * 0.5 - scrollOffset * 20

      // Adjust visibility based on active section with smoother transitions
      const targetOpacity = activeSection === "home" || activeSection === "about" ? 0.8 : 0.1
      sphere1Ref.current.material.opacity = MathUtils.lerp(sphere1Ref.current.material.opacity, targetOpacity, 0.05)
    }

    if (sphere2Ref.current) {
      // Different orbit pattern
      const time = state.clock.elapsedTime
      sphere2Ref.current.position.x = Math.sin(time * 0.4 + 2) * 5
      sphere2Ref.current.position.z = Math.cos(time * 0.4 + 2) * 5
      sphere2Ref.current.position.y = Math.sin(time * 0.6) * 0.5 - scrollOffset * 20 + 5

      // Adjust visibility based on active section
      const targetOpacity = activeSection === "skills" || activeSection === "experience" ? 0.8 : 0.1
      sphere2Ref.current.material.opacity = MathUtils.lerp(sphere2Ref.current.material.opacity, targetOpacity, 0.05)
    }

    if (sphere3Ref.current) {
      // Another unique orbit
      const time = state.clock.elapsedTime
      sphere3Ref.current.position.x = Math.sin(time * 0.5 + 4) * 6
      sphere3Ref.current.position.z = Math.cos(time * 0.5 + 4) * 6
      sphere3Ref.current.position.y = Math.sin(time * 0.7) * 0.5 - scrollOffset * 20 + 10

      // Adjust visibility based on active section
      const targetOpacity = activeSection === "projects" || activeSection === "contact" ? 0.8 : 0.1
      sphere3Ref.current.material.opacity = MathUtils.lerp(sphere3Ref.current.material.opacity, targetOpacity, 0.05)
    }

    // Particles animation
    if (particlesRef.current) {
      particlesRef.current.position.y = -scrollOffset * 20
    }
  })

  return (
    <>
      {/* Camera */}
      <perspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 15]} />

      {/* Background color */}
      <color attach="background" args={["#050505"]} />

      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Main directional light */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />

      {/* Accent lights */}
      <pointLight position={[-5, 2, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[5, 0, -5]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[0, 3, 5]} intensity={0.3} color="#93c5fd" />

      {/* Grid */}
      <mesh ref={gridRef} rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <gridHelper args={[20, 20, "#333", "#333"]} />
      </mesh>

      {/* Spheres */}
      <mesh ref={sphere1Ref} position={[4, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.8} roughness={0.3} metalness={0.7} />
      </mesh>

      <mesh ref={sphere2Ref} position={[-4, 2, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.1} roughness={0.3} metalness={0.7} />
      </mesh>

      <mesh ref={sphere3Ref} position={[0, 3, -5]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.1} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(Array.from({ length: 3000 }, () => (Math.random() - 0.5) * 20))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#60a5fa" />
      </points>
    </>
  )
}
