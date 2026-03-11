import React, { useState, useEffect, useCallback } from 'react'

/**
 * Animated Fullscreen Toggle Button
 * Shows expand icon when not fullscreen, collapse icon when fullscreen.
 * Both icons animate on hover and on state change.
 */
export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Listen for fullscreen changes (e.g. user presses Escape)
  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 400)

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.warn('Fullscreen not supported:', err)
    }
  }, [])

  // Corner arrows for expand icon
  const ExpandIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'scale(1.15)' : 'scale(1)',
      }}
    >
      {/* Top-left arrow */}
      <polyline
        points="15 3 21 3 21 9"
        style={{
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translate(1px,-1px)' : 'translate(0,0)',
        }}
      />
      {/* Bottom-right arrow */}
      <polyline
        points="9 21 3 21 3 15"
        style={{
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translate(-1px,1px)' : 'translate(0,0)',
        }}
      />
      {/* Diagonal lines */}
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )

  // Corner arrows for collapse icon
  const CollapseIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'scale(1.15)' : 'scale(1)',
      }}
    >
      {/* Top-right inward arrow */}
      <polyline
        points="4 14 10 14 10 20"
        style={{
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translate(-1px,1px)' : 'translate(0,0)',
        }}
      />
      {/* Bottom-left inward arrow */}
      <polyline
        points="20 10 14 10 14 4"
        style={{
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translate(1px,-1px)' : 'translate(0,0)',
        }}
      />
      {/* Diagonal lines */}
      <line x1="14" y1="10" x2="21" y2="3" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )

  return (
    <button
      onClick={toggleFullscreen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isFullscreen ? '#fff' : 'var(--accent-black, #1a1a2e)',
        background: isFullscreen
          ? 'rgba(255, 122, 0, 0.9)'
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isHovered
          ? '0 8px 25px rgba(0,0,0,0.15), 0 0 0 2px rgba(255,122,0,0.3)'
          : '0 4px 15px rgba(0,0,0,0.1)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isAnimating
          ? 'scale(0.85) rotate(180deg)'
          : isHovered
          ? 'scale(1.1)'
          : 'scale(1)',
      }}
    >
      {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
    </button>
  )
}
