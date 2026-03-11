import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

function Scene({ speed, isCut, onReset }) {
  const centerRef = useRef()
  const stringRef = useRef()
  const stoneRef = useRef()
  const vectorRef = useRef()
  
  // Physics state
  const radius = 4
  const angleRef = useRef(0)
  const cutAngleRef = useRef(0)
  const cutPosRef = useRef(new THREE.Vector3())
  const cutVelRef = useRef(new THREE.Vector3())
  
  // Trail state
  const [trail, setTrail] = useState([])
  const trailRef = useRef([])

  useEffect(() => {
    if (!isCut) {
      trailRef.current = []
      setTrail([])
    }
  }, [isCut])

  useFrame((state, delta) => {
    if (!stoneRef.current) return

    if (!isCut) {
      // Spinning around center
      angleRef.current += speed * delta
      const x = Math.cos(angleRef.current) * radius
      const z = Math.sin(angleRef.current) * radius
      
      stoneRef.current.position.set(x, 0, z)
      
      // Update string
      if (stringRef.current) {
        stringRef.current.geometry.setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x, 0, z)
        ])
      }

      // Update force vector (pointing towards center)
      if (vectorRef.current) {
        vectorRef.current.geometry.setFromPoints([
          new THREE.Vector3(x, 0, z),
          new THREE.Vector3(x * 0.5, 0, z * 0.5) // Arrow half way to center
        ])
      }

      // Save Cut state for Tangent trajectory
      cutAngleRef.current = angleRef.current
      cutPosRef.current.set(x, 0, z)
      // Tangent velocity vector is perpendicular to position vector
      cutVelRef.current.set(-Math.sin(angleRef.current), 0, Math.cos(angleRef.current)).multiplyScalar(speed * radius)
      
    } else {
      // String is cut! Move in straight line tangent to the circle
      cutPosRef.current.add(cutVelRef.current.clone().multiplyScalar(delta))
      stoneRef.current.position.copy(cutPosRef.current)
      
      // Hide string and force vector
      if (stringRef.current) stringRef.current.visible = false
      if (vectorRef.current) vectorRef.current.visible = false
      
      // Add to trail
      if (trailRef.current.length < 50) {
        if (trailRef.current.length === 0 || trailRef.current[trailRef.current.length-1].distanceTo(cutPosRef.current) > 0.5) {
          trailRef.current.push(cutPosRef.current.clone())
          setTrail([...trailRef.current])
        }
      }

      // Auto reset if it goes too far
      if (cutPosRef.current.length() > 20) {
         onReset()
      }
    }
  })

  // Pre-calculate full circle for reference
  const circlePoints = useMemo(() => {
    const pts = []
    for(let i=0; i<=64; i++) {
        const a = (i/64) * Math.PI*2;
        pts.push(new THREE.Vector3(Math.cos(a)*radius, 0, Math.sin(a)*radius))
    }
    return pts
  }, [radius])

  return (
    <group position={[0, -1, 0]}>
      {/* Reference Circle */}
      <Line points={circlePoints} color="rgba(255,255,255,0.1)" lineWidth={1} />
      
      {/* Center Post */}
      <mesh ref={centerRef}>
        <cylinderGeometry args={[0.2, 0.4, 1]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      
      {/* Centripetal Force String */}
      <line ref={stringRef} visible={!isCut}>
        <bufferGeometry />
        <lineBasicMaterial color="#38bdf8" linewidth={3} transparent opacity={0.8} />
      </line>

      {/* Force Vector Arrow (Inward) */}
      {!isCut && (
         <group>
           <line ref={vectorRef}>
             <bufferGeometry />
             <lineBasicMaterial color="#ef4444" linewidth={4} />
           </line>
           {/* Arrow head (simplified by just labeling the line for now) */}
         </group>
      )}

      {/* Stone */}
      <mesh ref={stoneRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        
        {/* Label on the stone */}
        {!isCut && (
          <Html position={[0, 1, 0]} center style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.8)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              Force Inward
            </div>
          </Html>
        )}
      </mesh>

      {/* Tangent Trail */}
      {isCut && trail.length > 1 && (
        <Line points={trail} color="#f59e0b" lineWidth={3} dashed dashScale={1} />
      )}
      
      {isCut && trail.length > 0 && (
         <Html position={[trail[0].x, trail[0].y + 1, trail[0].z]} center style={{ pointerEvents: 'none' }}>
           <div style={{ background: 'rgba(245, 158, 11, 0.8)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
             Tangent Velocity!
           </div>
         </Html>
      )}
    </group>
  )
}

export default function CentripetalStringSimulator() {
  const [speed, setSpeed] = useState(2)
  const [isCut, setIsCut] = useState(false)

  const handleCut = () => {
    setIsCut(true)
  }

  const handleReset = () => {
    setIsCut(false)
  }

  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.25rem' }}>String Tension Simulator</h3>
          <p className="section-subtitle">Visualizing the tension of a string acting as centripetal force.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.03)', padding: '0.75rem 1.5rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
             <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Spin Speed</label>
             <input type="range" min="0.5" max="5" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} disabled={isCut} style={{ width: '100px' }} />
          </div>
          
          <button 
            onClick={isCut ? handleReset : handleCut}
            style={{
              background: isCut ? 'var(--gradient-primary)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px',
              fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: isCut ? '0 4px 10px rgba(108,159,255,0.3)' : '0 4px 10px rgba(239,68,68,0.3)'
            }}>
            {isCut ? 'Reset String' : '✂️ Cut String'}
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: '400px', backgroundColor: '#020617', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 8, 10], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Scene speed={speed} isCut={isCut} onReset={handleReset} />
          <OrbitControls enableZoom={true} enablePan={false} maxDistance={25} minDistance={5} />
        </Canvas>
        
        <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '12px', borderRadius: '8px', color: 'white', maxWidth: '300px', fontSize: '0.9rem', borderLeft: '3px solid var(--accent-orange)' }}>
          {isCut 
            ? "Notice how the stone doesn't fly straight outward! Without the inward pull, its momentum carries it in a perfectly straight line tangent to the circle." 
            : "The string physically pulls the stone inward (Centripetal Force). This constant inward pull changes the stone's direction, keeping it in a circle."}
        </div>
      </div>
    </div>
  )
}
