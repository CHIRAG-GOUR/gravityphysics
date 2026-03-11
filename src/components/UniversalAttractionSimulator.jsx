import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'
import { v4 as uuidv4 } from 'uuid'

const G_CONSTANT = 0.5 // High G for rapid visual demonstration
const SOFTENING = 0.1 // Prevent division by zero singularities
const TRAIL_LENGTH = 30

// Shared material to save performance
const bodyMaterial = new THREE.MeshStandardMaterial({ 
  color: '#8b5cf6', 
  roughness: 0.2, 
  metalness: 0.1,
  emissive: '#8b5cf6',
  emissiveIntensity: 0.2
})

function NBodySystem({ bodies, setBodies }) {
  const meshRefs = useRef({})
  const trailRefs = useRef({})

  useFrame((state, delta) => {
    // Cap delta to prevent explosive behavior on lag spikes
    const dt = Math.min(delta, 0.05)
    
    setBodies(prevBodies => {
      const newBodies = [...prevBodies]
      
      // 1. Calculate forces (O(N^2) naive approach is fine for < 50 bodies)
      for (let i = 0; i < newBodies.length; i++) {
        let ax = 0, ay = 0, az = 0
        const b1 = newBodies[i]
        
        for (let j = 0; j < newBodies.length; j++) {
          if (i === j) continue
          const b2 = newBodies[j]
          
          const dx = b2.p.x - b1.p.x
          const dy = b2.p.y - b1.p.y
          const dz = b2.p.z - b1.p.z
          
          // Clamp distance squared to prevent infinite acceleration at zero distance singularity
          const distSq = Math.max(dx*dx + dy*dy + dz*dz, SOFTENING)
          const dist = Math.sqrt(distSq)
          
          // F = G * m1 * m2 / r^2
          // a = F / m1 = G * m2 / r^2
          const accel = (G_CONSTANT * b2.m) / distSq
          
          ax += (accel * dx) / dist
          ay += (accel * dy) / dist
          az += (accel * dz) / dist
        }
        
        // Semi-implicit Euler integration + velocity damping for stability
        b1.v.x += ax * dt
        b1.v.y += ay * dt
        b1.v.z += az * dt
        
        // Clamp maximum velocity to prevent bodies shooting off to infinity in one frame
        const maxV = 20
        b1.v.clampLength(0, maxV)
      }
      
      // 2. Update positions and trails
      for (let i = 0; i < newBodies.length; i++) {
        const b = newBodies[i]
        b.p.x += b.v.x * dt
        b.p.y += b.v.y * dt
        b.p.z += b.v.z * dt
        
        // Update mesh
        if (meshRefs.current[b.id]) {
          meshRefs.current[b.id].position.copy(b.p)
        }
        
        // Update trail
        b.trail.unshift(b.p.clone())
        if (b.trail.length > TRAIL_LENGTH) b.trail.pop()
        
        if (trailRefs.current[b.id] && b.trail.length > 1) {
          trailRefs.current[b.id].setFromPoints(b.trail)
        }
      }
      
      return newBodies
    })
  })

  return (
    <group>
      {bodies.map(body => (
        <group key={body.id}>
          <mesh 
            ref={el => meshRefs.current[body.id] = el}
            position={body.p}
            material={bodyMaterial}
          >
            <sphereGeometry args={[body.radius, 16, 16]} />
          </mesh>
          <line ref={el => trailRefs.current[body.id] = el}>
            <bufferGeometry />
            <lineBasicMaterial color={body.color} transparent opacity={0.3} linewidth={1} />
          </line>
        </group>
      ))}
    </group>
  )
}

function ClickHandler({ setBodies, spawnMass }) {
  const { camera } = useThree()
  
  const handlePointerDown = (e) => {
    // Only respond to main canvas clicks, not OrbitControl drags
    if(e.delta > 2) return; 

    // Convert click to 3D position on z=0 plane
    const vec = new THREE.Vector3(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
      0.5
    )
    vec.unproject(camera)
    vec.sub(camera.position).normalize()
    const distance = -camera.position.z / vec.z
    const pos = new THREE.Vector3().copy(camera.position).add(vec.multiplyScalar(distance))
    
    // Add some random Z depth
    pos.z = (Math.random() - 0.5) * 5

    // Random initial velocity roughly tangential to center
    const dirToCenter = pos.clone().normalize()
    const tangent = new THREE.Vector3(-dirToCenter.y, dirToCenter.x, 0)
    const v = tangent.multiplyScalar(Math.random() * 2)

    const isStar = spawnMass > 50
    const color = isStar ? '#fbbf24' : `#${Math.floor(Math.random()*16777215).toString(16)}`

    setBodies(prev => [...prev, {
      id: uuidv4(),
      m: spawnMass,
      radius: Math.max(0.2, Math.pow(spawnMass, 1/3) * 0.2), // Rough volume estimation
      p: pos,
      v: v,
      trail: [],
      color: color
    }])
  }

  return (
    <mesh visible={false} onPointerDown={handlePointerDown}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}

export default function UniversalAttractionSimulator() {
  const [bodies, setBodies] = useState([])
  const [spawnMass, setSpawnMass] = useState(1)

  const clearBodies = () => setBodies([])
  
  const spawnSolarSystem = () => {
    setBodies([
      { id: uuidv4(), m: 500, radius: 1.5, p: new THREE.Vector3(0,0,0), v: new THREE.Vector3(0,0,0), trail: [], color: '#fbbf24' }, // Sun
      { id: uuidv4(), m: 5, radius: 0.4, p: new THREE.Vector3(4,0,0), v: new THREE.Vector3(0,7,0), trail: [], color: '#3b82f6' },   // Planet 1
      { id: uuidv4(), m: 2, radius: 0.3, p: new THREE.Vector3(-6,0,0), v: new THREE.Vector3(0,-5.5,0), trail: [], color: '#ef4444' }  // Planet 2
    ])
  }

  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.25rem' }}>Universal Gravity Sandbox</h3>
          <p className="section-subtitle">Click anywhere to spawn mass and watch mutual attraction.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '1rem' }}>
             <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Spawn Mass:</span>
             <input 
               type="range" 
               min="1" max="100" 
               value={spawnMass} 
               onChange={(e) => setSpawnMass(Number(e.target.value))}
               className="physics-slider"
               style={{ width: '80px' }}
             />
             <span style={{ fontSize: '0.85rem', width: '30px' }}>{spawnMass}</span>
          </div>

          <button className="panel-button" onClick={spawnSolarSystem} style={{ background: 'var(--gradient-primary)', color: '#fff' }}>
            Preset: Orbits
          </button>
          <button className="panel-button" onClick={clearBodies} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
            Clear
          </button>
        </div>
      </div>

      <div style={{ 
        width: '100%', height: '500px', 
        borderRadius: '16px', overflow: 'hidden',
        position: 'relative', background: '#020617',
        cursor: 'crosshair'
      }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <NBodySystem bodies={bodies} setBodies={setBodies} />
          <ClickHandler setBodies={setBodies} spawnMass={spawnMass} />
          <OrbitControls enableZoom={true} enablePan={false} />
        </Canvas>
        
        {bodies.length === 0 && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            pointerEvents: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', fontWeight: 600
          }}>
            Click to spawn mass
          </div>
        )}
        
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px', right: '12px',
          padding: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          borderRadius: '8px', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem'
        }}>
           <b>N-Body Physics Engine:</b> Every single spawned object is mathematically pulling on every other spawned object simultaneously in real-time.
        </div>
      </div>
    </div>
  )
}
