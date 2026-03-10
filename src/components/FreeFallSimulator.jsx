import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment } from '@react-three/drei'
import * as THREE from 'three'

// --- Physics Engine for the Drop ---
const GRAVITY = 9.8 // m/s^2
const TIME_STEP = 0.016 // ~60fps

function DropItem({ isFeather, isDropping, useVacuum, resetTrigger, onHitGround }) {
  const ref = useRef()
  const posY = useRef(3.5)
  const velY = useRef(0)

  // Physical properties
  const mass = isFeather ? 0.05 : 5.0 // kg
  // Air resistance coefficient: Feather is light but has huge drag. Ball is heavy, low drag.
  const dragCoef = isFeather ? 1.5 : 0.05 

  useEffect(() => {
    // Reset state
    posY.current = 3.5
    velY.current = 0
    if (ref.current) ref.current.position.y = 3.5
  }, [resetTrigger])

  useFrame(() => {
    if (!isDropping || !ref.current) return
    if (posY.current <= -3.5) {
      if (posY.current !== -3.5) {
        posY.current = -3.5
        ref.current.position.y = -3.5
        onHitGround()
      }
      return
    }

    // F = ma -> a = F/m
    // F_gravity = m * g
    const forceGravity = mass * GRAVITY
    
    // F_drag = c * v^2 (simplified, applying upwards)
    let forceDrag = 0
    if (!useVacuum) {
      forceDrag = dragCoef * (velY.current * velY.current)
    }

    // Net force (downwards is positive in this local math context)
    const netForce = forceGravity - forceDrag
    
    // a = netForce / m
    const acceleration = netForce / mass
    
    // Update velocity and position
    velY.current += acceleration * TIME_STEP
    posY.current -= velY.current * TIME_STEP

    // Prevent passing through floor
    if (posY.current <= -3.5) {
      posY.current = -3.5
      velY.current = 0
    }

    ref.current.position.y = posY.current
  })

  // Visuals
  return (
    <group ref={ref} position={[isFeather ? 1.5 : -1.5, 3.5, 0]}>
      {isFeather ? (
        // Feather Representation (A lightweight curved shape)
        <mesh rotation={[0, 0, 0.5]} castShadow>
          <planeGeometry args={[0.5, 1.2]} />
          <meshStandardMaterial color="#A78BFA" metalness={0.1} roughness={0.8} />
          {/* Using HTML text as a simple fallback graphic for 'feather' */}
          <Html position={[0,0,0]} center style={{ pointerEvents: 'none', userSelect: 'none' }}>
            <div style={{ fontSize: '2rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }}>🪶</div>
          </Html>
        </mesh>
      ) : (
        // Heavy Ball
        <mesh castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.2} />
        </mesh>
      )}
      
      <Html position={[0, -0.8, 0]} center>
         <div style={{ background: 'rgba(255,255,255,0.9)', padding: '2px 8px', borderRadius: 4, fontSize: '10px', fontWeight: 'bold' }}>
           {isFeather ? '0.05 kg' : '5.0 kg'}
         </div>
      </Html>
    </group>
  )
}

function Chamber({ useVacuum }) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -4, 0]} receiveShadow>
        <boxGeometry args={[6, 1, 4]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      {/* Glass Box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 7.5, 2.5]} />
        <meshStandardMaterial color={useVacuum ? "#a5f3fc" : "#e2e8f0"} transparent opacity={useVacuum ? 0.15 : 0.08} />
      </mesh>
    </group>
  )
}

export default function FreeFallSimulator() {
  const [isDropping, setIsDropping] = useState(false)
  const [useVacuum, setUseVacuum] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(0)

  const handleDrop = () => {
    if (isDropping) {
      // Reset
      setIsDropping(false)
      setResetTrigger(prev => prev + 1)
    } else {
      setIsDropping(true)
    }
  }

  return (
    <motion.div
      className="neu-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#fff', fontWeight: 700, boxShadow: '0 0 12px rgba(108,159,255,0.3)' }}>
          FF
        </div>
        <h3 className="section-title" style={{ marginBottom: 0 }}>Free Fall & Vacuum Chamber</h3>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Galileo proved that lacking air resistance, all objects fall at the exact same rate regardless of their mass. Toggle the vacuum chamber to see the difference!
      </p>

      <div style={{ background: '#f8fafc', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--card-border)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
           <div className="sim-panel" style={{ display: 'flex', gap: '1.5rem', background: '#fff' }}>
             <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
               <input 
                  type="radio" 
                  checked={!useVacuum} 
                  onChange={() => { setUseVacuum(false); setIsDropping(false); setResetTrigger(p=>p+1) }} 
                  style={{ accentColor: 'var(--accent-blue)' }}
               />
               🌎 Normal Air
             </label>
             <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
               <input 
                  type="radio" 
                  checked={useVacuum} 
                  onChange={() => { setUseVacuum(true); setIsDropping(false); setResetTrigger(p=>p+1) }} 
                  style={{ accentColor: 'var(--accent-purple)' }}
               />
               🌌 Perfect Vacuum
             </label>
           </div>
           
           <button 
             onClick={handleDrop}
             style={{
               background: isDropping ? '#ef4444' : 'var(--accent-blue)',
               color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px',
               fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-heading)',
               boxShadow: isDropping ? '0 4px 12px rgba(239, 68, 68, 0.3)' : '0 4px 12px rgba(108, 159, 255, 0.3)',
               transition: 'all 0.2s'
             }}
           >
             {isDropping ? 'Reset Items' : 'Drop Objects'}
           </button>
        </div>

        {/* 3D Canvas Area */}
        <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden', background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)', border: '1px solid #cbd5e1', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.05)' }}>
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} shadows>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
            <Environment preset="city" />
            
            <Chamber useVacuum={useVacuum} />
            <DropItem isFeather={false} isDropping={isDropping} useVacuum={useVacuum} resetTrigger={resetTrigger} onHitGround={() => {}} />
            <DropItem isFeather={true} isDropping={isDropping} useVacuum={useVacuum} resetTrigger={resetTrigger} onHitGround={() => {}} />
          </Canvas>
        </div>
      </div>
    </motion.div>
  )
}
