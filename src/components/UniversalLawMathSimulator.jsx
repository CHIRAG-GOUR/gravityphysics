import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line, Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'

// Constants for simulation (scaled for visualization)
const G = 6.674e-11 // Real G is tiny, but we'll use a scaled version for the UI value display
const SCALED_G = 100 // Visual scaling factor for force vector length
const MIN_DISTANCE = 5
const MAX_DISTANCE = 20

function Arrow({ start, end, color }) {
  const dir = new THREE.Vector3().subVectors(end, start)
  const length = dir.length()
  
  if (length < 0.1) return null

  // We rotate the cone to point along the direction
  const quaternion = new THREE.Quaternion()
  const up = new THREE.Vector3(0, 1, 0)
  quaternion.setFromUnitVectors(up, dir.clone().normalize())

  return (
    <group position={start}>
      <mesh rotation={new THREE.Euler().setFromQuaternion(quaternion)} position={dir.clone().multiplyScalar(0.5)}>
         <cylinderGeometry args={[0.05, 0.05, length - 0.5]} />
         <meshBasicMaterial color={color} />
      </mesh>
      <mesh rotation={new THREE.Euler().setFromQuaternion(quaternion)} position={dir}>
         <coneGeometry args={[0.3, 0.8, 16]} />
         <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

function Scene({ mass1, mass2, distance }) {
  // Body 1 is at origin, Body 2 is along X axis
  const pos1 = new THREE.Vector3(0, 0, 0)
  const pos2 = new THREE.Vector3(distance, 0, 0)
  
  // Calculate raw force F = G * m1 * m2 / d^2
  // For visual purposes, we scale it
  const forceMag = (SCALED_G * mass1 * mass2) / Math.pow(distance, 2)
  
  // Visual limits for the arrow
  const visualForceLength = Math.min(Math.max(forceMag, 0.5), distance / 2 - 1)

  // Calculate visual radii (logarithmic or square root scale so they don't get too huge)
  const r1 = Math.max(0.5, Math.pow(mass1, 1/3) * 0.5)
  const r2 = Math.max(0.5, Math.pow(mass2, 1/3) * 0.5)

  return (
    <group position={[-distance/2, 0, 0]}>
      {/* Grid for scale reference */}
      <gridHelper args={[40, 40, '#334155', '#1e293b']} position={[distance/2, -3, 0]} />

      {/* Body 1 */}
      <mesh position={pos1}>
        <sphereGeometry args={[r1, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.7} metalness={0.2} />
        <Html position={[0, r1 + 0.5, 0]} center style={{ pointerEvents: 'none' }}>
           <div style={{ background: 'rgba(59, 130, 246, 0.8)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
             m₁ = {mass1}
           </div>
        </Html>
      </mesh>

      {/* Force Vector 1 (Pulling towards Body 2) */}
      <Arrow start={new THREE.Vector3(r1, 0, 0)} end={new THREE.Vector3(r1 + visualForceLength, 0, 0)} color="#ef4444" />

      {/* Body 2 */}
      <mesh position={pos2}>
        <sphereGeometry args={[r2, 32, 32]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.7} metalness={0.2} />
        <Html position={[0, r2 + 0.5, 0]} center style={{ pointerEvents: 'none' }}>
           <div style={{ background: 'rgba(245, 158, 11, 0.8)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
             m₂ = {mass2}
           </div>
        </Html>
      </mesh>

      {/* Force Vector 2 (Pulling towards Body 1) */}
      <Arrow start={new THREE.Vector3(distance - r2, 0, 0)} end={new THREE.Vector3(distance - r2 - visualForceLength, 0, 0)} color="#ef4444" />
      
      {/* Distance Line */}
      <Line points={[[0, -r1 - 1, 0], [distance, -r2 - 1, 0]]} color="#94a3b8" lineWidth={2} dashed dashScale={1} />
      <Html position={[distance/2, -Math.max(r1, r2) - 1.5, 0]} center style={{ pointerEvents: 'none' }}>
           <div style={{ background: 'rgba(148, 163, 184, 0.9)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
             d = {distance}
           </div>
      </Html>

    </group>
  )
}

export default function UniversalLawMathSimulator() {
  const [mass1, setMass1] = useState(10)
  const [mass2, setMass2] = useState(10)
  const [distance, setDistance] = useState(10)

  // Calculate actual scientific value for display (using arbitrary units)
  const calculatedForce = ((G * mass1 * mass2) / Math.pow(distance, 2)).toExponential(2)

  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>F = GMm/d² Simulator</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Observe how changing mass directly increases Force, while changing distance inversely squares the Force.</p>
        </div>
        
        {/* Real-time Equation Display */}
        <div style={{ 
          background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '1rem 1.5rem', borderRadius: '12px', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '250px',
          border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}>
           <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Calculated Force</div>
           <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444', fontFamily: 'monospace' }}>
             {calculatedForce} N
           </div>
        </div>
      </div>

      {/* Controls Container */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(108,159,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>Mass 1 (m₁): {mass1}</label>
          <input type="range" min="1" max="100" value={mass1} onChange={(e) => setMass1(Number(e.target.value))} style={{ accentColor: 'var(--accent-blue)' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>Mass 2 (m₂): {mass2}</label>
          <input type="range" min="1" max="100" value={mass2} onChange={(e) => setMass2(Number(e.target.value))} style={{ accentColor: 'var(--accent-orange)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem' }}>Distance (d): {distance}</label>
          <input type="range" min={MIN_DISTANCE} max={MAX_DISTANCE} step="0.5" value={distance} onChange={(e) => setDistance(Number(e.target.value))} style={{ accentColor: '#94a3b8' }} />
        </div>
      </div>

      {/* 3D Visualizer */}
      <div style={{ width: '100%', height: '450px', backgroundColor: '#0f172a', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 8, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Scene mass1={mass1} mass2={mass2} distance={distance} />
          <OrbitControls enableZoom={true} enablePan={false} maxDistance={40} minDistance={10} />
        </Canvas>
        
        <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '8px 12px', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.8rem' }}>
          Drag to rotate • Scroll to zoom
        </div>
      </div>
    </div>
  )
}
