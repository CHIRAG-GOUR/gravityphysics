import React from 'react'
import { motion } from 'framer-motion'

export default function ConceptCard({ label, title, formula, description, color = 'blue', children }) {
  return (
    <motion.div
      className={`concept-card ${color}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      {label && <p className="concept-label" style={{ color: 'var(--accent-purple)' }}>{label}</p>}
      {title && <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</p>}
      {formula && <p className="concept-formula">{formula}</p>}
      {description && <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>{description}</p>}
      {children}
    </motion.div>
  )
}
