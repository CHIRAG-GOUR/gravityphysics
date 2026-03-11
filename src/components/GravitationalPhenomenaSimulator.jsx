import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Sphere, Line, Preload, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Mode 1: Bound to Earth (Falling apple)
// Mode 2: Moon orbiting Earth
// Mode 3: Earth orbiting Sun
// Mode 4: Tides (Moon pulling Earth's oceans)

const MODES = [
  { id: 1, title: 'Binding to Earth', desc: 'Gravity pulls objects like apples towards the center of the Earth.' },
  { id: 2, title: 'Moon Orbit', desc: 'Earth\'s gravity constantly pulls the Moon, bending its path into an orbit.' },
  { id: 3, title: 'Planetary Orbit', desc: 'The Sun\'s massive gravity holds Earth and all planets in their orbits.' },
  { id: 4, title: 'Ocean Tides', desc: 'The Moon\'s gravitational pull on Earth creates high and low tides.' }
]

function FallingAppleScene() {
  const appleRef = useRef()
  const [reset, setReset] = useState(0)
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() % 3
    if (appleRef.current) {
      // Simulate falling with acceleration
      appleRef.current.position.y = Math.max(0, 8 - 4.9 * t * t)
      appleRef.current.rotation.x = t * 2
      appleRef.current.rotation.y = t * 1.5
    }
  })

  // Earth Surface
  return (
    <group position={[0, -4, 0]}>
      <mesh position={[0, -10, 0]}>
        <sphereGeometry args={[10, 64, 64]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} />
      </mesh>
      
      {/* Apple */}
      <group ref={appleRef} position={[0, 8, 0]}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.2]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      </group>
      
      <Text position={[-3, 4, 0]} fontSize={0.6} color="white" anchorX="left">
        F = G(Mm)/d²
      </Text>
      <Line points={[[0, 8, 0], [0, 0, 0]]} color="rgba(255,255,255,0.2)" dashed dashScale={1} />
    </group>
  )
}

function MoonOrbitScene() {
  const earthRef = useRef()
  const moonGroupRef = useRef()
  const moonRef = useRef()
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (earthRef.current) earthRef.current.rotation.y = t * 0.5
    if (moonGroupRef.current) moonGroupRef.current.rotation.y = t * 1.2
    if (moonRef.current) moonRef.current.rotation.y = t * 0.2
  })

  // Pre-calculate circular orbit path
  const orbitPoints = useMemo(() => {
    const points = []
    for(let i=0; i<=64; i++) {
      const angle = (i / 64) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * 5, 0, Math.sin(angle) * 5))
    }
    return points
  }, [])

  return (
    <group>
      <Line points={orbitPoints} color="rgba(255,255,255,0.15)" lineWidth={2} />
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.5} metalness={0.1} />
      </mesh>
      <group ref={moonGroupRef}>
        <mesh ref={moonRef} position={[5, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#9ca3af" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

function SolarSystemScene() {
  const sunRef = useRef()
  const earthGroupRef = useRef()
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (sunRef.current) sunRef.current.rotation.y = t * 0.1
    // Earth orbits Sun
    if (earthGroupRef.current) earthGroupRef.current.rotation.y = t * 0.8
  })

  const orbitPoints = useMemo(() => {
    const points = []
    for(let i=0; i<=64; i++) {
      const angle = (i / 64) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * 7, 0, Math.sin(angle) * 7))
    }
    return points
  }, [])

  return (
    <group position={[0, 0, -5]}>
      <Line points={orbitPoints} color="rgba(251,191,36,0.15)" lineWidth={2} />
      <mesh ref={sunRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
      </mesh>
      <pointLight color="#fbbf24" intensity={2} distance={50} />
      
      <group ref={earthGroupRef}>
        <mesh position={[7, 0, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </group>
    </group>
  )
}

function TidalScene() {
  const oceanRef = useRef()
  const moonGroupRef = useRef()
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Moon orbits slowly
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y = t * 0.5
    }
    // Ocean bulges follow the moon
    if (oceanRef.current) {
      oceanRef.current.rotation.y = t * 0.5
      // Scale X and Z to create the tidal bulge effect
      const bulge = 1.15 + Math.sin(t * 2) * 0.05 // subtle breathing effect
      oceanRef.current.scale.set(bulge, 1.0, 1.02)
    }
  })

  return (
    <group position={[0, -1, 0]}>
      {/* Solid Earth Core */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#1f4220" roughness={0.8} />
      </mesh>
      
      {/* Ocean Bulge */}
      <mesh ref={oceanRef}>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} roughness={0.1} />
      </mesh>
      
      <group ref={moonGroupRef}>
        <mesh position={[6, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
        
        {/* Force lines indicating pull */}
        <Line points={[[2.3, 0, 0], [5.5, 0, 0]]} color="rgba(255,122,0,0.5)" dashed dashScale={2} />
        <Line points={[[-2.3, 0, 0], [-3.5, 0, 0]]} color="rgba(255,122,0,0.3)" dashed dashScale={2} />
      </group>
      
      <Text position={[0, -3.5, 0]} fontSize={0.5} color="rgba(255,255,255,0.7)" anchorX="center">
        Moon's gravity pulls oceans, creating high and low tides
      </Text>
    </group>
  )
}

export default function GravitationalPhenomenaSimulator() {
  const [activeMode, setActiveMode] = useState(1)

  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.25rem' }}>Phenomena Simulator</h3>
          <p className="section-subtitle">Visualizing the 4 key effects of Universal Gravitation.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.05)', padding: '0.5rem', borderRadius: '50px', border: '1px solid rgba(0,0,0,0.05)' }}>
          {MODES.map(mode => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                border: 'none',
                background: activeMode === mode.id ? 'var(--gradient-primary)' : 'transparent',
                color: activeMode === mode.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeMode === mode.id ? '0 4px 10px rgba(108,159,255,0.3)' : 'none'
              }}
            >
              {mode.id}. {mode.title}
            </button>
          ))}
        </div>
      </div>

      <div style={{ 
        width: '100%', 
        height: '450px', 
        borderRadius: '16px', 
        overflow: 'hidden',
        position: 'relative',
        background: '#020617' 
      }}>
        <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
          <ambientLight intensity={0.5} />
          {activeMode === 1 && <pointLight position={[10, 10, 10]} intensity={1} />}
          {activeMode !== 3 && <directionalLight position={[5, 3, 5]} intensity={1.5} />}
          
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          {activeMode === 1 && <FallingAppleScene />}
          {activeMode === 2 && <MoonOrbitScene />}
          {activeMode === 3 && <SolarSystemScene />}
          {activeMode === 4 && <TidalScene />}
          
          <OrbitControls enableZoom={true} enablePan={false} maxDistance={20} minDistance={5} />
          <Preload all />
        </Canvas>
        
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          padding: '12px 16px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          color: 'rgba(255,255,255,0.9)',
          fontSize: '0.95rem',
          fontWeight: 500,
          borderLeft: '4px solid var(--accent-blue)'
        }}>
          {MODES.find(m => m.id === activeMode)?.desc}
        </div>
      </div>
    </div>
  )
}
