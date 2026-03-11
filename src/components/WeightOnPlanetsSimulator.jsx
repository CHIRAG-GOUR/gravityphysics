import React, { useState } from 'react'

export default function WeightOnPlanetsSimulator() {
  const [selectedPlanet, setSelectedPlanet] = useState('Earth')
  const massKg = 10

  const planets = {
    Earth: { g: 9.8, color: '#3b82f6', bg: '#eff6ff', emoji: '🌍' },
    Moon: { g: 1.62, color: '#94a3b8', bg: '#f8fafc', emoji: '🌕' },
    Mars: { g: 3.71, color: '#ef4444', bg: '#fef2f2', emoji: '🔴' },
    Jupiter: { g: 24.79, color: '#f59e0b', bg: '#fffbeb', emoji: '🪐' },
  }

  const currentPlanet = planets[selectedPlanet]
  const weightN = (massKg * currentPlanet.g).toFixed(1)

  // Calculate a visual spring squish based on weight (relative to Earth as 1.0)
  const squishFactor = Math.min(Math.max((currentPlanet.g / 9.8) * 20, 5), 40) // pixels to push down

  return (
    <div className="neu-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Cosmic Scale Visualizer</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>A 10 kg mass travels across the solar system. Observe how its <b>Mass</b> stays exactly the same everywhere, but its <b>Weight</b> (the force pushing down on the scale) changes drastically depending on the local gravity.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {Object.keys(planets).map(planet => (
          <button
            key={planet}
            onClick={() => setSelectedPlanet(planet)}
            className="interactive-btn"
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '8px',
              border: `2px solid ${selectedPlanet === planet ? currentPlanet.color : 'transparent'}`,
              background: selectedPlanet === planet ? currentPlanet.bg : '#f1f5f9',
              color: selectedPlanet === planet ? currentPlanet.color : 'var(--text-secondary)',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <span>{planets[planet].emoji}</span>
            {planet}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', background: currentPlanet.bg, padding: '2rem', borderRadius: '16px', border: `2px dashed ${currentPlanet.color}50` }}>
        
        {/* Visualizer Area */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minHeight: '300px', position: 'relative' }}>
          
          {/* Environment Label */}
          <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1, fontSize: '8rem', pointerEvents: 'none' }}>
             {currentPlanet.emoji}
          </div>

          {/* Mass */}
          <div style={{ 
            width: '100px', 
            height: '100px', 
            background: 'linear-gradient(135deg, #475569, #1e293b)', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 2,
            transform: `translateY(${squishFactor}px)`,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            10 kg
          </div>

          {/* Spring */}
          <div style={{
            width: '40px',
            height: `${80 - squishFactor}px`,
            borderLeft: '4px solid #94a3b8',
            borderRight: '4px solid #94a3b8',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, #94a3b8 5px, #94a3b8 10px)',
            transition: 'height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 1
          }} />

          {/* Scale Base */}
          <div style={{ 
            width: '200px', 
            height: '40px', 
            background: '#e2e8f0', 
            borderRadius: '8px', 
            borderBottom: '8px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.5)'
          }}>
             <div style={{ background: '#0f172a', color: '#10b981', fontFamily: 'monospace', padding: '0.2rem 1rem', borderRadius: '4px', fontSize: '1.2rem', fontWeight: 'bold' }}>
               {weightN} N
             </div>
          </div>
          
          {/* Ground */}
          <div style={{ width: '100%', height: '4px', background: currentPlanet.color, marginTop: '10px', borderRadius: '2px', opacity: 0.5 }} />
        </div>

        {/* Data readout */}
        <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
             <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Location</h4>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: currentPlanet.color }}>{selectedPlanet}</div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <div>
               <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Mass (m)</h4>
               <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-black)' }}>{massKg} kg</div>
             </div>
             <div style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b' }}>
               CONSTANT
             </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderLeft: `6px solid ${currentPlanet.color}` }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
               <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Weight (W = mg)</h4>
               <div style={{ fontSize: '0.8rem', color: currentPlanet.color, fontWeight: 'bold' }}>g = {currentPlanet.g} m/s²</div>
             </div>
             <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-black)' }}>{weightN} N</div>
          </div>

        </div>

      </div>
    </div>
  )
}
