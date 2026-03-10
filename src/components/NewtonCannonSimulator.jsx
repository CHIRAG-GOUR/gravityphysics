import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Constants for simulation
const EARTH_RADIUS = 3.0
const MOUNT_HEIGHT = 0.6
const GRAVITY_CONSTANT = 50.0 // Scaled for visual effect

function EarthAndMountain() {
  return (
    <group>
      {/* Earth Body */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.7} metalness={0.1} />
        {/* Simple continent shapes for visual grounding */}
        <mesh position={[0, 0, EARTH_RADIUS]} rotation={[0,0,0]}>
           <torusGeometry args={[1.5, 0.4, 16, 100]} />
           <meshStandardMaterial color="#22c55e" roughness={0.9} />
        </mesh>
      </mesh>

      {/* Very Tall Mountain (Exaggerated) */}
      <mesh position={[0, EARTH_RADIUS + MOUNT_HEIGHT / 2 - 0.1, 0]} castShadow>
        <coneGeometry args={[0.5, MOUNT_HEIGHT, 32]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Cannonball({ launchVel, isFiring, onResult }) {
  const ref = useRef()
  const pathRef = useRef()
  
  // Physics state
  const pos = useRef(new THREE.Vector3(0, EARTH_RADIUS + MOUNT_HEIGHT, 0))
  const vel = useRef(new THREE.Vector3(launchVel, 0, 0)) // initial velocity is purely horizontal
  const active = useRef(false)
  const trajectory = useRef([]) // Store points for the trail

  useEffect(() => {
    // Reset Cannonball
    pos.current.set(0, EARTH_RADIUS + MOUNT_HEIGHT, 0)
    vel.current.set(launchVel, 0, 0)
    active.current = isFiring
    trajectory.current = [pos.current.clone()]
    
    if (ref.current) ref.current.position.copy(pos.current)
    if (pathRef.current) {
       pathRef.current.geometry.setFromPoints(trajectory.current)
    }
  }, [isFiring, launchVel])

  useFrame((_state, delta) => {
    if (!active.current || !ref.current) return

    // Limit delta to avoid huge jumps on lag
    const dt = Math.min(delta, 0.03)

    // Calculate gravity vector pulling toward center (0,0,0)
    const distSq = pos.current.lengthSq()
    const dist = Math.sqrt(distSq)
    
    if (dist <= EARTH_RADIUS) {
      // Impact!
      active.current = false
      pos.current.setLength(EARTH_RADIUS) // Snap to surface
      ref.current.position.copy(pos.current)
      onResult('impact')
      return
    }

    if (dist > EARTH_RADIUS * 4) {
      // Escape!
      active.current = false
      onResult('escape')
      return
    }

    // F = GM/r^2 (mass of cannonball is negligible, so accel = GM/r^2)
    const gravityAccel = GRAVITY_CONSTANT / distSq
    const gravityDir = pos.current.clone().normalize().negate()
    const accelVec = gravityDir.multiplyScalar(gravityAccel)

    // Update velocity and position
    vel.current.add(accelVec.multiplyScalar(dt))
    pos.current.add(vel.current.clone().multiplyScalar(dt))
    
    ref.current.position.copy(pos.current)

    // Save trail point every few frames (approximate with distance check)
    if (trajectory.current.length === 0 || pos.current.distanceTo(trajectory.current[trajectory.current.length - 1]) > 0.1) {
      trajectory.current.push(pos.current.clone())
      if (trajectory.current.length > 300) {
        trajectory.current.shift() // Limit trail length slightly for performance, but keep it long enough for full orbits
      }
      if (pathRef.current) {
        pathRef.current.geometry.setFromPoints(trajectory.current)
      }
      
      // Check for full orbit (passed starting X position again from the right side)
      if (trajectory.current.length > 50 && pos.current.x > 0 && pos.current.y > EARTH_RADIUS && vel.current.y < 0) {
         if (pos.current.distanceTo(new THREE.Vector3(0, EARTH_RADIUS + MOUNT_HEIGHT, 0)) < 0.5) {
             onResult('orbit')
             active.current = false // Stop tracing to signify success, but keep drawing
         }
      }
    }
  })

  return (
    <group>
      {/* The Cannonball */}
      <mesh ref={ref} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Trajectory Line */}
      <line ref={pathRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#fca5a5" linewidth={2} transparent opacity={0.6} />
      </line>
    </group>
  )
}

export default function NewtonCannonSimulator() {
  const [velocity, setVelocity] = useState(4.5)
  const [isFiring, setIsFiring] = useState(false)
  const [result, setResult] = useState(null) // 'impact', 'orbit', 'escape', null

  const handleFire = () => {
    setIsFiring(false) // Force reset
    setResult(null)
    setTimeout(() => setIsFiring(true), 50)
  }

  // Determine feedback text
  let feedbackText = "Adjust velocity and FIRE!"
  let feedbackColor = "var(--text-muted)"
  
  if (result === 'impact') {
    feedbackText = "💥 Impact! Velocity was too low, gravity pulled it down."
    feedbackColor = "#dc2626" // Red
  } else if (result === 'orbit') {
    feedbackText = "🌍 Stable Orbit Achieved! The ball is falling around the Earth."
    feedbackColor = "#059669" // Green
  } else if (result === 'escape') {
    feedbackText = "🚀 Escape Velocity! The ball leaves Earth's gravitational pull."
    feedbackColor = "#2563eb" // Blue
  } else if (isFiring) {
    feedbackText = "Calculating trajectory..."
    feedbackColor = "var(--accent-gold)"
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
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold), #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#fff', fontWeight: 700, boxShadow: '0 0 12px rgba(234,88,12,0.3)' }}>
          NC
        </div>
        <h3 className="section-title" style={{ marginBottom: 0 }}>Newton's Cannonball</h3>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        If you fire a cannonball fast enough from a tall mountain, its curved path matching Earth's curvature results in a perfect orbit. Too slow and it crashes; too fast and it escapes!
      </p>

      <div style={{ background: '#f8fafc', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--card-border)' }}>
        
        {/* Controls */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Launch Velocity</label>
              <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{velocity.toFixed(1)} km/s</span>
            </div>
            <input 
              type="range" 
              min="2.0" 
              max="9.0" 
              step="0.1" 
              value={velocity}
              onChange={(e) => { setVelocity(parseFloat(e.target.value)); setIsFiring(false); setResult(null); }}
              className="sim-slider"
              style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
               <span>Crash</span>
               <span>Orbit</span>
               <span>Escape</span>
            </div>
          </div>
          
          <button 
             onClick={handleFire}
             style={{
               background: 'var(--accent-gold)', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px',
               fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-heading)', letterSpacing: '0.5px',
               boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)', transition: 'all 0.2s',
               display: 'flex', gap: '0.5rem', alignItems: 'center'
             }}
           >
             <span>🔥</span> FIRE CANNON
           </button>
        </div>

        {/* Feedback Bar */}
        <div style={{ 
          padding: '0.75rem 1rem', borderRadius: '6px', background: `${feedbackColor}15`, 
          borderLeft: `4px solid ${feedbackColor}`, color: feedbackColor, 
          fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem'
        }}>
           {feedbackText}
        </div>

        {/* 3D Canvas Area */}
        <div style={{ height: '450px', width: '100%', borderRadius: '8px', overflow: 'hidden', background: '#0f172a', border: '1px solid #1e293b', boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.5)' }}>
          <Canvas camera={{ position: [0, 2, 12], fov: 50 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 5, 2]} intensity={1.5} />
            
            {/* Very simple starfield background */}
            <points>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={200}
                  array={new Float32Array(600).map(() => (Math.random() - 0.5) * 50)}
                  itemSize={3}
                />
              </bufferGeometry>
              <pointsMaterial color="#ffffff" size={0.1} sizeAttenuation />
            </points>

            <EarthAndMountain />
            <Cannonball launchVel={velocity} isFiring={isFiring} onResult={setResult} />
          </Canvas>
        </div>
      </div>
    </motion.div>
  )
}
