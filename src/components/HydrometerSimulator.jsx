import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cylinder, Text, Environment, Box } from '@react-three/drei';

const GRAVITY = 9.8; 
const HYDROMETER_MASS = 0.05; // kg
const TUBE_RADIUS = 0.02; // m
const CROSS_SECTIONAL_AREA = Math.PI * Math.pow(TUBE_RADIUS, 2); // m^2
const MAX_LENGTH = 0.4; // m

const TUBE_TYPES = [
  { name: 'Pure Water', baseDensity: 1000, color: 'rgba(96, 165, 250, 0.5)', description: 'Standard baseline (1.000 SG)' },
  { name: 'Pure Milk', baseDensity: 1032, color: 'rgba(255, 255, 255, 1)', description: 'Good unadulterated cow milk (1.032 SG)' },
  { name: 'Adulterated Milk', baseDensity: 1015, color: 'rgba(245, 245, 245, 0.95)', description: 'Milk mixed with water (1.015 SG)' }
];

const HydrometerScene = ({ liquidDensity, liquidColor, isDropped }) => {
  // Volume submerged = Mass / Fluid Density (from Archimedes' Principle)
  // Depth submerged = Volume submerged / Cross-sectional Area
  const volumeSubmerged = HYDROMETER_MASS / liquidDensity;
  const depthSubmerged = volumeSubmerged / CROSS_SECTIONAL_AREA;
  
  // Bound the depth so it doesn't sink out of the cylinder
  const boundedDepth = Math.min(MAX_LENGTH, depthSubmerged);

  // Calculate Y position of hydrometer
  // The water surface is at Y = 0.
  // The bottom of the hydrometer is at Y = -boundedDepth.
  // Since the hydrometer's center is in the middle of its length...
  const targetY = -boundedDepth + (MAX_LENGTH / 2);
  
  // If not dropped yet, suspend it high above the liquid
  const currentY = isDropped ? targetY : 0.8;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} enablePan={false} />

      {/* Outer Measuring Cylinder */}
      <Cylinder args={[0.1, 0.1, 1.0, 32]} position={[0, -0.4, 0]}>
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.15} 
          roughness={0} 
          transmission={0.9} 
          thickness={0.05}
          side={2}
        />
      </Cylinder>
      {/* Liquid inside */}
      <Cylinder args={[0.095, 0.095, 0.9, 32]} position={[0, -0.45, 0]}>
        <meshPhysicalMaterial 
          color={liquidColor.split(',')[0].includes('255') ? '#ffffff' : '#60a5fa'} 
          transparent={(liquidColor.split(',')[3] && parseFloat(liquidColor.split(',')[3]) < 1) ? true : false}
          opacity={liquidColor.split(',')[3] ? parseFloat(liquidColor.split(',')[3]) : 1}
          roughness={0.2}
          transmission={(liquidColor.split(',')[3] && parseFloat(liquidColor.split(',')[3]) < 1) ? 0.3 : 0}
        />
      </Cylinder>

      {/* The Hydrometer */}
      <group position={[0, currentY, 0]}>
        {/* Main Glass Tube */}
        <Cylinder args={[TUBE_RADIUS, TUBE_RADIUS, MAX_LENGTH, 16]}>
           <meshPhysicalMaterial color="#ffffff" transparent opacity={0.6} transmission={0.9} roughness={0.1} />
        </Cylinder>
        {/* Weighted Bulb at the bottom */}
        <Cylinder args={[TUBE_RADIUS * 1.5, TUBE_RADIUS * 1.5, 0.05, 16]} position={[0, -MAX_LENGTH/2, 0]}>
          <meshStandardMaterial color="#ef4444" roughness={0.5} />
        </Cylinder>
        {/* Lead shot weighting inside the bulb */}
        <Cylinder args={[TUBE_RADIUS * 1.4, TUBE_RADIUS * 1.4, 0.04, 16]} position={[0, -MAX_LENGTH/2 - 0.005, 0]}>
          <meshStandardMaterial color="#333333" roughness={0.8} />
        </Cylinder>
        
        {/* Scale markings on the stem */}
        {Array.from({length: 10}).map((_, i) => (
          <Box key={i} args={[0.045, 0.002, 0.002]} position={[0, (MAX_LENGTH/2) - 0.02 - (i * 0.03), TUBE_RADIUS]}>
            <meshBasicMaterial color="#333" />
          </Box>
        ))}
      </group>
    </>
  );
}

export default function HydrometerSimulator() {
  const [fluidIndex, setFluidIndex] = useState(0);
  const [addedDensity, setAddedDensity] = useState(0); // For adding sugar/salt
  const [isDropped, setIsDropped] = useState(false); // Controls if test is running

  const activeFluid = TUBE_TYPES[fluidIndex];
  const finalDensity = activeFluid.baseDensity + addedDensity;

  const specificGravity = (finalDensity / 1000).toFixed(3);

  let qualityStatus = '';
  let statusColor = '';

  if (activeFluid.name === 'Pure Milk') {
    if (addedDensity > 10) {
       qualityStatus = 'Unusually Dense (Possible Adulterant added to mask water)';
       statusColor = '#f59e0b';
    } else {
       qualityStatus = 'Standard Pure Milk';
       statusColor = '#34d399';
    }
  } else if (activeFluid.name === 'Adulterated Milk') {
    if (addedDensity >= 15) {
      qualityStatus = 'Faked Density (Watered down, then sugar added)';
      statusColor = '#f43f5e';
    } else {
      qualityStatus = 'Failed: Below 1.028 SG (Watered Down)';
      statusColor = '#ef4444';
    }
  } else {
    qualityStatus = 'Baseline Reference';
    statusColor = '#60a5fa';
  }

  return (
    <div className="orbit-canvas" style={{ position: 'relative', width: '100%', height: '650px', display: 'flex', overflow: 'hidden' }}>
      
      {/* UI Control Panel on the left */}
      <div style={{ flex: '0 0 45%', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '1.5rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.1)', color: '#fff', overflowY: 'hidden' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.25rem', color: '#fff' }}>Hydrometer Testing</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '1rem', lineHeight: '1.3' }}>
          Select a liquid and see how the hydrometer floats. Adulterated milk is less dense than pure milk because it's watered down. Adding sugar/salt chemically increases density.
        </p>

        {/* Readouts */}
        {isDropped ? (
          <div style={{ background: 'rgba(26,26,42,0.6)', border: `1px solid ${statusColor}`, borderRadius: '12px', padding: '1rem', textAlign: 'center', marginBottom: '1rem', transition: 'all 0.3s' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Specific Gravity Reading</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
              {specificGravity}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: statusColor, padding: '0.25rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
              {qualityStatus}
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(26,26,42,0.6)', border: `1px dashed rgba(255,255,255,0.3)`, borderRadius: '12px', padding: '1rem', textAlign: 'center', marginBottom: '1rem', transition: 'all 0.3s' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Status</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>
              Awaiting Test...
            </div>
          </div>
        )}

        {/* Drop Button */}
        <button
          onClick={() => setIsDropped(!isDropped)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            background: isDropped ? 'rgba(239, 68, 68, 0.2)' : 'var(--gradient-primary)',
            border: isDropped ? '1px solid rgba(239, 68, 68, 0.5)' : 'none',
            color: isDropped ? '#ef4444' : '#fff',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: isDropped ? 'none' : '0 4px 15px rgba(59, 130, 246, 0.4)',
            transition: 'all 0.2s'
          }}
        >
          {isDropped ? 'Reset Instrument' : 'Drop Hydrometer & Test'}
        </button>

        {/* Controls */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>Select Test Sample</label>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {TUBE_TYPES.map((type, i) => (
              <button
                key={i}
                onClick={() => { setFluidIndex(i); setAddedDensity(0); setIsDropped(false); }}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: fluidIndex === i ? `2px solid var(--accent-orange)` : '1px solid rgba(255,255,255,0.2)',
                  background: fluidIndex === i ? 'rgba(255,122,0,0.1)' : 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem', color: fluidIndex === i ? 'var(--accent-orange)' : '#fff' }}>{type.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Adulteration */}
        {(fluidIndex === 0 || fluidIndex === 2) && (
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-orange)' }}>Add Dissolved Solids (Sugar/Salt)</label>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>+{(addedDensity).toFixed(0)} kg/m³</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
              Adding dissolved solids increases density, masking the effect of watering down milk.
            </p>
            <input 
              type="range" 
              min="0" max="40" 
              value={addedDensity} 
              onChange={(e) => { setAddedDensity(parseFloat(e.target.value)); setIsDropped(false); }}
              className="sim-slider"
              style={{ accentColor: '#fbbf24' }}
            />
          </div>
        )}

      </div>

      {/* 3D Canvas on the right */}
      <div style={{ flex: '1 1 55%', height: '100%' }}>
        <Canvas shadows camera={{ position: [1.5, 0.5, 2], fov: 40 }}>
          <HydrometerScene 
            liquidDensity={finalDensity} 
            liquidColor={activeFluid.color}
            isDropped={isDropped}
          />
        </Canvas>
      </div>
    </div>
  );
}
