import React from 'react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="hero-section">

      <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            CBSE Class 9 — Physics Chapter
          </motion.div>

          <motion.div
            className="hero-subtitle-box"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            <p className="hero-subtitle">
              The fundamental force that governs the universe — from falling apples to orbiting planets.
            </p>
          </motion.div>
      </div>

      <motion.h1
        className="hero-title-massive"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        GRAVITATION
      </motion.h1>
      
    </section>
  )
}
