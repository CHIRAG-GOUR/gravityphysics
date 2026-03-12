import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function PhetSimulator({ url, title, description }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const elem = document.getElementById('phet-iframe-container');
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <motion.div 
      className="neu-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)',
        border: '1px solid rgba(108,159,255,0.2)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.25rem', fontSize: '1.3rem' }}>
            🔬 Celestial Laboratory
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{title || 'Interactive PhET Simulation'}</p>
        </div>
        <button 
          onClick={toggleFullscreen}
          style={{
            background: 'var(--gradient-primary)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            padding: '8px 16px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(108,159,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
          </svg>
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      <div 
        id="phet-iframe-container" 
        style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '16/9', 
          borderRadius: '12px', 
          overflow: 'hidden',
          background: '#000',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
        }}
      >
        <iframe 
          src={url} 
          title={title}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            border: 'none' 
          }}
          scrolling="no" 
          allowFullScreen
        ></iframe>
      </div>

      {description && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(108,159,255,0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)' }}>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
            {description}
          </p>
        </div>
      )}
    </motion.div>
  )
}
