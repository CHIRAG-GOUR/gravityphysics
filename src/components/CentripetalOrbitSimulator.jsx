import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function CentripetalOrbitSimulator() {
  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem' }}>
      <h3 className="section-title">Moon Orbit Centripetal Simulator</h3>
      <p className="section-subtitle">Visualizing Earth's gravity constantly pulling the Moon, keeping it in orbit.</p>
      <div style={{ width: '100%', height: '400px', backgroundColor: '#020617', borderRadius: '16px' }}>
      </div>
    </div>
  )
}
