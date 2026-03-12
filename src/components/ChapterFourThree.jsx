import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import ConceptCard from './ConceptCard'
import ArchimedesPrincipleSimulator from './ArchimedesPrincipleSimulator'
import ShipBuoyancySimulator from './ShipBuoyancySimulator'

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

export default function ChapterFourThree() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="4.3" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-red))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Chapter 4.3: Archimedes' Principle</h2>
        </div>
      </motion.div>

      {/* ===== INTRODUCTION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="💡" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>How much "lighter"?</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem' }}>
            To know exactly how much "lighter" an object will feel, we use Archimedes' Principle.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b1463b2131f8279923aa3a/images/image-20260311160853-5.png" 
              alt="Archimedes Principle Experiment" 
              className="edu-img"
              style={{ width: '100%', maxWidth: '600px' }} 
            />
          </div>

          <ConceptCard 
            title="The Principle" 
            description="When an object is fully or partially submerged in a fluid, it experiences an upward force equal to the weight of the fluid it displaces."
            color="purple"
          />
        </div>
      </motion.div>

      {/* ===== INTERACTIVE SIMULATOR (ACTIVITY 1) ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <ArchimedesPrincipleSimulator />
      </motion.div>

      {/* ===== INTERACTIVE SIMULATOR (ACTIVITY 2) ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <ShipBuoyancySimulator />
      </motion.div>

      {/* ===== VIDEOS ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <VideoCard 
          videoPath="/videos/module4/4.3 - 1 - Archimedes Principle - Why do ships float？ ｜ #aumsum #kids #science #education #children.mp4" 
          title="Archimedes Principle - Why do ships float?" 
        />
      </motion.div>
      <motion.div {...sectionAnim} style={{ marginTop: '2rem' }}>
        <VideoCard 
          videoPath="/videos/module4/4.3 - 2 Archimedes Principle.mp4" 
          title="Archimedes Principle" 
        />
      </motion.div>

      {/* ===== KEY IMPLICATIONS ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="🔑" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Key Implications</h3>
        </div>
        
        <div className="content-text">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', margin: '2rem 0' }}>
            <div className="fact-card blue-bg">
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-blue)', marginBottom: '1rem' }}>1. Magnitude of Buoyancy</h4>
              <p>The buoyant force is exactly equal to the weight of the water that the object "pushed out of the way" to make room for itself.</p>
            </div>
            <div className="fact-card green-bg">
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-green)', marginBottom: '1rem' }}>2. Why the weight stops decreasing</h4>
              <p>Once a given object (like a stone) is fully immersed, it is displacing the maximum amount of water its volume allows. Since the volume of displaced water stops increasing, the buoyant force stays constant, and the spring balance reading stops changing.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== CHECK YOUR UNDERSTANDING ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="❓" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-red))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Check Your Understanding</h3>
        </div>

        <div className="content-text" style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #ef4444', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#b91c1c' }}>Does every fluid exert the same force?</p>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              <strong>No.</strong> Denser fluids (like honey or saltwater) weigh more per unit of volume. Therefore, displacing a liter of saltwater provides more upthrust than displacing a liter of fresh water.
            </p>
          </div>
          <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid var(--accent-blue)', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: 'var(--accent-blue)' }}>Do all objects feel the same force?</p>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              <strong>No.</strong> A larger object displaces more fluid than a smaller one, so the larger object experiences a greater buoyant force.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '3rem 0 1rem 0' }}>
          <img 
            src="https://login.skillizee.io/s/articles/69b1463b2131f8279923aa3a/images/image-20260311160853-6.png" 
            alt="Buoyancy forces on blocks" 
            className="edu-img"
            style={{ width: '100%', maxWidth: '378px' }} 
          />
        </div>
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 4 / Chapter 4.3</p>
        <p style={{ marginTop: '0.5rem' }}>End of Archimedes' Principle</p>
      </div>

    </div>
  )
}
