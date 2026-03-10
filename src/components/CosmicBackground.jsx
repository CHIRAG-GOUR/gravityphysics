import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ── Global State for Pointer (No Scroll Parallax anymore) ── */
const globalState = { mouseX: 0, mouseY: 0 }

/* ── Global Collision Registry for Planets ── */
// We store refs to all planets so they can check distances against each other
const planetRegistry = []

/* ── Interactive Physics Wrapper (Repulsion + Orbit + Bounce) ── */
function DynamicPlanet({ radius, speed, angleOffset, yOffset, size, isOrange }) {
  const ref = useRef()
  
  // Physics state
  const state = useMemo(() => ({
    velocity: new THREE.Vector3(0, 0, 0),
    baseY: yOffset,
    mass: size * 10,
    radius: size
  }), [size, yOffset])

  // Register this planet for collisions
  useEffect(() => {
    const planetData = { ref, state }
    planetRegistry.push(planetData)
    return () => {
      const idx = planetRegistry.indexOf(planetData)
      if (idx > -1) planetRegistry.splice(idx, 1)
    }
  }, [state])

  useFrame((ctx, delta) => {
    if (!ref.current) return
    
    const time = ctx.clock.elapsedTime
    
    // 1. Calculate ideal base orbital position
    const currentAngle = angleOffset + (time * speed)
    const baseX = Math.cos(currentAngle) * radius
    const baseZ = Math.sin(currentAngle) * radius
    const baseY = state.baseY + Math.sin(time * 2 + angleOffset) * 0.5 // subtle vertical wobble
    
    const idealPos = new THREE.Vector3(baseX, baseY, baseZ)
    
    // 2. Mouse Repulsion Force
    const pointerWorld = new THREE.Vector3(
      globalState.mouseX * (ctx.viewport.width / 2),
      globalState.mouseY * (ctx.viewport.height / 2),
      0
    )
    
    const worldPos = new THREE.Vector3()
    ref.current.getWorldPosition(worldPos)
    
    const dx = worldPos.x - pointerWorld.x
    const dy = worldPos.y - pointerWorld.y
    const distToPointer = Math.sqrt(dx*dx + dy*dy)
    const repelRadius = 4.0
    
    const mouseForce = new THREE.Vector3()
    if (distToPointer < repelRadius) {
      const forceMag = Math.pow(1 - distToPointer / repelRadius, 2) * 5.0
      const angle = Math.atan2(dy, dx)
      mouseForce.x = Math.cos(angle) * forceMag
      mouseForce.y = Math.sin(angle) * forceMag
      mouseForce.z = forceMag * 0.5
    }

    // 3. Planet-to-Planet Collision Detection (Elastic Bounce)
    const collisionForce = new THREE.Vector3()
    for (let i = 0; i < planetRegistry.length; i++) {
      const other = planetRegistry[i]
      if (other.ref === ref || !other.ref.current) continue
      
      const otherPos = new THREE.Vector3()
      other.ref.current.getWorldPosition(otherPos)
      
      const dist = worldPos.distanceTo(otherPos)
      const minDistance = state.radius + other.state.radius + 0.2 // slightly padded
      
      if (dist < minDistance && dist > 0) {
        // They are overlapping / colliding!
        // Push away from the other planet
        const pushDir = worldPos.clone().sub(otherPos).normalize()
        const overlap = minDistance - dist
        // Force is proportional to overlap and inversely proportional to our own mass
        const repelStrength = (overlap * 10.0) / state.mass
        collisionForce.add(pushDir.multiplyScalar(repelStrength))
      }
    }

    // Apply collision force to our velocity (with damping)
    state.velocity.add(collisionForce)
    state.velocity.multiplyScalar(0.9) // friction/damping so they don't fly away forever
    
    // Combine base orbit + mouse offset + velocity offset
    const finalTarget = idealPos.clone().add(mouseForce).add(state.velocity)
    
    // Lerp smoothly towards the calculated target
    ref.current.position.lerp(finalTarget, 0.1)
    
    // Rotate object itself for realism
    ref.current.rotation.y += delta * 0.5
    ref.current.rotation.x += delta * 0.2
  })

  return (
    <group ref={ref}>
      <mesh castShadow>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={isOrange ? "#FF7A00" : "#1a1a1a"} 
          roughness={isOrange ? 0.15 : 0.85} 
          metalness={isOrange ? 0.3 : 0.1} 
        />
      </mesh>
    </group>
  )
}

/* ── Large Central Sphere (The "Sun" / Main Body) ── */
function CentralSphere({ position }) {
  const ref = useRef()
  
  // Custom slow bobbing
  useFrame((state, d) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.003
      ref.current.rotation.y += d * 0.05
    }
  })

  // A single large glossy sphere representing the main gravitational body
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial color="#FF7A00" roughness={0.15} metalness={0.4} clearcoat={0.8} clearcoatRoughness={0.2} />
      </mesh>
      
      {/* Inner orbit ring attached to the central body */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
         <torusGeometry args={[2.6, 0.015, 16, 100]} />
         <meshStandardMaterial color="#FF7A00" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

/* ── Outer Orbital Rings Background ── */
function OrbitalRings() {
  const ref = useRef()
  useFrame((_s, d) => { if (ref.current) ref.current.rotation.z -= d * 0.02 })
  return (
    <group ref={ref} position={[0, 0, -2]}>
      <mesh>
        <torusGeometry args={[4.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0.2, -0.1, 0]}>
        <torusGeometry args={[6.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

/* ── Main Scene ── */
function Scene() {
  const groupRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      globalState.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      globalState.mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Slow entire scene group rotation to give depth to orbits
  useFrame((_s, d) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += d * 0.02
      groupRef.current.rotation.x += (globalState.mouseY * 0.05 - groupRef.current.rotation.x * 0.2) * 0.05
      groupRef.current.position.x += (globalState.mouseX * 0.6 - groupRef.current.position.x) * 0.02
    }
  })

  return (
    <>
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight position={[5, 12, 6]} intensity={1.8} color="#ffffff" castShadow shadow-mapSize={1024} />
      <directionalLight position={[-3, 4, -4]} intensity={0.5} color="#ffeedd" />

      {/* Orbital Rings Backdrop */}
      <OrbitalRings />

      {/* Zero-gravity planetary system */}
      <group ref={groupRef}>
        
        {/* The Central Body */}
        <CentralSphere position={[0, 0, 0]} />

        {/* Orbiting Planets (radius, speed, angleOffset, yOffset, size, isOrange) */}
        
        {/* Inner Orbits - Tight and fast */}
        <DynamicPlanet radius={2.8} speed={0.8} angleOffset={0} yOffset={1.0} size={0.25} isOrange={false} />
        <DynamicPlanet radius={3.2} speed={-0.6} angleOffset={2.5} yOffset={-1.2} size={0.2} isOrange={true} />
        <DynamicPlanet radius={3.5} speed={0.9} angleOffset={4} yOffset={1.8} size={0.3} isOrange={false} />

        {/* Mid Orbits - Criss-crossing paths to force collisions */}
        <DynamicPlanet radius={4.5} speed={0.5} angleOffset={1.5} yOffset={-0.5} size={0.4} isOrange={false} />
        <DynamicPlanet radius={4.8} speed={-0.45} angleOffset={3.5} yOffset={0.5} size={0.35} isOrange={true} />
        <DynamicPlanet radius={5.2} speed={0.6} angleOffset={5} yOffset={2.2} size={0.25} isOrange={false} />
        <DynamicPlanet radius={5.0} speed={-0.5} angleOffset={1.0} yOffset={-1.5} size={0.28} isOrange={true} />

        {/* Outer Orbits - Slower, heavier planets */}
        <DynamicPlanet radius={6.5} speed={0.25} angleOffset={1} yOffset={-2.5} size={0.45} isOrange={false} />
        <DynamicPlanet radius={7.0} speed={-0.22} angleOffset={4.5} yOffset={3.5} size={0.35} isOrange={false} />
        <DynamicPlanet radius={6.8} speed={0.28} angleOffset={6.2} yOffset={-3.5} size={0.3} isOrange={true} />
        <DynamicPlanet radius={7.5} speed={-0.25} angleOffset={2.8} yOffset={1.2} size={0.4} isOrange={false} />
        
        {/* Eccentric highly volatile orbits (Intersects inner rings) */}
        <DynamicPlanet radius={4.0} speed={1.2} angleOffset={0.5} yOffset={-3.0} size={0.15} isOrange={true} />
        <DynamicPlanet radius={5.5} speed={-1.1} angleOffset={3.2} yOffset={3.5} size={0.18} isOrange={false} />
      </group>

      {/* Soft Contact Shadow below scene */}
      <ContactShadows position={[0, -6.5, 0]} opacity={0.3} scale={40} blur={3.5} far={12} resolution={512} color="#1a1a1a" />
    </>
  )
}

export default function CosmicBackground() {
  return (
    <Canvas
      camera={{ position: [0, 1, 15], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      shadows
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%', display: 'block', position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    >
      <color attach="background" args={['#e0e0e0']} />
      <fog attach="fog" args={['#e0e0e0', 16, 42]} />
      <Scene />
    </Canvas>
  )
}
