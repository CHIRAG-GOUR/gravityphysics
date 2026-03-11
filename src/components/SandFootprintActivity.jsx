import React, { useState } from 'react'

export default function SandFootprintActivity() {
  const [stance, setStance] = useState('STAND') // 'STAND' or 'LIE'

  const massKg = 60
  const thrustN = massKg * 9.8 // ~588 N

  const areaFeetM2 = 0.05 // Typical area for two feet
  const areaBodyM2 = 1.20 // Typical area for body lying down

  const currentArea = stance === 'STAND' ? areaFeetM2 : areaBodyM2
  const pressurePa = thrustN / currentArea

  // Visual calculation for depth
  // Sand "yields" based on pressure. 10000 Pa = max depth
  const depthPercentage = Math.min((pressurePa / 12000) * 100, 95)
  const depthPx = (depthPercentage / 100) * 150

  return (
    <div className="neu-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Sand Footprint Activity</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Observe how the exact same force (Thrust) creates drastically different effects depending on the Area of Contact.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Environment Pane */}
        <div style={{ flex: '1 1 350px', position: 'relative', height: '400px', backgroundColor: '#e2e8f0', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          {/* Controls Overlay */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
             <button 
               onClick={() => setStance('STAND')}
               style={{ 
                 padding: '0.5rem 1rem', 
                 borderRadius: '8px', 
                 border: 'none', 
                 background: stance === 'STAND' ? 'var(--accent-orange)' : 'transparent',
                 color: stance === 'STAND' ? 'white' : 'var(--text-secondary)',
                 fontWeight: 'bold',
                 cursor: 'pointer',
                 transition: 'all 0.2s'
               }}
             >
               Stand on Sand
             </button>
             <button 
               onClick={() => setStance('LIE')}
               style={{ 
                 padding: '0.5rem 1rem', 
                 borderRadius: '8px', 
                 border: 'none', 
                 background: stance === 'LIE' ? 'var(--accent-blue)' : 'transparent',
                 color: stance === 'LIE' ? 'white' : 'var(--text-secondary)',
                 fontWeight: 'bold',
                 cursor: 'pointer',
                 transition: 'all 0.2s'
               }}
             >
               Lie Down
             </button>
          </div>

          {/* Sky */}
          <div style={{ flex: 1, backgroundColor: '#bae6fd', position: 'relative' }}>
             {/* Character */}
             <div style={{
               position: 'absolute',
               bottom: `-${depthPx}px`, // Sink into the ground
               left: '50%',
               transform: 'translateX(-50%)',
               width: stance === 'STAND' ? '40px' : '200px',
               height: stance === 'STAND' ? '120px' : '30px',
               background: stance === 'STAND' ? 'linear-gradient(to bottom, #ef4444, #b91c1c)' : 'linear-gradient(to right, #ef4444, #b91c1c)',
               borderRadius: '10px',
               transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
               boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               color: 'white',
               fontWeight: 'bold',
               fontSize: '0.8rem',
               zIndex: 2
             }}>
                {massKg} kg
             </div>
          </div>

          {/* Sand Ground */}
          <div style={{ height: '150px', backgroundColor: '#fcd34d', position: 'relative', overflow: 'hidden' }}>
             {/* Sand texture lines */}
             <div style={{ position: 'absolute', top: '10px', left: 0, width: '100%', height: '2px', background: 'rgba(217,119,6,0.2)' }} />
             <div style={{ position: 'absolute', top: '30px', left: 0, width: '100%', height: '2px', background: 'rgba(217,119,6,0.1)' }} />
             <div style={{ position: 'absolute', top: '70px', left: 0, width: '100%', height: '2px', background: 'rgba(217,119,6,0.15)' }} />
             
             {/* Depth metric line */}
             <div style={{ 
               position: 'absolute', 
               top: 0, 
               left: '10%', 
               width: '2px', 
               height: `${depthPx}px`, 
               background: 'var(--accent-red)',
               transition: 'height 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
               display: 'flex',
               alignItems: 'flex-end',
               paddingLeft: '5px'
             }}>
                <span style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                  Depth
                </span>
             </div>
          </div>

        </div>

        {/* Data readout */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          
          <div style={{ background: 'rgba(240,245,255,1)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #cbd5e1' }}>
             <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Thrust (Force)</h4>
             <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent-black)' }}>{thrustN} N</div>
             <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>Your weight (60 kg × 9.8 m/s²) remains exactly the same.</div>
          </div>

          <div style={{ background: 'rgba(240,245,255,1)', padding: '1.5rem', borderRadius: '12px', borderLeft: `4px solid ${stance === 'STAND' ? 'var(--accent-orange)' : 'var(--accent-blue)'}` }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Area of Contact</h4>
               <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: stance === 'STAND' ? 'var(--accent-orange)' : 'var(--accent-blue)' }}>{stance}</span>
             </div>
             <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent-black)' }}>{currentArea} m²</div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', borderLeft: '6px solid var(--accent-purple)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
             <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Resulting Pressure (= Thrust / Area)</h4>
             <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-purple)' }}>
               {Math.round(pressurePa).toLocaleString()} <span style={{ fontSize: '1.2rem' }}>Pa</span>
             </div>
             
             <div style={{ marginTop: '1rem', padding: '1rem', background: pressurePa > 5000 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: pressurePa > 5000 ? '#b91c1c' : '#047857', fontSize: '0.9rem', fontWeight: 500 }}>
               {pressurePa > 5000 
                  ? "High Pressure! Your feet sink deep into the loose sand." 
                  : "Low Pressure! Your weight is spread out, so you stay on the surface."}
             </div>
          </div>

        </div>

      </div>
    </div>
  )
}
