import React, { useState, useEffect, useRef } from 'react'

const JOKES = [
  "Hey apple! Gravity always gets you down!",
  "It's not the fall that hurts, it's the sudden stop at the end!",
  "I'm attracted to you, apple. Literally!",
  "Mass attracts mass! It's the universal law!",
  "Look out below!",
  "What goes up must come down... unless it hits escape velocity!",
  "F = G(Mm/d²), my friend!",
  "Gravity: It's a heavy subject."
]

export default function GravityProgressBars() {
  const [progress, setProgress] = useState(0)
  const [joke, setJoke] = useState(null)
  const leftDropRef = useRef(null)
  const rightDropRef = useRef(null)

  useEffect(() => {
    let lastJokeTime = Date.now()

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(p, 100))

      const now = Date.now()
      // Random chance to trigger a joke if we are scrolling and it's been a while
      if (p > 5 && p < 95 && Math.random() > 0.985 && (now - lastJokeTime > 8000)) {
        lastJokeTime = now
        setJoke(JOKES[Math.floor(Math.random() * JOKES.length)])
        setTimeout(() => setJoke(null), 5000)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fillHeight = `${progress}%`
  const dropTop = `calc(${progress}% - 5px)`
  const avatarTop = `calc(${progress}%)`

  return (
    <>
      {/* Left progress bar */}
      <div className="gravity-drip-left" style={{ overflow: 'visible' }}>
        <img 
          src="/images/newton.png" 
          alt="Isaac Newton" 
          style={{ 
            position: 'absolute', 
            top: avatarTop, 
            left: '50%', 
            transform: 'translateX(-50%)',
            width: '100px', 
            zIndex: 100,
            transition: 'top 0.1s linear',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
          }} 
        />
        
        {joke && (
          <div style={{
            position: 'absolute',
            top: `calc(${progress}% - 20px)`,
            left: '70px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '10px 14px',
            borderRadius: '16px',
            borderBottomLeftRadius: '4px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            zIndex: 101,
            width: '220px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--accent-black)',
            border: '2px solid var(--accent-orange)'
          }}>
            {joke}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '-8px',
              width: '12px',
              height: '12px',
              backgroundColor: 'white',
              borderLeft: '2px solid var(--accent-orange)',
              borderBottom: '2px solid var(--accent-orange)',
              transform: 'rotate(45deg)'
            }}/>
          </div>
        )}

        <div className="drip-track">
          <div className="drip-fill drip-fill-left" style={{ height: fillHeight }} />
          {progress > 1 && progress < 99 && (
            <div
              className="drip-drop drip-drop-left"
              style={{ top: dropTop }}
              key={`l-${Math.floor(progress / 3)}`}
            />
          )}
        </div>
      </div>

      {/* Right progress bar */}
      <div className="gravity-drip-right" style={{ overflow: 'visible' }}>
        <img 
          src="/images/apple.png" 
          alt="Falling Apple" 
          style={{ 
            position: 'absolute', 
            top: avatarTop, 
            right: '50%', 
            transform: 'translateX(50%)',
            width: '50px', 
            zIndex: 100,
            transition: 'top 0.1s linear',
            filter: 'drop-shadow(0 8px 16px rgba(220, 38, 38, 0.4))'
          }} 
        />
        <div className="drip-track">
          <div className="drip-fill drip-fill-right" style={{ height: fillHeight }} />
          {progress > 1 && progress < 99 && (
            <div
              className="drip-drop drip-drop-right"
              style={{ top: dropTop, animationDelay: '0.5s' }}
              key={`r-${Math.floor(progress / 3)}`}
            />
          )}
        </div>
      </div>
    </>
  )
}
