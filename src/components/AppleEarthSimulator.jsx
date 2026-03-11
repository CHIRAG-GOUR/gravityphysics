import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// The simulation involves Earth (Massive) and an Apple (Tiny), demonstrating F=ma and F_ab = -F_ba

const G_CONSTANT = 0.005; // Artificially large for visual effect

function PhysicsBodies({ running, resetTrigger }) {
  const earthRef = useRef()
  const appleRef = useRef()
  const earthLabelRef = useRef()
  const appleLabelRef = useRef()

  // State vectors
  const pEarth = useRef(new THREE.Vector3(-4, 0, 0))
  const pApple = useRef(new THREE.Vector3(4, 0, 0))
  const vEarth = useRef(new THREE.Vector3(0, 0, 0))
  const vApple = useRef(new THREE.Vector3(0, 0, 0))

  const massEarth = 5000;
  const massApple = 1;

  useEffect(() => {
    // Reset positions on trigger
    pEarth.current.set(-4, 0, 0)
    pApple.current.set(4, 0, 0)
    vEarth.current.set(0, 0, 0)
    vApple.current.set(0, 0, 0)
    if(earthRef.current) earthRef.current.position.copy(pEarth.current)
    if(appleRef.current) appleRef.current.position.copy(pApple.current)
  }, [resetTrigger])

  useFrame((state, delta) => {
    if (!running) return;

    const r = new THREE.Vector3().subVectors(pApple.current, pEarth.current)
    const distSq = r.lengthSq()
    
    // Prevent singularity explosion
    if (distSq < 2.5) return; 

    const forceMag = G_CONSTANT * ((massEarth * massApple) / distSq)
    const rDir = r.normalize()

    // F_earth = +F
    const forceEarth = rDir.clone().multiplyScalar(forceMag)
    // F_apple = -F (Newton's 3rd Law)
    const forceApple = rDir.clone().multiplyScalar(-forceMag)

    // a = F/m (Newton's 2nd Law)
    const aEarth = forceEarth.clone().divideScalar(massEarth)
    const aApple = forceApple.clone().divideScalar(massApple)

    // Euler integration
    vEarth.current.add(aEarth.multiplyScalar(delta))
    vApple.current.add(aApple.multiplyScalar(delta))

    pEarth.current.add(vEarth.current.clone().multiplyScalar(delta))
    pApple.current.add(vApple.current.clone().multiplyScalar(delta))

    // Update meshes
    if (earthRef.current) earthRef.current.position.copy(pEarth.current)
    if (appleRef.current) appleRef.current.position.copy(pApple.current)
    
    // Update labels to follow meshes
    if (earthLabelRef.current) {
        earthLabelRef.current.position.copy(pEarth.current);
        earthLabelRef.current.position.y += 2.2;
    }
    if (appleLabelRef.current) {
        appleLabelRef.current.position.copy(pApple.current);
        appleLabelRef.current.position.y += 0.8;
    }
  })

  return (
    <>
      {/* Massive Earth */}
      <Sphere ref={earthRef} args={[1.5, 32, 32]} position={[-4, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" map={null} />
      </Sphere>
      <Text ref={earthLabelRef} position={[-4, 2.2, 0]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
        Earth (Ag ≈ 0)
      </Text>

      {/* Tiny Apple */}
      <Sphere ref={appleRef} args={[0.3, 16, 16]} position={[4, 0, 0]}>
        <meshStandardMaterial color="#ef4444" />
      </Sphere>
      <Text ref={appleLabelRef} position={[4, 0.8, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        Apple (Aa &gt;&gt; 0)
      </Text>

      {/* Equal and Opposite Force Vectors UI representation */}
      <Text position={[0, -2, 0]} fontSize={0.5} color="rgba(255,255,255,0.8)" anchorX="center" anchorY="middle">
        F(Earth on Apple) = -F(Apple on Earth)
      </Text>
    </>
  )
}

export default function AppleEarthSimulator() {
  const [running, setRunning] = useState(false)
  const [resetCount, setResetCount] = useState(0)

  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.25rem' }}>Apple vs. Earth Simulator</h3>
          <p className="section-subtitle">Visualizing the 2nd and 3rd Laws of Motion</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="panel-button" 
            onClick={() => setRunning(!running)}
            style={{ 
              background: running ? 'rgba(239, 68, 68, 0.1)' : 'var(--gradient-primary)',
              color: running ? '#ef4444' : '#fff',
              border: running ? '1px solid #ef4444' : 'none'
            }}
          >
            {running ? 'Pause' : 'Play Simulation'}
          </button>
          <button 
            className="panel-button"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}
            onClick={() => {
              setRunning(false)
              setResetCount(c => c + 1)
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ 
        width: '100%', 
        height: '400px', 
        borderRadius: '16px', 
        overflow: 'hidden',
        position: 'relative',
        background: '#050B14' 
      }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <PhysicsBodies running={running} resetTrigger={resetCount} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          padding: '12px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '0.85rem',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div><b>Newton's 3rd Law:</b> Both objects pull on each other with the <em>exact same force</em>.</div>
          <div style={{textAlign: 'right'}}><b>Newton's 2nd Law:</b> Earth's massive inertia drastically limits its acceleration.</div>
        </div>
      </div>
    </div>
  )
}
