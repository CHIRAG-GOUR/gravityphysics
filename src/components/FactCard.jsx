import React from 'react'
import { motion } from 'framer-motion'

export default function FactCard({ emoji, label, text, variant = 'purple-bg' }) {
  return (
    <motion.div
      className={`fact-card ${variant}`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="fact-label">{label || 'Did You Know?'}</p>
      <p className="fact-text">{text}</p>
    </motion.div>
  )
}
