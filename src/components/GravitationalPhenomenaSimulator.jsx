import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function GravitationalPhenomenaSimulator() {
  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem' }}>
      <h3 className="section-title">Gravitational Phenomena Simulator</h3>
      <p className="section-subtitle">Visualizing the 4 key effects of Universal Gravitation.</p>
      <div style={{ width: '100%', height: '400px', backgroundColor: '#020617', borderRadius: '16px' }}>
      </div>
    </div>
  )
}
