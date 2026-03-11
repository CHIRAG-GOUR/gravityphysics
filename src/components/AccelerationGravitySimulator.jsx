import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'

function EarthBulgeScene({ latitude }) {
  const earthRef = useRef()
  
  // Real Earth radius (scaled)
  // R_eq = 6378 km, R_pol = 6357 km
  // We exaggerate the bulge significantly for visual effect
  // Let's say polar radius = 3, equatorial radius = 4
  const rEquator = 4.0
  const rPole = 3.0

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // Calculate Marker Position based on latitude
  // latitude is 0 (equator) to 90 (pole)
  const latRad = latitude * (Math.PI / 180)
  
  // Calculate the radius at this latitude for an ellipse
  const radiusAtLat = Math.sqrt(
    Math.pow(rEquator * Math.cos(latRad), 2) + 
    Math.pow(rPole * Math.sin(latRad), 2)
  )

  // Cartesian coordinates for the marker
  // Assuming X is equator direction, Y is pole direction
  const markerY = rPole * Math.sin(latRad)
  const markerX = rEquator * Math.cos(latRad)

  return (
    <group>
      {/* 3D Earth (Oblate Spheroid) */}
      <mesh ref={earthRef} scale={[rEquator, rPole, rEquator]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.7} metalness={0.2} wireframe={true} />
      </mesh>

      {/* The Core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </mesh>

      {/* Axis Line */}
      <Line points={[[0, -6, 0], [0, 6, 0]]} color="#94a3b8" lineWidth={2} dashed dashScale={0.5} />
      <Html position={[0, 6.5, 0]} center style={{ pointerEvents: 'none' }}>
         <div style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 'bold' }}>N Pole</div>
      </Html>

      {/* Equator Line */}
      <Line points={[[-6, 0, 0], [6, 0, 0]]} color="#94a3b8" lineWidth={2} dashed dashScale={0.5} />
      <Html position={[6.5, 0, 0]} center style={{ pointerEvents: 'none' }}>
         <div style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 'bold' }}>Equator</div>
      </Html>

      {/* Marker Point (Representing a persona/object on the surface) */}
      <group position={[markerX, markerY, 0]}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#fde047" />
        </mesh>
        
        {/* Radius Vector Line (Center to Marker) */}
        <Line points={[[-markerX, -markerY, 0], [0, 0, 0]]} color="#fde047" lineWidth={2} />
        
        <Html position={[0.5, 0.5, 0]} style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}>
           <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', gap: '4px' }}>
             <span style={{ color: 'var(--accent-orange)' }}>Radius (R): {radiusAtLat.toFixed(2)} units</span>
             <span style={{ color: 'var(--accent-green)' }}>Gravity (g): {(100 / Math.pow(radiusAtLat, 2)).toFixed(2)} m/s²</span>
           </div>
        </Html>
      </group>

    </group>
  )
}

export default function AccelerationGravitySimulator() {
  const [latitude, setLatitude] = useState(0) // 0 to 90

  return (
    <div className="neu-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Earth's Equatorial Bulge Visualizer</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Because Earth spins, it bulges at the equator (exaggerated here). Slide the marker from the Equator to the North Pole to see how the shorter radius increases the value of <b>g</b>.</p>
        </div>
      </div>

      <div style={{ background: 'rgba(108,159,255,0.05)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          <span>Equator (Lat: 0°)</span>
          <span>Pole (Lat: 90°)</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="90" 
          value={latitude} 
          onChange={(e) => setLatitude(Number(e.target.value))} 
          style={{ width: '100%', accentColor: 'var(--accent-purple)' }} 
        />
        <div style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 'bold', color: 'var(--accent-purple)' }}>
          Current Latitude: {latitude}°
        </div>
      </div>

      <div style={{ width: '100%', height: '400px', backgroundColor: '#0f172a', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <EarthBulgeScene latitude={latitude} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  )
}
