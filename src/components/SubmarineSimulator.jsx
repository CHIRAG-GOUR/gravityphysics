import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Cylinder, Box, Sphere } from '@react-three/drei';

const WATER_DENSITY = 1025; // kg/m^3 (Seawater)
const SUB_VOLUME = 50; // m^3
const MAX_BUOYANT_FORCE = SUB_VOLUME * WATER_DENSITY; // kg
const BASE_MASS = 45000; // kg (Empty weight - floats)
const BALLAST_CAPACITY = 10000; // kg of water it can take in

const SubmarineScene = ({ waterPercentage }) => {
  const containerRef = useRef();
  
  // Calculate total mass
  const currentMass = BASE_MASS + (waterPercentage / 100) * BALLAST_CAPACITY;
  
  // Is it sinking or floating?
  // Floating: buoyant force > weight
  // Sinking: weight > buoyant force
  // Neutral: weight == buoyant force (approx 51250 kg)
  
  const neutralMass = MAX_BUOYANT_FORCE; // 51250
  
  let targetY = 0;
  if (currentMass < neutralMass - 500) {
    // Floating
    targetY = 1.5; 
  } else if (currentMass > neutralMass + 500) {
    // Sinking
    targetY = -3.5; 
  } else {
    // Neutral
    targetY = -1.0; 
  }

  useFrame(() => {
    if (containerRef.current) {
      // Very slow transition to emulate deep water movement
      containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.01;
      
      // Add slight bobbing
      containerRef.current.position.y += Math.sin(Date.now() / 1000) * 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} enablePan={false} />

      {/* Deep Ocean Background */}
      <Cylinder args={[8, 8, 12, 32]} position={[0, -2, 0]}>
        <meshPhysicalMaterial 
          color="#0f172a" 
          transparent 
          opacity={0.8} 
          roughness={0.2}
          side={1} // View from inside
        />
      </Cylinder>

      {/* Ocean Surface Line */}
      <Box args={[16, 0.05, 16]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.3} />
      </Box>

      {/* Ocean Floor */}
      <Box args={[16, 0.5, 16]} position={[0, -5, 0]}>
         <meshStandardMaterial color="#1e293b" />
      </Box>

      {/* The Submarine */}
      <group ref={containerRef} position={[0, 1.5, 0]}>
        {/* Main Hull */}
        <Cylinder args={[0.5, 0.5, 3, 32]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#fcd34d" metalness={0.6} roughness={0.4} />
        </Cylinder>
        {/* Nose cones */}
        <Sphere args={[0.5, 32, 32]} position={[1.5, 0, 0]} castShadow>
          <meshStandardMaterial color="#fcd34d" metalness={0.6} roughness={0.4} />
        </Sphere>
        <Sphere args={[0.5, 32, 32]} position={[-1.5, 0, 0]} castShadow>
          <meshStandardMaterial color="#fcd34d" metalness={0.6} roughness={0.4} />
        </Sphere>
        {/* Sail (Top tower) */}
        <Box args={[0.8, 0.6, 0.4]} position={[0.5, 0.7, 0]} castShadow>
          <meshStandardMaterial color="#fcd34d" metalness={0.6} roughness={0.4} />
        </Box>
        {/* Propeller */}
        <Cylinder args={[0.2, 0.2, 0.1, 8]} position={[-2.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </Cylinder>
        
        {/* Cutaway: Ballast Tanks */}
        <group position={[0, -0.2, 0.45]}>
           {/* Tank Glass */}
           <Box args={[1.5, 0.4, 0.2]}>
              <meshPhysicalMaterial color="#ffffff" transparent opacity={0.2} transmission={0.9} roughness={0.1} />
           </Box>
           {/* Water Inside Tank */}
           <Box args={[1.45, 0.35 * (waterPercentage / 100), 0.15]} position={[0, -0.175 + (0.35 * (waterPercentage / 100) / 2), 0]}>
              <meshPhysicalMaterial color="#0ea5e9" transparent opacity={0.8} />
           </Box>
        </group>
      </group>
    </>
  );
}

export default function SubmarineSimulator() {
  const [waterPercentage, setWaterPercentage] = useState(0); // 0 to 100%

  const currentMass = BASE_MASS + (waterPercentage / 100) * BALLAST_CAPACITY;
  const averageDensity = currentMass / SUB_VOLUME;
  
  let buoyancyState = '';
  let stateColor = '';
  
  if (averageDensity < WATER_DENSITY - 10) {
    buoyancyState = 'Positive (Surfacing)';
    stateColor = '#34d399';
  } else if (averageDensity > WATER_DENSITY + 10) {
    buoyancyState = 'Negative (Diving)';
    stateColor = '#f87171';
  } else {
    buoyancyState = 'Neutral (Hovering)';
    stateColor = '#fbbf24';
  }

  return (
    <div className="orbit-canvas" style={{ position: 'relative', width: '100%', height: '600px', display: 'flex', overflow: 'hidden' }}>
      
      {/* 3D Canvas on the left */}
      <div style={{ flex: '1 1 55%', height: '100%', position: 'relative', background: '#020617' }}>
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }}>
          <SubmarineScene waterPercentage={waterPercentage} />
        </Canvas>
      </div>

      {/* UI Control Panel on the right */}
      <div style={{ flex: '0 0 45%', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '1.5rem', display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.1)', color: '#fff', overflowY: 'auto', zIndex: 10 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.25rem', color: '#fff' }}>Ballast Control Room</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
          Submarines control their depth by pumping water in or out of large <strong>ballast tanks</strong>. This changes their Average Density compared to the surrounding seawater.
        </p>

        {/* Readouts */}
        <div style={{ background: 'rgba(15,23,42,0.6)', border: `1px solid ${stateColor}`, borderRadius: '12px', padding: '1rem', textAlign: 'center', marginBottom: '1.5rem', transition: 'all 0.3s' }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Buoyancy State</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: stateColor, marginBottom: '0.25rem' }}>
            {buoyancyState}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
            Average Density: {averageDensity.toFixed(0)} kg/m³
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Submarine Mass</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fcd34d' }}>
              {(currentMass / 1000).toFixed(1)} t
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Displaced Water Mass</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#38bdf8' }}>
              {(MAX_BUOYANT_FORCE / 1000).toFixed(1)} t
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#38bdf8' }}>Ballast Tanks Water %</label>
            <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff' }}>{waterPercentage}%</span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => setWaterPercentage(Math.max(0, waterPercentage - 20))}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '6px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.5)', color: '#fca5a5', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.9rem'
              }}
            >
              Blow Air (Rise)
            </button>
            <button 
              onClick={() => setWaterPercentage(Math.min(100, waterPercentage + 20))}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '6px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.5)', color: '#bae6fd', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.9rem'
              }}
            >
              Flood Tanks (Dive)
            </button>
          </div>
          
          <input 
            type="range" 
            min="0" max="100" 
            value={waterPercentage} 
            onChange={(e) => setWaterPercentage(parseFloat(e.target.value))}
            className="sim-slider"
            style={{ marginTop: '1rem' }}
          />
        </div>

      </div>
    </div>
  );
}
