import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Simple thumb component
function Thumb({ pushing, position }) {
  // A simple thumb shape made of a cylinder and sphere
  return (
    <group position={position}>
      {/* Visual thumb */}
      <mesh position={[0, pushing ? 1 : 1.5, 0]}>
         <capsuleGeometry args={[0.4, 0.8, 4, 16]} />
         <meshStandardMaterial color="#fca5a5" roughness={0.7} />
      </mesh>
      
      {/* Downward force animated arrow */}
      {pushing && (
         <group position={[1.5, 0.5, 0]}>
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
            <mesh position={[0, 0.3, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.2, 0.4, 16]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
         </group>
      )}
    </group>
  )
}

// Drawing pin component
function DrawingPin({ pushing }) {
  return (
    <group position={[0, pushing ? -0.5 : 0, 0]}>
      {/* Broad Head */}
      <mesh position={[0, 0, 0]}>
         <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
         <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Sharp Stem */}
      <mesh position={[0, -0.6, 0]}>
         <cylinderGeometry args={[0.05, 0.01, 1, 16]} />
         <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>
      
      {/* Arrow showing pressure spread on top handle vs concentrated point */}
      {pushing && (
        <>
          <Html position={[-1.5, 0, 0]} transform>
            <div style={{ background: 'rgba(59, 130, 246, 0.8)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '10px', whiteSpace: 'nowrap' }}>
              Large Area = Low Pressure<br/>(Thumb doesn't hurt)
            </div>
          </Html>
          <Html position={[0.5, -1.2, 0]} transform>
            <div style={{ background: 'rgba(239, 68, 68, 0.8)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '10px', whiteSpace: 'nowrap' }}>
              Tiny Area = High Pressure<br/>(Pierces wood)
            </div>
          </Html>
        </>
      )}
    </group>
  )
}

function Board({ pushing }) {
  const meshRef = useRef()
  
  // Animate the board material slightly when pierced
  useFrame(() => {
    if (meshRef.current) {
        meshRef.current.material.color.lerp(
            new THREE.Color(pushing ? '#fbbf24' : '#fcd34d'),
            0.1
        )
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -1.6, 0]}>
      <boxGeometry args={[4, 1, 4]} />
      <meshStandardMaterial roughness={0.9} />
    </mesh>
  )
}

export default function PinThrustSimulator() {
  const [pushing, setPushing] = useState(false)

  // Math variables
  const thrustForce = 20 // Newtons
  const thumbArea = 0.0001 // m^2 (approx 1 cm^2)
  const pinTipArea = 0.0000001 // m^2 (approx 0.1 mm^2)

  // Pressure calculations P = F / A
  const thumbPressure = thrustForce / thumbArea // 200,000 Pa
  const pinTipPressure = thrustForce / pinTipArea // 200,000,000 Pa!

  return (
    <div className="neu-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Pushing a Drawing Pin (Thrust vs Pressure)</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Press and hold the push button to apply <b>Thrust</b>. See how the broad head of the pin protects your thumb, but the sharp tip multiplies the pressure to pierce the wood!</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Environment Pane */}
        <div style={{ flex: '2 1 400px', height: '400px', backgroundColor: '#f8fafc', borderRadius: '16px', position: 'relative', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
           <Canvas>
             <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={40} />
             <ambientLight intensity={0.6} />
             <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
             
             <Thumb pushing={pushing} position={[0, 0, 0]} />
             <DrawingPin pushing={pushing} />
             <Board pushing={pushing} />
           </Canvas>
        </div>

        {/* Data readout */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          
          {/* Action Button */}
          <button 
             onMouseDown={() => setPushing(true)}
             onMouseUp={() => setPushing(false)}
             onMouseLeave={() => setPushing(false)}
             onTouchStart={() => setPushing(true)}
             onTouchEnd={() => setPushing(false)}
             style={{
               position: 'relative',
               padding: '1.5rem',
               borderRadius: '12px',
               background: pushing ? 'var(--accent-green)' : 'var(--accent-orange)',
               color: 'white',
               fontSize: '1.2rem',
               fontWeight: 'bold',
               border: 'none',
               cursor: 'pointer',
               boxShadow: pushing ? 'inset 0 4px 8px rgba(0,0,0,0.2)' : '0 6px 15px rgba(255,122,0,0.3)',
               transform: pushing ? 'translateY(4px)' : 'translateY(0)',
               transition: 'all 0.1s',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: '0.5rem'
             }}
          >
             <span>☝️ {pushing ? 'PUSHING PIN!' : 'PRESS AND HOLD'}</span>
             <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.8 }}>Applies {thrustForce} N of thrust</span>
          </button>

          {/* Results Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
             
             {/* Thumb side */}
             <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '12px', border: '1px solid #bbf7d0', opacity: pushing ? 1 : 0.5, transition: 'opacity 0.3s' }}>
                <h4 style={{ color: 'var(--accent-green)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>At Thumb (Top)</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Force = {thrustForce} N</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Area = Large</div>
                <div style={{ background: 'white', padding: '0.5rem', borderRadius: '6px', marginTop: '0.5rem', fontWeight: 'bold', color: 'var(--accent-green)', textAlign: 'center' }}>
                  Low Pressure
                </div>
             </div>

             {/* Wood side */}
             <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '12px', border: '1px solid #fecaca', opacity: pushing ? 1 : 0.5, transition: 'opacity 0.3s' }}>
                <h4 style={{ color: 'var(--accent-red)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>At Wood (Tip)</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Force = {thrustForce} N</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Area = Tiny</div>
                <div style={{ background: 'white', padding: '0.5rem', borderRadius: '6px', marginTop: '0.5rem', fontWeight: 'bold', color: 'var(--accent-red)', textAlign: 'center' }}>
                  High Pressure
                </div>
             </div>

          </div>
          
          {/* Detailed Math Dropdown */}
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', fontSize: '0.85rem' }}>
             <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>The Math (For 20N Thrust):</p>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.25rem' }}>
               <span>Top pressure:</span> <span style={{ fontFamily: 'monospace' }}>{(thumbPressure / 1000).toFixed(0)} kPa</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-red)', fontWeight: 'bold' }}>
               <span>Tip pressure:</span> <span style={{ fontFamily: 'monospace' }}>{(pinTipPressure / 1000000).toFixed(0)} MPa!</span>
             </div>
             <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.8rem' }}>
              The tip exerts 1,000x more pressure than the top, effortlessly breaking the wood's surface while leaving your thumb unharmed.
             </p>
          </div>

        </div>

      </div>
    </div>
  )
}
