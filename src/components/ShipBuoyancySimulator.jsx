import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Cylinder, Box, Sphere, Html } from '@react-three/drei';

const GRAVITY = 9.8; 
const STEEL_DENSITY = 7800; // kg/m^3
const WATER_DENSITY = 1000; // kg/m^3
const STEEL_MASS = 10000; // 10,000 kg (10 tonnes) of steel

// The volume of the solid steel block
const SOLID_VOLUME = STEEL_MASS / STEEL_DENSITY; 

const ShipScene = ({ shapeFactor }) => {
  // shapeFactor goes from 0 (Solid Cube) to 100 (Wide Hull)
  // We morph the visual shape and calculate the effective displaced volume.
  
  // As a solid cube, volume is ~1.28 m^3
  // As a hull, let's say it can displace up to 15 m^3 before water spills over the sides.
  const MAX_BOAT_VOLUME = 15; // m^3
  const effectiveVolume = SOLID_VOLUME + (shapeFactor / 100) * (MAX_BOAT_VOLUME - SOLID_VOLUME);
  
  // Buoyancy calculation
  const buoyantForce = effectiveVolume * WATER_DENSITY * GRAVITY;
  const weight = STEEL_MASS * GRAVITY;
  
  // Does it float?
  const isFloating = buoyantForce >= weight;
  
  // Y Position logic
  // If sinking, it rests on the "ocean" floor (y = -1.5)
  // If floating, it sits at y = 0 (surface level)
  // We'll interpolate smoothly based on buoyancy deficit
  
  let targetY = 0;
  if (!isFloating) {
    // How badly is it sinking?
    const deficitRatio = (weight - buoyantForce) / weight; // 0 to 1
    targetY = -0.5 - (deficitRatio * 1.5);
  } else {
    // It floats! How high?
    // Submerged volume = Mass / Water Density = 10 m^3
    // It displaces 10 m^3 out of effectiveVolume.
    targetY = 0.2 * (shapeFactor / 100); 
  }
  
  // Visual morph calculations
  const cubeSize = Math.cbrt(SOLID_VOLUME) * 0.5; // Scale down visually for screen
  
  // Shape transitions: Cube -> Rectangular Hull
  const width = cubeSize + (shapeFactor / 100) * 1.5;
  const height = cubeSize - (shapeFactor / 100) * (cubeSize * 0.4);
  const depth = cubeSize + (shapeFactor / 100) * 1.0;

  // Render variables
  const containerRef = useRef();
  
  useFrame(() => {
    if (containerRef.current) {
      // Smoothly move towards the target Y depth based on physics
      containerRef.current.position.y += (targetY - containerRef.current.position.y) * 0.05;
      
      // Add slight bobbing if floating
      if (isFloating) {
         containerRef.current.position.y += Math.sin(Date.now() / 500) * 0.005;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 4} enablePan={false} />

      {/* The Ocean */}
      <Box args={[10, 4, 10]} position={[0, -2, 0]}>
        <meshPhysicalMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.4} 
          roughness={0.1}
          transmission={0.8}
        />
      </Box>

      {/* The Ocean Floor */}
      <Box args={[10, 0.5, 10]} position={[0, -4.25, 0]}>
        <meshStandardMaterial color="#c2b280" />
      </Box>

      {/* The Steel / Boat */}
      <group ref={containerRef} position={[0, -2, 0]}>
        {shapeFactor < 20 ? (
           // Render a solid steel cube at low shape factors
           <Box args={[width, height, depth]} castShadow>
             <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
           </Box>
        ) : (
           // Render a hollow-ish hull using grouped planes/boxes
           <group>
             {/* Bottom */}
             <Box args={[width, 0.05, depth]} position={[0, -height/2, 0]} castShadow>
               <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
             </Box>
             {/* Sides */}
             <Box args={[width, height, 0.05]} position={[0, 0, depth/2]} castShadow>
               <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
             </Box>
             <Box args={[width, height, 0.05]} position={[0, 0, -depth/2]} castShadow>
               <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
             </Box>
             <Box args={[0.05, height, depth]} position={[width/2, 0, 0]} castShadow>
               <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
             </Box>
             <Box args={[0.05, height, depth]} position={[-width/2, 0, 0]} castShadow>
               <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
             </Box>
           </group>
        )}
      </group>
    </>
  );
}

export default function ShipBuoyancySimulator() {
  const [shapeFactor, setShapeFactor] = useState(0); // 0 = Solid Steel Cube, 100 = Hollow Boat

  const effectiveVolume = SOLID_VOLUME + (shapeFactor / 100) * (15 - SOLID_VOLUME);
  const buoyantForce = effectiveVolume * WATER_DENSITY * GRAVITY;
  const weight = STEEL_MASS * GRAVITY;
  
  const isFloating = buoyantForce >= weight;

  return (
    <div className="orbit-canvas" style={{ position: 'relative', width: '100%', height: '600px', display: 'flex', overflow: 'hidden' }}>
      
      {/* UI Control Panel on the left */}
      <div style={{ flex: '0 0 45%', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '1.25rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.1)', color: '#fff', overflowY: 'auto', zIndex: 10 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.25rem', color: '#fff' }}>Shipwright's Dock</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '1rem', lineHeight: '1.3' }}>
          A 10-tonne block of solid steel will sink immediately because it is much denser than water. But if we flatten it and shape it into a hull, it traps air and increases its <strong>Total Volume</strong>. 
        </p>

        {/* Status Indicator */}
        <div style={{ background: isFloating ? 'rgba(52,211,153,0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${isFloating ? '#34d399' : '#ef4444'}`, borderRadius: '8px', padding: '0.75rem', textAlign: 'center', marginBottom: '1rem', transition: 'all 0.3s' }}>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.15rem' }}>Result</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: isFloating ? '#34d399' : '#ef4444', marginBottom: '0.2rem' }}>
            {isFloating ? 'Floats!' : 'Sinks'}
          </div>
          <div style={{ fontSize: '0.75rem', color: isFloating ? '#10b981' : '#f87171' }}>
            {isFloating ? 'Buoyant Force > Weight' : 'Weight > Buoyant Force'}
          </div>
        </div>

        {/* Readouts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Steel Weight</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
              {(weight / 1000).toFixed(1)} kN
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Max Upthrust</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
              {(buoyantForce / 1000).toFixed(1)} kN
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-orange)' }}>Hammer into Hull</label>
            <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>{shapeFactor}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={shapeFactor} 
            onChange={(e) => setShapeFactor(parseFloat(e.target.value))}
            className="sim-slider"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
            <span>Solid Cube</span>
            <span>Hollow Boat</span>
          </div>
        </div>

        <div style={{ background: 'rgba(59,130,246,0.1)', borderLeft: '3px solid #60a5fa', padding: '0.75rem', borderRadius: '0 8px 8px 0' }}>
            <div style={{ fontSize: '0.75rem', color: '#93c5fd', marginBottom: '0.15rem' }}>Volume of object:</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff' }}>
              {effectiveVolume.toFixed(2)} m³
            </div>
        </div>

      </div>

      {/* 3D Canvas on the right */}
      <div style={{ flex: '1 1 55%', height: '100%', position: 'relative' }}>
        {/* Background gradient for sky/ocean */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #bae6fd 30%, #0369a1 100%)', zIndex: 0 }} />
        
        <Canvas shadows camera={{ position: [3, 1, 4], fov: 45 }} style={{ zIndex: 1 }}>
          <ShipScene shapeFactor={shapeFactor} />
        </Canvas>
      </div>
    </div>
  );
}
