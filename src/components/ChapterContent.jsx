import React from 'react'
import { motion } from 'framer-motion'
import ConceptCard from './ConceptCard'
import GravitySimulator from './GravitySimulator'
import OrbitSimulator from './OrbitSimulator'
import FreeFallSimulator from './FreeFallSimulator'
import NewtonCannonSimulator from './NewtonCannonSimulator'

const sectionAnim = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
}

const Badge = ({ letter, gradient }) => (
  <div style={{
    width: 32, height: 32, borderRadius: '50%',
    background: gradient || 'var(--gradient-primary)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.85rem', fontWeight: 700, color: '#fff',
    boxShadow: '0 0 12px rgba(108,159,255,0.25)',
    flexShrink: 0,
  }}>{letter}</div>
)

export default function ChapterContent() {
  return (
    <div className="section-container">

      {/* ===== SECTION 1: Introduction ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="1.1" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 1: Introduction to Gravitation</h2>
        </div>
        <div className="content-text" style={{ marginTop: '1.5rem' }}>
          <p>
            <b>The introduction establishes that force is the fundamental cause of change in an object's speed or direction.</b> While we observe various types of motion—such as an apple falling to the ground or planets orbiting the Sun—Isaac Newton was the first to realize that a single, underlying force is responsible for all of them.
          </p>
        </div>
      </motion.div>

      {/* ===== SECTION 2: Key Concepts ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="🔑" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Key Concepts Covered</h3>
        </div>
        <div className="content-text" style={{ marginTop: '1.5rem' }}>
          <ul>
            <li>
              <b>The Universal Force:</b> Newton conjectured that the same force that pulls an apple to the Earth also keeps the Moon in its orbit. This is known as Gravitational Force.
            </li>
            <li>
              <b>Centripetal Force:</b> Using the example of a stone whirled on a thread, the text explains that circular motion requires a "center-seeking" force. Without this (provided by gravity in space), objects like the Moon would simply fly off in a straight line.
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ===== Interactive: Orbit Simulator ===== */}
      <OrbitSimulator />

      <motion.div className="neu-card" {...sectionAnim}>
        <div className="content-text">
          <ul>
            <li>
              <b>The Universal Law of Gravitation:</b> Every object in the universe attracts every other object. This force is:
              <ol style={{ marginTop: '0.5rem' }}>
                <li><b>Directly proportional</b> to the product of their masses (M × m).</li>
                <li><b>Inversely proportional</b> to the square of the distance (d²) between them.</li>
              </ol>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ===== Concept Card: Universal Law ===== */}
      <ConceptCard
        label="Key Physics Concept"
        title="Newton's Universal Law of Gravitation"
        formula="F = G × (M × m) / d²"
        description="Every object in the universe attracts every other object with a force proportional to the product of their masses and inversely proportional to the square of the distance between them."
        color="blue"
      />

      {/* ===== Interactive: Gravity Simulator ===== */}
      <GravitySimulator />

      {/* ===== SECTION 3: Objectives ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="🎯" gradient="linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Objectives of the Chapter</h3>
        </div>
        <div className="content-text" style={{ marginTop: '1.5rem' }}>
          <p><b>The text sets the stage for studying several practical applications of gravity and fluid mechanics, including:</b></p>
          <ul>
            <li><b>How objects move under the influence of Earth's gravity (Free Fall).</b></li>
            <li><b>The difference between Mass (constant) and Weight (variable).</b></li>
            <li><b>Why objects float or sink in liquids (Buoyancy and Archimedes' Principle).</b></li>
          </ul>
        </div>
      </motion.div>

      {/* ===== Interactive: Free Fall ===== */}
      <FreeFallSimulator />

      {/* ===== Interactive: Newton's Cannonball ===== */}
      <NewtonCannonSimulator />

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 1 / Chapter 1.1</p>
        <p style={{ marginTop: '0.5rem' }}>End of Introduction to Gravitation</p>
      </div>
    </div>
  )
}
