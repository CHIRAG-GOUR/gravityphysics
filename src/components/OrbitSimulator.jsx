import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function OrbitSimulator() {
  const canvasRef = useRef(null)
  const [speed, setSpeed] = useState(1)
  const [showTrail, setShowTrail] = useState(true)
  const [showField, setShowField] = useState(true)
  const speedRef = useRef(1)
  const showTrailRef = useRef(true)
  const showFieldRef = useRef(true)
  const angleRef = useRef(0)

  useEffect(() => { speedRef.current = speed }, [speed])
  useEffect(() => { showTrailRef.current = showTrail }, [showTrail])
  useEffect(() => { showFieldRef.current = showField }, [showField])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2
    let animId
    const trailPoints = []

    // Stars
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H, s: Math.random() * 1.5 + 0.3, phase: Math.random() * Math.PI * 2
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Stars
      stars.forEach(s => {
        const brightness = 0.15 + Math.sin(Date.now() / 2000 + s.phase) * 0.12
        ctx.fillStyle = `rgba(180,190,255,${brightness})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2)
        ctx.fill()
      })

      // Gravitational field (concentric rings around planet)
      if (showFieldRef.current) {
        for (let r = 30; r < 260; r += 22) {
          const alpha = Math.max(0.015, 0.08 - r / 300 * 0.08)
          ctx.beginPath()
          ctx.arc(cx, cy, r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(108,159,255,${alpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      // Orbit path
      ctx.strokeStyle = 'rgba(108,159,255,0.1)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 6])
      ctx.beginPath()
      ctx.arc(cx, cy, 140, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      // Planet (central body) with atmosphere
      // Atmosphere
      const atmo = ctx.createRadialGradient(cx, cy, 30, cx, cy, 55)
      atmo.addColorStop(0, 'rgba(108,159,255,0.08)')
      atmo.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(cx, cy, 55, 0, Math.PI * 2)
      ctx.fillStyle = atmo
      ctx.fill()

      // Planet body
      const pGrad = ctx.createRadialGradient(cx - 8, cy - 8, 8, cx, cy, 36)
      pGrad.addColorStop(0, '#6cabff')
      pGrad.addColorStop(0.5, '#3a6fd8')
      pGrad.addColorStop(1, '#1a3a6e')
      ctx.beginPath()
      ctx.arc(cx, cy, 36, 0, Math.PI * 2)
      ctx.fillStyle = pGrad
      ctx.fill()

      // Planet glow
      ctx.shadowColor = '#6C9FFF'
      ctx.shadowBlur = 30
      ctx.strokeStyle = 'rgba(108,159,255,0.3)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(cx, cy, 37, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0

      // Moon position
      angleRef.current += 0.018 * speedRef.current
      const mX = cx + Math.cos(angleRef.current) * 140
      const mY = cy + Math.sin(angleRef.current) * 140

      // Trail
      trailPoints.push({ x: mX, y: mY })
      if (trailPoints.length > 80) trailPoints.shift()

      if (showTrailRef.current && trailPoints.length > 2) {
        for (let i = 1; i < trailPoints.length; i++) {
          const alpha = (i / trailPoints.length) * 0.5
          ctx.beginPath()
          ctx.moveTo(trailPoints[i - 1].x, trailPoints[i - 1].y)
          ctx.lineTo(trailPoints[i].x, trailPoints[i].y)
          ctx.strokeStyle = `rgba(167,139,250,${alpha})`
          ctx.lineWidth = (i / trailPoints.length) * 3
          ctx.stroke()
        }
      }

      // Gravitational force line
      ctx.setLineDash([4, 6])
      ctx.strokeStyle = 'rgba(251,191,36,0.2)'
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(mX, mY)
      ctx.stroke()
      ctx.setLineDash([])

      // Velocity vector (tangential)
      const vAngle = angleRef.current + Math.PI / 2
      const vLen = 30 * speedRef.current
      const vX = mX + Math.cos(vAngle) * vLen
      const vY = mY + Math.sin(vAngle) * vLen
      ctx.strokeStyle = 'rgba(52,211,153,0.5)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(mX, mY)
      ctx.lineTo(vX, vY)
      ctx.stroke()
      // Arrow head
      const aSize = 6
      const aAngle1 = vAngle + Math.PI * 0.85
      const aAngle2 = vAngle - Math.PI * 0.85
      ctx.beginPath()
      ctx.moveTo(vX, vY)
      ctx.lineTo(vX + Math.cos(aAngle1) * aSize, vY + Math.sin(aAngle1) * aSize)
      ctx.lineTo(vX + Math.cos(aAngle2) * aSize, vY + Math.sin(aAngle2) * aSize)
      ctx.fillStyle = 'rgba(52,211,153,0.5)'
      ctx.fill()

      // Moon glow
      ctx.shadowColor = '#A78BFA'
      ctx.shadowBlur = 15

      // Moon body
      const mGrad = ctx.createRadialGradient(mX - 2, mY - 2, 2, mX, mY, 11)
      mGrad.addColorStop(0, '#d4c4ff')
      mGrad.addColorStop(0.6, '#a78bfa')
      mGrad.addColorStop(1, '#6b4cc0')
      ctx.beginPath()
      ctx.arc(mX, mY, 11, 0, Math.PI * 2)
      ctx.fillStyle = mGrad
      ctx.fill()
      ctx.shadowBlur = 0

      // Labels
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.font = '10px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Planet', cx, cy + 52)
      ctx.fillText('Moon', mX, mY + 22)

      // Legend
      ctx.font = '9px Inter, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(251,191,36,0.45)'
      ctx.fillText('— Gravitational Pull', 16, H - 36)
      ctx.fillStyle = 'rgba(52,211,153,0.45)'
      ctx.fillText('— Velocity Vector', 16, H - 22)
      ctx.fillStyle = 'rgba(167,139,250,0.45)'
      ctx.fillText('— Orbit Trail', 16, H - 8)

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <motion.div
      className="neu-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#fff', fontWeight: 700, boxShadow: '0 0 12px rgba(167,139,250,0.3)' }}>O</div>
        <h3 className="section-title" style={{ marginBottom: 0 }}>Orbital Mechanics</h3>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        A moon in free fall — its tangential velocity keeps it from crashing into the planet, creating a stable orbit.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <canvas ref={canvasRef} width={520} height={520} className="orbit-canvas" style={{ width: '100%', maxWidth: 480 }} />

        {/* Controls */}
        <div style={{ marginTop: '1.5rem', width: '100%', maxWidth: 400, display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Speed: <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>{speed.toFixed(1)}x</span>
            </label>
            <input type="range" min="0.1" max="4" step="0.1" value={speed}
              onChange={e => setSpeed(+e.target.value)} className="sim-slider" style={{ marginTop: '0.4rem' }} />
          </div>
          <button
            onClick={() => setShowTrail(t => !t)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${showTrail ? 'var(--accent-purple)' : 'var(--card-border)'}`,
              background: showTrail ? 'rgba(167,139,250,0.1)' : 'transparent',
              color: showTrail ? 'var(--accent-purple)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-heading)',
              transition: 'all 0.3s'
            }}
          >
            Trail
          </button>
          <button
            onClick={() => setShowField(f => !f)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${showField ? 'var(--accent-blue)' : 'var(--card-border)'}`,
              background: showField ? 'rgba(108,159,255,0.1)' : 'transparent',
              color: showField ? 'var(--accent-blue)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-heading)',
              transition: 'all 0.3s'
            }}
          >
            Field
          </button>
        </div>
      </div>
    </motion.div>
  )
}
