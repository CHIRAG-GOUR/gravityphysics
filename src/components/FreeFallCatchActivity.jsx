import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FreeFallCatchActivity() {
  const [gameState, setGameState] = useState('READY') // READY, WAITING, FALLING, CAUGHT, MISSED
  const [reactionTime, setReactionTime] = useState(null)
  const [distanceFallen, setDistanceFallen] = useState(null)
  
  const timerRef = useRef(null)
  const dropTimeRef = useRef(0)
  const animationFrameRef = useRef(null)
  
  // Game Container Physics config (Pixels to Meters scale)
  const PIXELS_PER_METER = 300 // Scale: 300px = 1 meter visually
  const RULER_HEIGHT_PX = 300 // 1 meter long ruler
  const CONTAINER_HEIGHT_PX = 600
  const G = 9.8 // m/s^2
  
  const [rulerY, setRulerY] = useState(0) // Start at top

  // Cleanup timers
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const startGame = () => {
    setGameState('WAITING')
    setReactionTime(null)
    setDistanceFallen(null)
    setRulerY(0)
    
    // Random wait time between 2 to 5 seconds
    const waitTime = Math.random() * 3000 + 2000
    
    timerRef.current = setTimeout(() => {
      dropRuler()
    }, waitTime)
  }

  const dropRuler = () => {
    setGameState('FALLING')
    dropTimeRef.current = performance.now()
    
    // Animate free fall
    const updatePhysics = () => {
      if (gameState !== 'FALLING') return
      
      const currentTime = performance.now()
      const timeElapsedS = (currentTime - dropTimeRef.current) / 1000 // t in seconds
      
      // Free fall formula: d = 1/2 * g * t^2
      const distanceMeters = 0.5 * G * Math.pow(timeElapsedS, 2)
      const distancePixels = distanceMeters * PIXELS_PER_METER
      
      setRulerY(distancePixels)
      
      // Check if it fell completely off screen
      if (distancePixels > CONTAINER_HEIGHT_PX) {
        setGameState('MISSED')
        return
      }
      
      animationFrameRef.current = requestAnimationFrame(updatePhysics)
    }
    
    animationFrameRef.current = requestAnimationFrame(updatePhysics)
  }

  const catchRuler = () => {
    // Determine early clicks
    if (gameState === 'WAITING') {
      clearTimeout(timerRef.current)
      setGameState('READY')
      alert("Too early! Wait for the ruler to drop.")
      return
    }

    if (gameState !== 'FALLING') return

    cancelAnimationFrame(animationFrameRef.current)
    const catchTime = performance.now()
    const timeElapsedS = (catchTime - dropTimeRef.current) / 1000
    
    // Free fall formula: d = 1/2 * g * t^2
    const distanceMeters = 0.5 * G * Math.pow(timeElapsedS, 2)
    
    setReactionTime(timeElapsedS.toFixed(3))
    setDistanceFallen((distanceMeters * 100).toFixed(1)) // Convert to cm
    setGameState('CAUGHT')
  }

  const resetGame = () => {
    setGameState('READY')
    setReactionTime(null)
    setDistanceFallen(null)
    setRulerY(0)
    clearTimeout(timerRef.current)
    cancelAnimationFrame(animationFrameRef.current)
  }

  return (
    <div className="neu-card" style={{ marginTop: '3rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Reaction Time Tester</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Catch the ruler! We'll use the free fall formula (d = ½gt²) to calculate your human reaction time based on how far it fell.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Play Area */}
        <div 
          onClick={gameState === 'FALLING' || gameState === 'WAITING' ? catchRuler : undefined}
          style={{ 
            flex: '1 1 300px', 
            height: `${CONTAINER_HEIGHT_PX}px`, 
            backgroundColor: '#f8fafc', 
            borderRadius: '16px', 
            position: 'relative', 
            overflow: 'hidden', 
            border: '2px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'center',
            cursor: (gameState === 'FALLING' || gameState === 'WAITING') ? 'crosshair' : 'default',
            boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.05)'
        }}>
          
          {/* Background Gradients/Lines for depth */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '100% 50px', opacity: 0.5 }} />

          {/* Catch Zone Indicator */}
          <div style={{ position: 'absolute', top: '150px', left: 0, right: 0, height: '40px', background: 'rgba(59, 130, 246, 0.1)', borderTop: '2px dashed var(--accent-blue)', borderBottom: '2px dashed var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)', fontWeight: 700, letterSpacing: '2px', opacity: (gameState === 'FALLING' || gameState === 'WAITING') ? 1 : 0.3 }}>
            CLICK ANYWHERE TO CATCH
          </div>

          {/* The Ruler */}
          <div 
            style={{ 
              position: 'absolute', 
              top: `${rulerY}px`, 
              width: '60px', 
              height: `${RULER_HEIGHT_PX}px`, 
              background: '#fde047', 
              borderRadius: '4px',
              border: '2px solid #ca8a04',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '4px 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            {/* Ruler Markings */}
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} style={{ flex: 1, borderTop: i !== 0 ? '1px solid #ca8a04' : 'none', position: 'relative' }}>
                <span style={{ position: 'absolute', right: '4px', top: '-10px', fontSize: '10px', fontWeight: 'bold', color: '#a16207' }}>
                  {i * 10}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard / Results Area */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ 
            background: 'rgba(108,159,255,0.05)', borderRadius: '12px', padding: '1.5rem', 
            border: '1px solid rgba(108,159,255,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '150px' 
          }}>
            {gameState === 'READY' && (
              <>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏱️</div>
                <button onClick={startGame} className="interactive-btn" style={{ width: '100%', background: 'var(--accent-blue)', color: 'white', padding: '0.75rem', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Start Test</button>
              </>
            )}
            
            {gameState === 'WAITING' && (
              <>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 1s infinite' }}>👀</div>
                <h4 style={{ color: 'var(--accent-orange)' }}>Wait for drop...</h4>
              </>
            )}

            {gameState === 'FALLING' && (
               <h4 style={{ color: '#ef4444', fontSize: '1.5rem', animation: 'scale 0.5s infinite alternate' }}>CATCH IT!</h4>
            )}

            {gameState === 'MISSED' && (
              <>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💥</div>
                <h4 style={{ color: '#ef4444', marginBottom: '1rem' }}>Too Slow!</h4>
                <button onClick={resetGame} className="interactive-btn" style={{ width: '100%', background: '#e2e8f0', color: 'var(--accent-black)', padding: '0.75rem', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Try Again</button>
              </>
            )}

            {gameState === 'CAUGHT' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h4 style={{ color: 'var(--accent-green)', marginBottom: '1rem', fontSize: '1.2rem' }}>Caught!</h4>
                
                <div style={{ width: '100%', background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Distance Fallen (d):</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-orange)' }}>{distanceFallen} cm</div>
                </div>

                <div style={{ width: '100%', background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Reaction Time (t):</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-blue)' }}>{reactionTime} s</div>
                </div>

                <button onClick={resetGame} className="interactive-btn" style={{ width: '100%', background: 'var(--accent-blue)', color: 'white', padding: '0.75rem', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Try Again</button>
              </div>
            )}
          </div>

          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-black)', marginBottom: '0.5rem' }}>The Math Behind It</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Because <code style={{ color: 'var(--accent-pink)' }}>u = 0</code> (it drops from rest), the equation of motion <code style={{ color: 'var(--accent-blue)' }}>s = ut + ½at²</code> simplifies down to:
            </p>
            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--accent-orange)' }}>
              d = ½gt²
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: 0 }}>
              By measuring <b>d</b> (distance fallen before you caught it), we can perfectly calculate <b>t</b> (your reaction time)!
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
