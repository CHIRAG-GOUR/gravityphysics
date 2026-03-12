import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment, Float, Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Visualizes a plastic bottle being pushed into water.
 * The deeper it goes, the larger the upward buoyant force vector grows.
 * When released, it bounces back to the surface.
 */

// Simple Bottle Geometry Model
const Bottle = ({ position, color = '#2a9d8f' }) => {
  return (
    <group position={position}>
      {/* Bottle Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2.5, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          transmission={0.8} 
          opacity={0.8} 
          transparent
          clearcoat={1}
          clearcoatRoughness={0.1}
          roughness={0.2}
          ior={1.33}
        />
      </mesh>
      {/* Bottle Neck curve */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.3, 0.8, 0.4, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          transmission={0.8} 
          transparent
          roughness={0.2}
        />
      </mesh>
      {/* Bottle Spout */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.3, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          transmission={0.8} 
          transparent
          roughness={0.2}
        />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
        <meshStandardMaterial color="#e76f51" />
      </mesh>
    </group>
  )
}

// Arrow component to show force vectors
const ForceArrow = ({ start, end, color }) => {
  const direction = new THREE.Vector3().subVectors(end, start)
  const length = direction.length()
  
  if (length < 0.1) return null

  return (
    <group position={start}>
      <arrowHelper args={[direction.normalize(), new THREE.Vector3(0,0,0), length, color, 0.5, 0.3]} />
    </group>
  )
}

const Scene = ({ depth, isPushing }) => {
  // Y-axis zero is the water surface.
  // The bottle stands at y = 1.25 initially so its bottom touches the water.
  // As depth goes from 0 to 100, we push the bottle down to y = -2.

  const bottleY = isPushing 
    ? 1.25 - (depth / 100) * 3.5 
    : 1.25 // Will animate this in a future iteration, for now it snaps back

  // Buoyant force increases as depth increases (volume submerged)
  // Max buoyant force vector length = 5
  const buoyantForceLength = Math.max(0, (depth / 100) * 5)
  // Gravity force is constant
  const gravityForceLength = 1.5

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      {/* Water Pool Context */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial 
          color="#0077be" 
          transparent 
          opacity={0.4} 
          transmission={0.9} 
          roughness={0.1}
          thickness={2}
        />
      </mesh>
      
      {/* The Container / Bucket borders */}
      <mesh position={[0, -1.5, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4, 3, 32, 1, true]} />
        <meshStandardMaterial color="#888" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, -3, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4, 0.1, 32]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      <Float speed={isPushing ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        <Bottle position={[0, bottleY, 0]} />
      </Float>

      {/* Force Vectors */}
      {/* Gravity: Always pointing down from bottle center */}
      <ForceArrow 
        start={new THREE.Vector3(1.5, bottleY, 0)} 
        end={new THREE.Vector3(1.5, bottleY - gravityForceLength, 0)} 
        color={0xff0000} 
      />
      {/* Buoyancy: Pointing up from bottle bottom. Only appears when submerged (depth > 0) */}
      <ForceArrow 
        start={new THREE.Vector3(0, bottleY - 1.25, 1.5)} 
        end={new THREE.Vector3(0, bottleY - 1.25 + buoyantForceLength, 1.5)} 
        color={0x00ff00} 
      />
    </>
  )
}

export default function BottleBuoyancySimulator() {
  const [depth, setDepth] = useState(0)
  const [isPushing, setIsPushing] = useState(false)

  const handlePointerDown = () => setIsPushing(true)
  
  const handlePointerUp = () => {
    setIsPushing(false)
    setDepth(0) // Bottle snaps back to surface
  }
  
  const handlePointerMove = (e) => {
    if (isPushing) {
      // Rough mapping of mouse Y to depth percentage
      const newDepth = Math.max(0, Math.min(100, depth + (e.movementY * 0.5)))
      setDepth(newDepth)
    }
  }

  // Calculate external force needed
  // We'll say plastic bottle weight = 1N.
  // Max upthrust = 20N.
  const buoyantForce = (depth / 100) * 20
  const gravityForce = 1.0
  const netForce = buoyantForce - gravityForce
  const requiredPushForce = Math.max(0, netForce)

  return (
    <div className="orbit-canvas" style={{ position: 'relative', height: '600px', maxWidth: '1000px', margin: '0 auto', overflow: 'hidden' }}>
      
      {/* Interactive Canvas Area */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, cursor: 'ns-resize', zIndex: 10 }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[5, 3, 8]} fov={45} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
          />
          <Environment preset="city" />
          <Scene depth={depth} isPushing={isPushing} />
        </Canvas>
      </div>

      {/* Control overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 20, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '0.5rem' }}>Buoyancy Forces</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '400px' }}>Click and drag downward to submerge the empty bottle. Watch the upward buoyant force grow as the bottle displaces more water.</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
           <div style={{ background: 'rgba(26, 26, 42, 0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
             <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>Gravity (Weight)</div>
             <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ff6b6b' }}>{gravityForce.toFixed(1)} N <span style={{ fontSize: '0.875rem', fontWeight: 'normal' }}>⬇</span></div>
           </div>

           <div style={{ background: 'rgba(26, 26, 42, 0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
             <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>Upthrust (Buoyancy)</div>
             <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#51cf66' }}>{buoyantForce.toFixed(1)} N <span style={{ fontSize: '0.875rem', fontWeight: 'normal' }}>⬆</span></div>
           </div>

           <div style={{ background: 'rgba(26, 26, 42, 0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(74, 108, 247, 0.3)', padding: '1rem', borderRadius: 'var(--radius-sm)', boxShadow: '0 0 15px rgba(74, 108, 247, 0.2)', marginLeft: 'auto' }}>
             <div style={{ fontSize: '0.875rem', color: '#a5b4fc', marginBottom: '0.25rem' }}>Your Downward Push</div>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#748ffc' }}>{requiredPushForce.toFixed(1)} N</div>
             <div style={{ fontSize: '0.75rem', color: '#bac8ff', marginTop: '0.25rem' }}>{requiredPushForce > 0 ? "Needed to keep it submerged" : "Bottle floats naturally"}</div>
           </div>
        </div>

        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold', letterSpacing: '0.1em', pointerEvents: 'none', transition: 'opacity 0.3s', opacity: isPushing ? 0 : 0.3 }}>
          CLICK & DRAG DOWN
        </div>
      </div>
    </div>
  )
}
