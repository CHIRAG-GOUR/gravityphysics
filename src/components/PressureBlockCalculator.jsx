import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'

// The 3D Block Model (5kg, 40x20x10 cm)
function WoodenBlock({ orientation }) {
  // Dimensions in meters (scale x10 for visualization)
  // Base size: 40cm (0.4) x 20cm (0.2) x 10cm (0.1)
  let args = [4, 1, 2] // Default (40x20 face down) -> X: 4, Y: 1, Z: 2
  
  if (orientation === 'face2') {
    args = [4, 2, 1] // (40x10 face down)
  } else if (orientation === 'face3') {
    args = [2, 4, 1] // (20x10 face down)
  }

  return (
    <group position={[0, args[1] / 2, 0]}>
       <mesh castShadow receiveShadow>
         <boxGeometry args={args} />
         <meshStandardMaterial color="#d97706" roughness={0.8} />
       </mesh>
       
       {/* Edge highlights to look like actual wood blocks */}
       <mesh>
         <boxGeometry args={[args[0] + 0.01, args[1] + 0.01, args[2] + 0.01]} />
         <meshBasicMaterial color="#78350f" wireframe={true} />
       </mesh>
    </group>
  )
}

function Ground() {
  return (
    <mesh position={[0, 0, 0]} receiveShadow>
      <boxGeometry args={[15, 0.2, 15]} />
      <meshStandardMaterial color="#cbd5e1" />
    </mesh>
  )
}

export default function PressureBlockCalculator() {
  const [orientation, setOrientation] = useState('face1') // face1, face2, face3

  // Math variables exactly matching the textbook
  const massKg = 5
  // Thrust = 5 kg * 9.8 m/s^2 = 49 N (Textbook might use 10, resulting in 50N. Let's use 49N to be precise with 9.8)
  const thrustN = massKg * 9.8 

  // Areas
  // face1: 40cm x 20cm = 0.4 m x 0.2 m = 0.08 m^2
  // face2: 40cm x 10cm = 0.4 m x 0.1 m = 0.04 m^2
  // face3: 20cm x 10cm = 0.2 m x 0.1 m = 0.02 m^2
  
  const faceStats = {
    face1: { name: 'Largest Face', dim: '40 cm × 20 cm', area: 0.08 },
    face2: { name: 'Medium Face', dim: '40 cm × 10 cm', area: 0.04 },
    face3: { name: 'Smallest Face', dim: '20 cm × 10 cm', area: 0.02 },
  }

  const currentStats = faceStats[orientation]
  const currentPressure = thrustN / currentStats.area

  return (
    <div className="neu-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>The Wooden Block Experiment</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>A 5kg block (40cm × 20cm × 10cm) is kept on a table. Click the buttons below to rotate the block and calculate the resulting pressure for each face.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Environment Pane */}
        <div style={{ flex: '2 1 400px', height: '400px', backgroundColor: '#f1f5f9', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
           
           <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <button 
                onClick={() => setOrientation('face1')}
                style={{
                  padding: '0.5rem', borderRadius: '8px', border: 'none', 
                  background: orientation === 'face1' ? 'var(--accent-blue)' : 'transparent',
                  color: orientation === 'face1' ? 'white' : 'var(--text-secondary)',
                  fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                40×20 Face
              </button>
              <button 
                onClick={() => setOrientation('face2')}
                style={{
                  padding: '0.5rem', borderRadius: '8px', border: 'none', 
                  background: orientation === 'face2' ? 'var(--accent-purple)' : 'transparent',
                  color: orientation === 'face2' ? 'white' : 'var(--text-secondary)',
                  fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                40×10 Face
              </button>
              <button 
                onClick={() => setOrientation('face3')}
                style={{
                  padding: '0.5rem', borderRadius: '8px', border: 'none', 
                  background: orientation === 'face3' ? 'var(--accent-red)' : 'transparent',
                  color: orientation === 'face3' ? 'white' : 'var(--text-secondary)',
                  fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                20×10 Face
              </button>
           </div>

           <Canvas shadows>
             <PerspectiveCamera makeDefault position={[6, 4, 8]} fov={35} />
             <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={1.0} target={[0, 1, 0]} />
             <ambientLight intensity={0.5} />
             <directionalLight position={[10, 15, 10]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
             
             <WoodenBlock orientation={orientation} />
             <Ground />
             <Environment preset="city" />
           </Canvas>
        </div>

        {/* Math readout */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          
          <div style={{ background: 'rgba(240,245,255,1)', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #cbd5e1' }}>
             <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Given Mass (m)</h4>
             <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-black)' }}>{massKg} kg</div>
          </div>

          <div style={{ background: 'rgba(240,245,255,1)', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-orange)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Thrust Force (F = m × g)</h4>
             </div>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-orange)' }}>
                {thrustN} N
             </div>
             <div style={{ fontSize: '0.8rem', color: '#64748b' }}>5 kg × 9.8 m/s²</div>
          </div>

          <div style={{ background: 'rgba(240,245,255,1)', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-blue)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Area of Contact (A)</h4>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>{currentStats.name}</span>
             </div>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
                {currentStats.area} m²
             </div>
             <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Sides: {currentStats.dim}</div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', borderLeft: '6px solid var(--accent-purple)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
             <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Pressure (P = F / A)</h4>
             <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-purple)' }}>
               {currentPressure.toFixed(1)} <span style={{ fontSize: '1.2rem' }}>Pa</span>
             </div>
             <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {thrustN} N / {currentStats.area} m² = {currentPressure.toFixed(1)} N/m²
             </div>
          </div>

        </div>

      </div>
    </div>
  )
}
