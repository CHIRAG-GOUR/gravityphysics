import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line, Html } from '@react-three/drei'
import * as THREE from 'three'

function OrbitScene({ showVelocity, showForce }) {
  const earthRef = useRef()
  const moonGroupRef = useRef()
  const moonRef = useRef()
  const velocityVectorRef = useRef()
  const forceVectorRef = useRef()
  
  const radius = 6
  const speed = 0.5
  
  const angleRef = useRef(0)

  useFrame((state, delta) => {
    angleRef.current -= speed * delta // Orbit clockwise for better visibility of vectors

    const x = Math.cos(angleRef.current) * radius
    const z = Math.sin(angleRef.current) * radius

    if (earthRef.current) earthRef.current.rotation.y += delta * 0.2
    
    if (moonGroupRef.current) {
        moonGroupRef.current.position.set(x, 0, z)
        
        // Orient the local group so Z faces forward along the tangent, and X faces inward to Earth
        // The angle from Earth to Moon is angleRef.current. 
        // Tangent direction is angleRef.current + PI/2 (clock-wise or counter based on sign)
        moonGroupRef.current.rotation.y = -angleRef.current
    }
  })

  // Pre-calculate circular orbit path
  const orbitPoints = useMemo(() => {
    const points = []
    for(let i=0; i<=64; i++) {
        const angle = (i / 64) * Math.PI * 2
        points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return points
  }, [radius])

  return (
    <group position={[0, -1, 0]}>
      <Line points={orbitPoints} color="rgba(255,255,255,0.15)" lineWidth={1} dashed dashScale={2} />
      
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.6} metalness={0.1} />
        <Html position={[0, 2.5, 0]} center style={{ pointerEvents: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
            Earth
        </Html>
      </mesh>
      
      {/* Moon Setup */}
      <group ref={moonGroupRef}>
        <mesh ref={moonRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#9ca3af" roughness={0.9} />
        </mesh>
        
        {/* Force Vector (Points straight BACK along X axis towards origin) */}
        {showForce && (
            <group>
                <Line points={[[0, 0, 0], [-3, 0, 0]]} color="#38bdf8" lineWidth={5} />
                <mesh position={[-3, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                    <coneGeometry args={[0.2, 0.6, 16]} />
                    <meshBasicMaterial color="#38bdf8" />
                </mesh>
                <Html position={[-1.5, 0.5, 0]} center style={{ pointerEvents: 'none' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.8)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                        Centripetal Force
                    </div>
                </Html>
            </group>
        )}
        
        {/* Velocity Vector (Points FORWARD along Z axis tangent to circle) */}
        {showVelocity && (
            <group>
                <Line points={[[0, 0, 0], [0, 0, 3]]} color="#f59e0b" lineWidth={5} />
                <mesh position={[0, 0, 3]} rotation={[Math.PI/2, 0, 0]}>
                    <coneGeometry args={[0.2, 0.6, 16]} />
                    <meshBasicMaterial color="#f59e0b" />
                </mesh>
                <Html position={[0, 0.5, 1.5]} center style={{ pointerEvents: 'none' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.8)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                        Velocity (Inertia)
                    </div>
                </Html>
            </group>
        )}
        
        {/* Resultant Trajectory (Points diagonally) */}
        {showForce && showVelocity && (
            <group>
                <Line points={[[0, 0, 0], [-1.5, 0, 1.5]]} color="#10b981" lineWidth={3} dashed dashScale={1} />
                <mesh position={[-1.5, 0, 1.5]} rotation={[Math.PI/2, 0, -Math.PI/4]}>
                    <coneGeometry args={[0.15, 0.4, 16]} />
                    <meshBasicMaterial color="#10b981" />
                </mesh>
                <Html position={[-1, -1, 1]} center style={{ pointerEvents: 'none' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.8)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                        Resultant Orbit Path
                    </div>
                </Html>
            </group>
        )}
      </group>
    </group>
  )
}

export default function CentripetalOrbitSimulator() {
  const [showVelocity, setShowVelocity] = useState(true)
  const [showForce, setShowForce] = useState(true)

  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.25rem' }}>Orbital Mechanics Visualizer</h3>
          <p className="section-subtitle">Visualizing Earth's gravity constantly pulling the Moon, bending its path into an orbit.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.03)', padding: '0.75rem 1.5rem', borderRadius: '12px' }}>
           <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-orange)', cursor: 'pointer' }}>
             <input type="checkbox" checked={showVelocity} onChange={e => setShowVelocity(e.target.checked)} style={{ accentColor: 'var(--accent-orange)', width: '16px', height: '16px' }} />
             Show Velocity Vector
           </label>
           
           <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-blue)', cursor: 'pointer' }}>
             <input type="checkbox" checked={showForce} onChange={e => setShowForce(e.target.checked)} style={{ accentColor: 'var(--accent-blue)', width: '16px', height: '16px' }} />
             Show Force Vector
           </label>
        </div>
      </div>

      <div style={{ width: '100%', height: '450px', backgroundColor: '#020617', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 10, 12], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 5, 5]} intensity={1.5} />
          
          <OrbitScene showVelocity={showVelocity} showForce={showForce} />
          
          <OrbitControls enableZoom={true} enablePan={false} maxDistance={30} minDistance={6} />
        </Canvas>
        
        <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '12px', borderRadius: '8px', color: 'white', maxWidth: '350px', fontSize: '0.9rem', borderLeft: '3px solid var(--accent-green)' }}>
          {showForce && showVelocity ? 
            "The combination of the Moon's forward Velocity and Earth's inward Force creates a continuous 'fall' that results in a stable circular Orbit." :
            !showForce && showVelocity ?
            "Without Earth's gravity, the Moon's inertia would carry it away in a straight line forever." :
            showForce && !showVelocity ?
            "Without forward velocity, the Moon would plummet directly into the Earth due to gravity." :
            "Turn on the vectors above to see the hidden forces governing orbital mechanics!"
          }
        </div>
      </div>
    </div>
  )
}
