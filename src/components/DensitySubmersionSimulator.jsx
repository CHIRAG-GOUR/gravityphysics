import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment, Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Density Submersion Simulator
 * Features a beaker of water and draggable objects (Iron Nail, Cork, Wood).
 * Objects sink or float based on their density relative to water.
 */

const WATER_DENSITY = 1000 // kg/m³

const OBJECT_TYPES = {
  IRON_NAIL: {
    name: 'Iron Nail',
    density: 7874,
    color: '#4a4a4a',
    model: 'nail',
    scale: 0.5
  },
  CORK: {
    name: 'Cork',
    density: 240,
    color: '#d2b48c',
    model: 'cork',
    scale: 1.2
  },
  WOOD_BLOCK: {
    name: 'Wooden Block',
    density: 600,
    color: '#8b4513',
    model: 'block',
    scale: 1.0
  }
}

// 3D Models
const NailModel = ({ color }) => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <mesh position={[0, 0.4, 0]}>
      <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
    <mesh position={[0, 0.8, 0]}>
      <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
    <mesh position={[0, 0, 0]}>
      <coneGeometry args={[0.05, 0.2, 8]} rotation={[Math.PI, 0, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  </group>
)

const CorkModel = ({ color }) => (
  <mesh>
    <cylinderGeometry args={[0.4, 0.35, 0.8, 16]} />
    <meshStandardMaterial color={color} roughness={0.9} />
  </mesh>
)

const BlockModel = ({ color }) => (
  <mesh>
    <boxGeometry args={[0.8, 0.8, 0.8]} />
    <meshStandardMaterial color={color} roughness={0.8} />
  </mesh>
)

const PhysicalObject = ({ type, position, isDropped, isResetting }) => {
  const meshRef = useRef()
  const [currentY, setCurrentY] = useState(position[1])
  const [velocity, setVelocity] = useState(0)

  useFrame((state, delta) => {
    if (isResetting) {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.1)
      return
    }

    if (!isDropped) {
      meshRef.current.position.y = position[1]
      return
    }

    const objData = OBJECT_TYPES[type]
    const gravity = -9.8
    const waterLevel = 0
    const bottomLevel = -2.5
    
    let accel = gravity

    // Buoyancy check
    if (meshRef.current.position.y < waterLevel) {
      // Simple buoyancy model: Upward force = V * rho_fluid * g
      // Net acceleration = gravity + (buoyancy / mass)
      // Since mass = V * rho_obj, net accel = gravity * (1 - rho_fluid / rho_obj)
      accel = gravity * (1 - WATER_DENSITY / objData.density)
      
      // Add "water drag"
      accel -= velocity * 2
    }

    const newVel = velocity + accel * delta
    let newY = meshRef.current.position.y + newVel * delta

    // Floor collision
    if (newY < bottomLevel) {
      newY = bottomLevel
      setVelocity(0)
    } else {
      setVelocity(newVel)
    }

    meshRef.current.position.y = newY
  })

  return (
    <group ref={meshRef} position={position} scale={OBJECT_TYPES[type].scale}>
      {type === 'IRON_NAIL' && <NailModel color={OBJECT_TYPES[type].color} />}
      {type === 'CORK' && <CorkModel color={OBJECT_TYPES[type].color} />}
      {type === 'WOOD_BLOCK' && <BlockModel color={OBJECT_TYPES[type].color} />}
    </group>
  )
}

const Beaker = () => (
  <group>
    {/* Beaker Glass */}
    <mesh position={[0, -1.3, 0]}>
      <cylinderGeometry args={[2, 2, 3, 32, 1, true]} />
      <meshPhysicalMaterial 
        color="#ffffff" 
        transmission={0.9} 
        thickness={0.1} 
        roughness={0} 
        transparent 
        opacity={0.3} 
        side={THREE.DoubleSide}
      />
    </mesh>
    {/* Beaker Bottom */}
    <mesh position={[0, -2.8, 0]}>
      <cylinderGeometry args={[2, 2, 0.1, 32]} />
      <meshStandardMaterial color="#ccc" transparent opacity={0.5} />
    </mesh>
    {/* Water */}
    <mesh position={[0, -1.4, 0]}>
      <cylinderGeometry args={[1.95, 1.95, 2.8, 32]} />
      <meshPhysicalMaterial 
        color="#0077be" 
        transmission={0.6} 
        opacity={0.5} 
        transparent 
        roughness={0.1}
      />
    </mesh>
  </group>
)

export default function DensitySubmersionSimulator() {
  const [selectedType, setSelectedType] = useState('WOOD_BLOCK')
  const [isDropped, setIsDropped] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleDrop = () => {
    setIsDropped(true)
    setIsResetting(false)
  }

  const handleReset = () => {
    setIsDropped(false)
    setIsResetting(true)
    setTimeout(() => setIsResetting(false), 500)
  }

  const handleSelect = (type) => {
    setSelectedType(type)
    handleReset()
  }

  const currentObj = OBJECT_TYPES[selectedType]
  const doesFloat = currentObj.density < WATER_DENSITY

  return (
    <div className="orbit-canvas" style={{ position: 'relative', height: '600px', maxWidth: '1000px', margin: '0 auto', overflow: 'hidden' }}>
      
      {/* 3D Scene */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[5, 2, 8]} fov={45} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <Beaker />
          
          <PhysicalObject 
            key={selectedType + (isResetting ? '-res' : '')}
            type={selectedType} 
            position={[0, 3, 0]} 
            isDropped={isDropped}
            isResetting={isResetting}
          />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 20, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '0.5rem' }}>Float or Sink?</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '300px', fontSize: '0.875rem' }}>Density determines if the upward push of water can overcome an object's weight.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
              {Object.keys(OBJECT_TYPES).map(type => (
                <button
                  key={type}
                  onClick={() => handleSelect(type)}
                  style={{
                    padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: '600', transition: 'all 0.3s', cursor: 'pointer', border: 'none', textAlign: 'left',
                    ...(selectedType === type 
                        ? { background: 'var(--accent-blue)', color: 'white', boxShadow: '0 0 15px rgba(74, 108, 247, 0.5)' } 
                        : { background: 'rgba(26, 26, 42, 0.8)', color: 'rgba(255,255,255,0.7)' }
                    )
                  }}
                  onMouseOver={(e) => { if (selectedType !== type) e.currentTarget.style.background = 'rgba(26, 26, 42, 0.9)'; }}
                  onMouseOut={(e) => { if (selectedType !== type) e.currentTarget.style.background = 'rgba(26, 26, 42, 0.8)'; }}
                >
                  {OBJECT_TYPES[type].name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(26, 26, 42, 0.9)', backdropFilter: 'blur(12px)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', width: '256px', pointerEvents: 'auto' }}>
            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Material Profile</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>Density</div>
                <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', color: 'white' }}>
                  {currentObj.density} <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>kg/m³</span>
                </div>
              </div>

              <div style={{ height: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div 
                  style={{ height: '100%', background: doesFloat ? '#51cf66' : '#ff6b6b' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (currentObj.density / WATER_DENSITY) * 50)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', marginTop: '-8px' }}>
                <span>0</span>
                <span style={{ color: '#748ffc' }}>WATER (1000)</span>
              </div>

              <div style={{
                textAlign: 'center', padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 'bold', fontSize: '0.875rem',
                background: doesFloat ? 'rgba(81, 207, 102, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                color: doesFloat ? '#51cf66' : '#ff6b6b',
                border: `1px solid ${doesFloat ? 'rgba(81, 207, 102, 0.3)' : 'rgba(255, 107, 107, 0.3)'}`
              }}>
                {doesFloat ? 'WILL FLOAT' : 'WILL SINK'}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', pointerEvents: 'auto' }}>
          {!isDropped ? (
            <button 
              onClick={handleDrop}
              style={{ background: 'var(--accent-blue)', color: 'white', padding: '0.75rem 2rem', borderRadius: 'var(--radius-sm)', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(74, 108, 247, 0.4)' }}
            >
              DROP OBJECT
            </button>
          ) : (
            <button 
              onClick={handleReset}
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.75rem 2rem', borderRadius: 'var(--radius-sm)', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}
            >
              RESET
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
