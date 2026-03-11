import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function CentripetalStringSimulator() {
  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem' }}>
      <h3 className="section-title">Centripetal Force Simulator</h3>
      <p className="section-subtitle">Visualizing the tension of a string acting as centripetal force.</p>
      <div style={{ width: '100%', height: '400px', backgroundColor: '#020617', borderRadius: '16px' }}>
      </div>
    </div>
  )
}
