import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import ConceptCard from './ConceptCard'
import HydrometerSimulator from './HydrometerSimulator'
import SubmarineSimulator from './SubmarineSimulator'

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

export default function ChapterFourFour() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="4.4" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-purple))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Chapter 4.4: Applications</h2>
        </div>
      </motion.div>

      {/* ===== INTRODUCTION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="💡" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Real-World Uses</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.2rem', lineHeight: '1.7', fontWeight: '500', color: 'var(--text-secondary)' }}>
            Archimedes' principle is fundamental to various engineering and measurement tools. Beyond its role in the construction of ships and submarines, it serves as the scientific basis for lactometers which assess milk purity, and hydrometers, used to measure the density of different liquids.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b1463b2131f8279923aa3a/images/image-20260311160853-7.png" 
              alt="Archimedes Applications" 
              className="edu-img"
              style={{ width: '100%', maxWidth: '1000px' }} 
            />
          </div>
        </div>
      </motion.div>

      {/* ===== KEY APPLICATIONS ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="🛠️" gradient="linear-gradient(135deg, var(--accent-green), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Key Applications of Archimedes' Principle</h3>
        </div>
        
        <div className="content-text">
          <div className="fact-card blue-bg" style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>1. Marine Engineering</h4>
            <p style={{ margin: 0 }}>It allows engineers to calculate the buoyancy required to keep massive steel ships afloat and enables submarines to control their depth by adjusting their average density.</p>
          </div>

          <div className="fact-card pink-bg" style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-pink)', marginBottom: '0.5rem' }}>2. Quality Control (Lactometers)</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <p style={{ margin: 0 }}>By measuring the specific gravity of milk, these devices can detect whether water has been added to a sample.</p>
              </div>
              <img 
                src="https://login.skillizee.io/s/articles/69b1463b2131f8279923aa3a/images/image-20260311160853-8.png" 
                alt="Lactometer inside milk" 
                className="edu-img"
                style={{ width: '100%', maxWidth: '300px' }} 
              />
            </div>
          </div>

          <div className="fact-card cyan-bg" style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>3. Density Measurement (Hydrometers)</h4>
            <p style={{ marginBottom: '1rem' }}>These instruments float at different levels depending on the liquid's thickness, providing a direct reading of its density.</p>
            <VideoCard 
              videoId="KfOWu1kBWP0" 
              title="How a Hydrometer Works | Why It Sinks or Floats Explained Simply" 
            />
          </div>
        </div>
      </motion.div>

      {/* ===== INTERACTIVE: HYDROMETER SIMULATOR (ACTIVITY 1) ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <HydrometerSimulator />
      </motion.div>

      {/* ===== INTERACTIVE: SUBMARINE SIMULATOR (ACTIVITY 2) ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <SubmarineSimulator />
      </motion.div>

      {/* ===== POST-ACTIVITY QUESTIONS ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="❓" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-red))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Questions</h3>
        </div>
        
        <div className="content-text" style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #ef4444', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: 'var(--text-primary)' }}>1. You find your mass to be 42 kg on a weighing machine. Is your mass more or less than 42 kg?</p>
          </div>
          <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid var(--accent-blue)', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: 'var(--text-primary)' }}>2. You have a bag of cotton and an iron bar, each indicating a mass of 100 kg when measured on a weighing machine. In reality, one is heavier than the other. Can you say which one is heavier and why?</p>
          </div>
        </div>
      </motion.div>

      {/* ===== WHAT HAVE YOU LEARNT ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="🎓" gradient="linear-gradient(135deg, var(--accent-green), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>What have you learnt?</h3>
        </div>
        
        <div className="content-text">
          <ul style={{ display: 'grid', gap: '1.25rem', margin: 0 }}>
            <li>The law of gravitation states that the force of attraction between any two objects is proportional to the product of their masses and inversely proportional to the square of the distance between them. The law applies to objects anywhere in the universe. Such a law is said to be universal.</li>
            <li>Gravitation is a weak force unless large masses are involved.</li>
            <li>The force of gravity decreases with altitude. It also varies on the surface of the earth, decreasing from poles to the equator.</li>
            <li>The weight of a body is the force with which the earth attracts it.</li>
            <li>The weight is equal to the product of mass and acceleration due to gravity.</li>
            <li>The weight may vary from place to place but the mass stays constant.</li>
            <li>All objects experience a force of buoyancy when they are immersed in a fluid.</li>
            <li>Objects having density less than that of the liquid in which they are immersed, float on the surface of the liquid. If the density of the object is more than the density of the liquid in which it is immersed then it sinks in the liquid.</li>
          </ul>
        </div>
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 4 / Chapter 4.4</p>
        <p style={{ marginTop: '0.5rem' }}>End of Module 4 • End of Course</p>
      </div>

    </div>
  )
}
