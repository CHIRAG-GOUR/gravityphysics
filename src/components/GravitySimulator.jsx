import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const G = 6.674e-11

export default function GravitySimulator() {
  const [mass1, setMass1] = useState(100)
  const [mass2, setMass2] = useState(100)
  const [distance, setDistance] = useState(10)
  const canvasRef = useRef(null)

  const force = useMemo(() => G * mass1 * mass2 / (distance * distance), [mass1, mass2, distance])

  const obj1Size = Math.max(16, Math.min(40, 16 + mass1 / 30))
  const obj2Size = Math.max(16, Math.min(40, 16 + mass2 / 30))

  // Render gravitational field visualization on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height

    ctx.clearRect(0, 0, W, H)

    const cx1 = W * 0.3, cy = H / 2, cx2 = W * 0.7
    const maxDist = Math.max(W, H)

    // Gravitational field lines
    for (let r = 20; r < maxDist; r += 25) {
      const alpha = Math.max(0.02, 0.12 - r / maxDist * 0.12)

      // Obj 1 field
      ctx.beginPath()
      ctx.arc(cx1, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(108,159,255,${alpha})`
      ctx.lineWidth = 0.8
      ctx.stroke()

      // Obj 2 field
      ctx.beginPath()
      ctx.arc(cx2, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(244,114,182,${alpha})`
      ctx.lineWidth = 0.8
      ctx.stroke()
    }

    // Force line connecting both
    const forceStrength = Math.min(5, Math.log10(force + 1e-20) + 12)
    const lineWidth = Math.max(0.5, forceStrength * 0.8)

    ctx.setLineDash([8, 6])
    ctx.beginPath()
    ctx.moveTo(cx1, cy)
    ctx.lineTo(cx2, cy)
    ctx.strokeStyle = `rgba(251,191,36,${Math.min(0.8, forceStrength * 0.12)})`
    ctx.lineWidth = lineWidth
    ctx.stroke()
    ctx.setLineDash([])

    // Force arrows
    const arrowSize = Math.max(6, forceStrength * 2)
    // Arrow pointing right (from obj1)
    const midX = (cx1 + cx2) / 2
    ctx.beginPath()
    ctx.moveTo(midX - 15, cy)
    ctx.lineTo(midX - 15 - arrowSize, cy - arrowSize * 0.6)
    ctx.lineTo(midX - 15 - arrowSize, cy + arrowSize * 0.6)
    ctx.fillStyle = 'rgba(251,191,36,0.7)'
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(midX + 15, cy)
    ctx.lineTo(midX + 15 + arrowSize, cy - arrowSize * 0.6)
    ctx.lineTo(midX + 15 + arrowSize, cy + arrowSize * 0.6)
    ctx.fillStyle = 'rgba(251,191,36,0.7)'
    ctx.fill()

    // Obj 1 (blue planet)
    const grad1 = ctx.createRadialGradient(cx1, cy, obj1Size * 0.3, cx1, cy, obj1Size)
    grad1.addColorStop(0, '#93b8ff')
    grad1.addColorStop(1, '#3a6fd8')
    ctx.beginPath()
    ctx.arc(cx1, cy, obj1Size, 0, Math.PI * 2)
    ctx.fillStyle = grad1
    ctx.fill()
    ctx.shadowColor = '#6C9FFF'
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.arc(cx1, cy, obj1Size + 1, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(108,159,255,0.4)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.shadowBlur = 0

    // Obj 2 (pink planet)
    const grad2 = ctx.createRadialGradient(cx2, cy, obj2Size * 0.3, cx2, cy, obj2Size)
    grad2.addColorStop(0, '#fca4ce')
    grad2.addColorStop(1, '#d14080')
    ctx.beginPath()
    ctx.arc(cx2, cy, obj2Size, 0, Math.PI * 2)
    ctx.fillStyle = grad2
    ctx.fill()
    ctx.shadowColor = '#F472B6'
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.arc(cx2, cy, obj2Size + 1, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(244,114,182,0.4)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.shadowBlur = 0

    // Labels
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '11px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(`${mass1} kg`, cx1, cy + obj1Size + 20)
    ctx.fillText(`${mass2} kg`, cx2, cy + obj2Size + 20)
    ctx.fillText(`${distance} m`, midX, cy - 15)

  }, [mass1, mass2, distance, force])

  return (
    <motion.div
      className="neu-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', boxShadow: '0 0 12px rgba(108,159,255,0.3)' }}>F</div>
        <h3 className="section-title" style={{ marginBottom: 0 }}>Gravitational Field Simulator</h3>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Observe how gravitational fields interact. Adjust mass and distance to see the force change in real-time.
      </p>

      {/* Canvas Visualization */}
      <canvas
        ref={canvasRef}
        width={700}
        height={300}
        className="orbit-canvas"
        style={{ width: '100%', maxWidth: 700, marginBottom: '2rem' }}
      />

      {/* Controls + Result */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Mass 1: <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{mass1} kg</span>
            </label>
            <input type="range" min="1" max="1000" value={mass1}
              onChange={e => setMass1(+e.target.value)} className="sim-slider" style={{ marginTop: '0.5rem' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Mass 2: <span style={{ color: 'var(--accent-pink)', fontWeight: 700 }}>{mass2} kg</span>
            </label>
            <input type="range" min="1" max="1000" value={mass2}
              onChange={e => setMass2(+e.target.value)} className="sim-slider" style={{ marginTop: '0.5rem' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Distance: <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{distance} m</span>
            </label>
            <input type="range" min="1" max="100" value={distance}
              onChange={e => setDistance(+e.target.value)} className="sim-slider" style={{ marginTop: '0.5rem' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Gravitational Force</p>
          <motion.p
            className="sim-value"
            key={force.toExponential(3)}
            initial={{ scale: 1.08, filter: 'brightness(1.3)' }}
            animate={{ scale: 1, filter: 'brightness(1)' }}
            transition={{ duration: 0.25 }}
          >
            {force.toExponential(3)} N
          </motion.p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
            F = G × (M₁ × M₂) / d²
          </p>
        </div>
      </div>
    </motion.div>
  )
}
