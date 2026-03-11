import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Sphere, Box, Text } from '@react-three/drei'
import * as THREE from 'three'

// Constants
const GRAVITY = -9.8
const AIR_RESISTANCE_FEATHER = 8.5
const AIR_RESISTANCE_STONE = 0.1

function DroppableItem({ position, mass, isFeather, isVacuum, isDropping, onHitGround }) {
  const meshRef = useRef()
  const velocity = useRef(0)
  const initialY = 10
  
  // Reset when dropping state changes
  useEffect(() => {
    if (!isDropping) {
      if (meshRef.current) {
        meshRef.current.position.y = initialY
      }
      velocity.current = 0
    }
  }, [isDropping, initialY])

  useFrame((state, delta) => {
    if (isDropping && meshRef.current) {
      // Basic Euler integration
      // F = ma -> a = F/m
      // F_gravity = m * g
      // F_drag = -c * v
      
      let acceleration = GRAVITY
      
      if (!isVacuum) {
        const dragCoefficient = isFeather ? AIR_RESISTANCE_FEATHER : AIR_RESISTANCE_STONE
        // a = (mg - cv) / m = g - (c/m)*v
        acceleration = GRAVITY - (dragCoefficient / mass) * velocity.current
      }

      // Update velocity and position
      velocity.current += acceleration * delta
      meshRef.current.position.y += velocity.current * delta

      // Ground collision
      if (meshRef.current.position.y <= -10) {
        meshRef.current.position.y = -10
        velocity.current = 0
        onHitGround(isFeather ? 'feather' : 'stone')
      }
    }
  })

  return (
    <group position={position} ref={meshRef}>
      {isFeather ? (
        <mesh>
          <planeGeometry args={[1, 2]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.8} />
          <Html center position={[0, -1.5, 0]}>
            <div style={{ color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>Feather</div>
          </Html>
        </mesh>
      ) : (
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#64748b" roughness={0.9} />
          <Html center position={[0, -1.5, 0]}>
            <div style={{ color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>Stone</div>
          </Html>
        </mesh>
      )}
    </group>
  )
}

export default function FreeFallDropSimulator() {
  const [isVacuum, setIsVacuum] = useState(false)
  const [isDropping, setIsDropping] = useState(false)
  const [results, setResults] = useState({ feather: null, stone: null })
  const startTime = useRef(0)

  const handleDrop = () => {
    setResults({ feather: null, stone: null })
    setIsDropping(true)
    startTime.current = performance.now()
  }

  const handleReset = () => {
    setIsDropping(false)
    setResults({ feather: null, stone: null })
  }

  const handleHitGround = (type) => {
    const timeTaken = ((performance.now() - startTime.current) / 1000).toFixed(2)
    setResults(prev => ({ ...prev, [type]: timeTaken }))
  }

  return (
    <div className="neu-card" style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Galilean Free Fall Chamber</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Observe how air resistance affects falling objects compared to a true vacuum.</p>
        </div>
        
        {/* Toggle Controls */}
        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(108,159,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '100px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: !isVacuum ? 'var(--accent-blue)' : 'var(--text-secondary)' }}>With Air</span>
          <div 
            onClick={() => { if(!isDropping) setIsVacuum(!isVacuum) }}
            style={{ 
              width: '50px', height: '26px', background: isVacuum ? 'var(--accent-purple)' : '#cbd5e1', 
              borderRadius: '13px', cursor: isDropping ? 'not-allowed' : 'pointer', position: 'relative', transition: 'all 0.3s ease'
          }}>
            <div style={{ 
              width: '22px', height: '22px', background: 'white', borderRadius: '50%', 
              position: 'absolute', top: '2px', left: isVacuum ? '26px' : '2px', transition: 'all 0.3s ease',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }} />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isVacuum ? 'var(--accent-purple)' : 'var(--text-secondary)' }}>Vacuum</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={handleDrop} 
          disabled={isDropping}
          className="interactive-btn"
          style={{ 
            background: isDropping ? '#cbd5e1' : 'var(--accent-blue)', color: 'white', border: 'none', 
            padding: '0.75rem 2rem', borderRadius: '8px', cursor: isDropping ? 'not-allowed' : 'pointer', fontWeight: 600
          }}>
          Drop Objects
        </button>
        <button 
          onClick={handleReset} 
          disabled={!isDropping}
          className="interactive-btn"
          style={{ 
            background: '#e2e8f0', color: 'var(--accent-black)', border: 'none', 
            padding: '0.75rem 2rem', borderRadius: '8px', cursor: !isDropping ? 'not-allowed' : 'pointer', fontWeight: 600
          }}>
          Reset
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '1rem' }}>
         <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
           Stone Drop Time: {results.stone ? `${results.stone}s` : '--'}
         </div>
         <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
           Feather Drop Time: {results.feather ? `${results.feather}s` : '--'}
         </div>
      </div>

      {/* 3D Vacuum Chamber */}
      <div style={{ width: '100%', height: '500px', backgroundColor: isVacuum ? '#020617' : '#e0f2fe', borderRadius: '16px', position: 'relative', overflow: 'hidden', border: `4px solid ${isVacuum ? '#334155' : '#bae6fd'}`, transition: 'background-color 0.5s ease' }}>
        <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          
          {/* Environment/Grid */}
          <gridHelper args={[20, 20, isVacuum ? '#334155' : '#94a3b8', isVacuum ? '#1e293b' : '#cbd5e1']} position={[0, -10, 0]} />
          
          {/* Feather - Very low mass so air resistance dominates */}
          <DroppableItem position={[-4, 10, 0]} mass={0.05} isFeather={true} isVacuum={isVacuum} isDropping={isDropping} onHitGround={handleHitGround} />
          
          {/* Stone - High mass, air resistance negligible */}
          <DroppableItem position={[4, 10, 0]} mass={5.0} isFeather={false} isVacuum={isVacuum} isDropping={isDropping} onHitGround={handleHitGround} />
        </Canvas>
        
        {/* Particle Effect Overlay for Air */}
        {!isVacuum && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3, backgroundImage: 'radial-gradient(circle, transparent 20%, #e0f2fe 20%, #e0f2fe 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #e0f2fe 20%, #e0f2fe 80%, transparent 80%, transparent)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }} />
        )}
      </div>
    </div>
  )
}
