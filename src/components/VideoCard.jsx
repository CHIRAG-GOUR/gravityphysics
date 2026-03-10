import React from 'react'
import { motion } from 'framer-motion'

export default function VideoCard({ videoId, title, subtitle }) {
  return (
    <motion.div
      className="video-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
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
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || 'Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </motion.div>
  )
}
