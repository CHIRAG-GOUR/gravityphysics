import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment, Float, Html } from '@react-three/drei'
import * as THREE from 'three'

// Simple submarine made from primitives
function Submarine({ depth }) {
  // Submarine hull compresses extremely slightly (exaggerated for effect) based on depth
  const scale = Math.max(0.9, 1 - (depth * 0.001))

  return (
    <group scale={[scale, scale, scale]}>
      {/* Main Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Front Nose */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Back Tail */}
      <mesh position={[0, -1, 0]}>
        <coneGeometry args={[0.5, 0.5, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Periscope / Tower */}
      <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

// Arrows that point inward from all 6 major directions
function PressureArrows({ depth }) {
  const groupRef = useRef()
  
  // Base size + arrow scales with depth
  const arrowScale = 1 + (depth * 0.05)
  // Bring arrows closer to hull as pressure increases
  const distance = Math.max(0.8, 1.5 - (depth * 0.01))

  useFrame(({ clock }) => {
    if (groupRef.current) {
        // Slow rotation to show omnidirectional nature
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.2
        groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  // Reusable arrow component
  const Arrow = ({ pos, rot }) => (
    <group position={pos} rotation={rot} scale={[arrowScale, arrowScale, arrowScale]}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.1, 0.2, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  )

  return (
    <group ref={groupRef}>
      {/* Top and Bottom */}
      <Arrow pos={[distance, 0, 0]} rot={[0, 0, Math.PI / 2]} />
      <Arrow pos={[-distance, 0, 0]} rot={[0, 0, -Math.PI / 2]} />
      
      {/* Front and Back */}
      <Arrow pos={[0, distance, 0]} rot={[0, 0, 0]} />
      <Arrow pos={[0, -distance, 0]} rot={[Math.PI, 0, 0]} />
      
      {/* Left and Right */}
      <Arrow pos={[0, 0, distance]} rot={[Math.PI / 2, 0, 0]} />
      <Arrow pos={[0, 0, -distance]} rot={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

function WaterEnvironment({ depth }) {
  // Darken background color as depth increases (simulating ocean depth)
  // Max depth = 100
  const r = Math.max(10, 59 - (depth * 0.5)) // 59 -> 9
  const g = Math.max(30, 130 - (depth * 1.0)) // 130 -> 30
  const b = Math.max(50, 246 - (depth * 1.5)) // 246 -> 96

  return <color attach="background" args={[`rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`]} />
}

export default function SubmarinePressureSimulator() {
  const [depth, setDepth] = useState(10) // 0 to 100 meters

  // Water density approx 1000 kg/m^3
  // P = density * g * h
  const pressureValue = 1000 * 9.8 * depth

  return (
    <div className="neu-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Submarine Pressure Dive</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Drag the slider to increase the submarine's depth. Notice how <b>fluids exert pressure in all directions</b> simultaneously, and the force increases with depth!</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Environment Pane */}
        <div style={{ flex: '2 1 400px', height: '400px', borderRadius: '16px', position: 'relative', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
           
           <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, background: 'rgba(255,255,255,0.9)', padding: '0.5rem 1rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', color: 'var(--accent-blue)', fontWeight: 'bold' }}>
              Depth: {depth} m
           </div>

           <Canvas>
             <PerspectiveCamera makeDefault position={[4, 2, 4]} fov={45} />
             <OrbitControls enableZoom={false} enablePan={false} target={[0, 0, 0]} />
             <WaterEnvironment depth={depth} />
             <ambientLight intensity={0.4} />
             <directionalLight position={[10, 10, 10]} intensity={1} />
             
             <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
               <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                 <Submarine depth={depth} />
                 <PressureArrows depth={depth} />
               </group>
             </Float>
           </Canvas>
        </div>

        {/* Controls & Math readout */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
             <h4 style={{ color: 'var(--accent-black)', marginBottom: '1rem' }}>Dive Control</h4>
             <input 
                type="range" 
                min="0" 
                max="100" 
                value={depth} 
                onChange={(e) => setDepth(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent-blue)' }}
             />
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Surface (0m)</span>
                <span>Deep (100m)</span>
             </div>
          </div>

          <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-blue)' }}>
             <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', margin: 0 }}>Fluid Pressure (P = ρgh)</h4>
             <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
               {(pressureValue / 1000).toFixed(1)} <span style={{ fontSize: '1.2rem' }}>kPa</span>
             </div>
             <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: 0 }}>
                Pressure increases violently with depth. At {depth}m, the water crushes the hull equally from every single direction.
             </p>
          </div>

        </div>

      </div>
    </div>
  )
}
