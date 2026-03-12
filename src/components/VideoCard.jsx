import React, { useRef } from 'react'
import { motion } from 'framer-motion'

export default function VideoCard({ videoId, title, subtitle, videoPath }) {
  const videoRef = useRef(null);

  // Prevent right-click to discourage downloading
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      className="video-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      onContextMenu={handleContextMenu}
    >
      <div className="video-header">
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(108,159,255,0.3)' }}>
          <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 700 }}>▶</span>
        </div>
        <div>
          <div className="video-header-title">{title || 'Video Explanation'}</div>
          {subtitle && <div className="video-header-sub">{subtitle}</div>}
        </div>
      </div>
      
      {videoPath ? (
        <div className="local-video-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', background: '#000' }}>
          <video
            ref={videoRef}
            src={videoPath}
            controls
            controlsList="nodownload"
            onContextMenu={handleContextMenu}
            style={{ width: '100%', display: 'block', borderRadius: '8px' }}
          />
          <style dangerouslySetInnerHTML={{ __html: `
            video::-internal-media-controls-download-button { display:none; }
            video::-webkit-media-controls-enclosure { overflow:hidden; }
            video::-webkit-media-controls-panel { width: calc(100% + 30px); }
          `}} />
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </motion.div>
  )
}
