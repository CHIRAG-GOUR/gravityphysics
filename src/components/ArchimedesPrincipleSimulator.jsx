import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Cylinder, Box, Sphere, Html } from '@react-three/drei';

const GRAVITY = 9.8; // m/s^2
const OBJECT_VOLUME = 0.001; // m^3 (1 liter)

const LIQUIDS = [
  { name: 'Pure Water', density: 1000, color: 'rgba(30, 144, 255, 0.6)' },
  { name: 'Saltwater', density: 1025, color: 'rgba(0, 206, 209, 0.6)' },
  { name: 'Heavy Oil', density: 900, color: 'rgba(218, 165, 32, 0.6)' },
  { name: 'Honey', density: 1420, color: 'rgba(255, 140, 0, 0.8)' }
];

const ObjectMesh = ({ type, position }) => {
  if (type === 'cube') {
    return (
      <Box args={[0.1, 0.1, 0.1]} position={position} castShadow>
        <meshStandardMaterial color="#8b4513" metalness={0.2} roughness={0.8} />
      </Box>
    );
  }
  return (
    <Sphere args={[0.06, 32, 32]} position={position} castShadow>
      <meshStandardMaterial color="#718096" metalness={0.8} roughness={0.2} />
    </Sphere>
  );
};

const SimulatorScene = ({ immersionLevel, objectMass, liquidDensity, liquidColor, objectType }) => {
  // Y position of the object:
  // Starts high (above beaker) and lowers down.
  // Beaker water level is roughly at y = -0.5 to y = 0.5
  // Object size is 0.1m. So at immersionLevel = 0, y = 0.8 (above water).
  // At immersionLevel = 100, y = 0 (fully submerged).
  const objectY = 0.8 - (immersionLevel / 100) * 0.8; 
  
  // The water level goes up slightly as the object displaces water
  // We'll simulate this visually by raising the water level plane 
  // based on the displaced volume
  const displacedVolumeVisualOffset = (immersionLevel / 100) * 0.05;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 4} enablePan={false} />

      {/* The Beaker Base */}
      <Cylinder args={[0.3, 0.3, 1.2, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.15} 
          roughness={0} 
          transmission={0.9} 
          thickness={0.1}
          side={2}
        />
      </Cylinder>
      {/* Beaker Bottom */}
      <Cylinder args={[0.3, 0.3, 0.05, 32]} position={[0, -0.6, 0]}>
        <meshStandardMaterial color="#eeeeee" />
      </Cylinder>

      {/* The Liquid */}
      <Cylinder args={[0.29, 0.29, 0.8 + displacedVolumeVisualOffset, 32]} position={[0, -0.2 + displacedVolumeVisualOffset/2, 0]}>
         <meshPhysicalMaterial 
            color={liquidColor.split('rgba(')[1].split(',')[0] === '30' ? '#1E90FF' : (liquidColor.includes('218') ? '#DAA520' : (liquidColor.includes('255, 140') ? '#FF8C00' : '#00CED1'))} 
            transparent 
            opacity={0.6}
            roughness={0.1}
            transmission={0.5}
         />
      </Cylinder>

      {/* Secondary Beaker for Displaced Fluid */}
      <group position={[0.6, -0.4, 0]}>
        <Cylinder args={[0.15, 0.15, 0.4, 32]} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.15} roughness={0} transmission={0.9} thickness={0.1} side={2} />
        </Cylinder>
        <Cylinder args={[0.15, 0.15, 0.02, 32]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color="#eeeeee" />
        </Cylinder>
        {/* Displaced liquid rises */}
        {immersionLevel > 0 && (
          <Cylinder args={[0.14, 0.14, (immersionLevel/100) * 0.3, 32]} position={[0, -0.2 + ((immersionLevel/100) * 0.3)/2, 0]}>
             <meshPhysicalMaterial 
               color={liquidColor.split('rgba(')[1].split(',')[0] === '30' ? '#1E90FF' : (liquidColor.includes('218') ? '#DAA520' : (liquidColor.includes('255, 140') ? '#FF8C00' : '#00CED1'))} 
               transparent 
               opacity={0.6}
             />
          </Cylinder>
        )}
      </group>

      {/* The Spout (Connecting them) */}
      <Cylinder args={[0.02, 0.02, 0.3, 16]} position={[0.35, 0.2, 0]} rotation={[0, 0, Math.PI / 2.5]}>
         <meshPhysicalMaterial color="#ffffff" transparent opacity={0.3} roughness={0} />
      </Cylinder>

      {/* The Submerged Object */}
      <ObjectMesh type={objectType} position={[0, objectY, 0]} />

      {/* String attaching the object to the scale */}
      <Cylinder args={[0.002, 0.002, Math.abs(1.5 - objectY), 8]} position={[0, objectY + Math.abs(1.5 - objectY)/2, 0]}>
        <meshBasicMaterial color="#333" />
      </Cylinder>

      {/* Spring Scale */}
      <Box args={[0.1, 0.3, 0.1]} position={[0, 1.65, 0]}>
        <meshStandardMaterial color="#f87171" />
      </Box>
    </>
  );
}

export default function ArchimedesPrincipleSimulator() {
  const [immersionLevel, setImmersionLevel] = useState(0); // 0 to 100%
  const [objectMass, setObjectMass] = useState(2); // kg
  const [objectType, setObjectType] = useState('sphere'); // 'sphere' or 'cube'
  const [liquidIndex, setLiquidIndex] = useState(0);

  const activeLiquid = LIQUIDS[liquidIndex];
  
  // Calculations
  const realWeight = objectMass * GRAVITY; // N
  // Volume displaced = Fraction of total volume * Object Volume
  const volumeDisplaced = (immersionLevel / 100) * OBJECT_VOLUME; 
  // MASS of displaced fluid = Density * Volume
  const massDisplacedFluid = activeLiquid.density * volumeDisplaced;
  // WEIGHT of displaced fluid = Mass * Gravity (This is exactly the Buoyant Force)
  const buoyantForce = massDisplacedFluid * GRAVITY;
  // Apparent Weight = Real Weight - Buoyant Force
  // Make sure it doesn't go below 0 (if it does, the object would float and rise, but we're forcing it on a string)
  const apparentWeight = Math.max(0, realWeight - buoyantForce);

  return (
    <div className="orbit-canvas" style={{ position: 'relative', width: '100%', height: '600px', display: 'flex', overflow: 'hidden' }}>
      
      {/* 3D Canvas on the left */}
      <div style={{ flex: '1 1 60%', height: '100%' }}>
        <Canvas shadows camera={{ position: [2, 1.5, 3], fov: 45 }}>
          <SimulatorScene 
            immersionLevel={immersionLevel} 
            objectMass={objectMass}
            liquidDensity={activeLiquid.density}
            liquidColor={activeLiquid.color}
            objectType={objectType}
          />
        </Canvas>
      </div>

      {/* UI Control Panel on the right */}
      <div style={{ flex: '0 0 40%', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '1.25rem', display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.1)', color: '#fff', overflowY: 'auto' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.15rem', color: '#fff' }}>Physics Laboratory</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '1rem', lineHeight: '1.3' }}>
          Lower the object into the liquid to measure the loss of weight and compare it to the displaced fluid.
        </p>

        {/* Readouts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.3)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Real Weight</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--accent-orange)' }}>
              {realWeight.toFixed(2)} N
            </div>
          </div>
          <div style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Apparent Wgt.</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#34d399' }}>
              {apparentWeight.toFixed(2)} N
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#60a5fa', marginBottom: '0.15rem' }}>Weight of Displaced Fluid</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#93c5fd' }}>
              {buoyantForce.toFixed(2)} N
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.15rem' }}>
              (Equals the Buoyant Force)
            </div>
        </div>

        {/* Controls */}
        {/* Controls */}
        <div style={{ marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Lower Object (%)</label>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-orange)' }}>{immersionLevel}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={immersionLevel} 
            onChange={(e) => setImmersionLevel(parseFloat(e.target.value))}
            className="sim-slider"
          />
        </div>

        <div style={{ marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Liquid Type</label>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {LIQUIDS.map((liquid, i) => (
              <button
                key={i}
                onClick={() => setLiquidIndex(i)}
                style={{
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  border: liquidIndex === i ? `1px solid ${liquid.color}` : '1px solid rgba(255,255,255,0.2)',
                  background: liquidIndex === i ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                {liquid.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-orange)' }}>Object Mass</label>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>{objectMass} kg</span>
          </div>
          <input 
            type="range" 
            min="0.5" max="10" step="0.5"
            value={objectMass} 
            onChange={(e) => setObjectMass(parseFloat(e.target.value))}
            className="sim-slider"
          />
        </div>

      </div>
    </div>
  );
}
