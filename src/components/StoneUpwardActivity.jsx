import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

function ThrownStone({ isThrown, initialVelocity, onReset }) {
  const meshRef = useRef()
  const velocity = useRef(0)
  const g = -9.8 // m/s^2

  useEffect(() => {
    if (isThrown) {
      velocity.current = initialVelocity
    } else {
      if (meshRef.current) {
        meshRef.current.position.y = -5 // Ground level
      }
      velocity.current = 0
    }
  }, [isThrown, initialVelocity])

  useFrame((state, delta) => {
    if (isThrown && meshRef.current) {
      // Update velocity
      velocity.current += g * delta
      // Update position
      meshRef.current.position.y += velocity.current * delta

      // Check ground collision
      if (meshRef.current.position.y <= -5) {
        meshRef.current.position.y = -5
        velocity.current = 0
        if (onReset) onReset()
      }
    }
  })

  return (
    <group ref={meshRef} position={[0, -5, 0]}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} />
      </mesh>
      
      {/* Velocity Vector Visualizer */}
      {isThrown && velocity.current !== 0 && (
         <group position={[1, 0, 0]}>
           <arrowHelper 
             args={[
               new THREE.Vector3(0, Math.sign(velocity.current), 0), 
               new THREE.Vector3(0, 0, 0), 
               Math.min(Math.abs(velocity.current) * 0.2, 3), 
               velocity.current > 0 ? 0xef4444 : 0x3b82f6
             ]} 
           />
           <Html position={[0.5, velocity.current > 0 ? 1 : -1, 0]}>
             <div style={{ color: velocity.current > 0 ? '#ef4444' : '#3b82f6', fontWeight: 'bold', fontSize: '12px', whiteSpace: 'nowrap' }}>
               v = {velocity.current.toFixed(1)} m/s
             </div>
           </Html>
         </group>
      )}
    </group>
  )
}

// Needed explicit import for THREE in the component scope since we use it in arrowHelper
import * as THREE from 'three'

export default function StoneUpwardActivity() {
  const [isThrown, setIsThrown] = useState(false)
  const [initialVelocity, setInitialVelocity] = useState(15) // m/s

  const handleThrow = () => {
    setIsThrown(true)
  }

  const handleReset = () => {
    setIsThrown(false)
  }

  return (
    <div className="neu-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Throwing a Stone Upwards</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Observe how Gravity acts against the motion when thrown up (slowing it down), stops it momentarily at the peak (v=0), and then pulls it back down (accelerating it).</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', background: 'rgba(108,159,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(108,159,255,0.2)' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Launch Settings</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '0.5rem' }}>
              <span>Initial Velocity (u)</span>
              <span style={{ color: 'var(--accent-purple)' }}>{initialVelocity} m/s</span>
            </label>
            <input 
              type="range" 
              min="5" 
              max="25" 
              value={initialVelocity} 
              onChange={(e) => setInitialVelocity(Number(e.target.value))} 
              disabled={isThrown}
              style={{ width: '100%', accentColor: 'var(--accent-purple)', cursor: isThrown ? 'not-allowed' : 'pointer' }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={handleThrow}
              disabled={isThrown}
              className="interactive-btn"
              style={{ flex: 1, background: isThrown ? '#cbd5e1' : 'var(--accent-blue)', color: 'white', padding: '0.75rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: isThrown ? 'not-allowed' : 'pointer' }}
            >
               Throw!
            </button>
            <button 
              onClick={handleReset}
              disabled={!isThrown}
              className="interactive-btn"
              style={{ flex: 1, background: '#e2e8f0', color: 'var(--accent-black)', padding: '0.75rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: !isThrown ? 'not-allowed' : 'pointer' }}
            >
               Reset
            </button>
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h5 style={{ color: 'var(--accent-orange)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Key Observations:</h5>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '1rem', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>Going Up: Velocity is positive, Acceleration (g) is negative. Stone slows down.</li>
              <li style={{ marginBottom: '0.5rem' }}>At Peak: Velocity is exactly <b>0 m/s</b>.</li>
              <li>Going Down: Velocity is negative, Acceleration (g) is negative. Stone speeds up.</li>
            </ul>
          </div>
        </div>

        <div style={{ flex: '2 1 400px', height: '450px', backgroundColor: '#e0f2fe', borderRadius: '16px', position: 'relative', overflow: 'hidden', border: '4px solid #bae6fd' }}>
           <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
             <ambientLight intensity={0.6} />
             <directionalLight position={[10, 10, 10]} intensity={1} />
             
             {/* Height markers */}
             <gridHelper args={[20, 20, '#94a3b8', '#cbd5e1']} position={[0, -5, 0]} />
             
             <ThrownStone isThrown={isThrown} initialVelocity={initialVelocity} onReset={() => setIsThrown(false)} />
           </Canvas>
        </div>
      </div>
    </div>
  )
}
