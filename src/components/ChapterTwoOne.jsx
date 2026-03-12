import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import FreeFallCatchActivity from './FreeFallCatchActivity'
import StoneUpwardActivity from './StoneUpwardActivity'
import ConceptCard from './ConceptCard'

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

export default function ChapterTwoOne() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="2.1" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 1: Free Fall</h2>
        </div>
      </motion.div>

      {/* ===== MAIN IMAGE ===== */}
      <motion.div {...sectionAnim} style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <img 
          src="https://login.skillizee.io/s/articles/69b0fc1b6209a55c95fd9767/images/image-20260311105237-1.png" 
          alt="Free Fall Concept" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }} 
        />
      </motion.div>

      {/* ===== VIDEO ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <VideoCard 
          videoPath="/videos/module2/2.1 - 1.mp4" 
          title="Understanding Charging by Induction: A Physics Guide for Class 10 & 12 Students!"
          description="Free Fall Introduction"
        />
      </motion.div>

      {/* ===== DEFINITION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="!" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Definition</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem', background: 'rgba(255,122,0,0.05)', padding: '1rem', borderLeft: '4px solid var(--accent-orange)' }}>
            When an object falls towards the earth under the influence of gravitational force alone, it is said to be in free fall.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', marginTop: '-2px' }}>↓</div>
              <div><b>Direction:</b> The direction of motion remains constant (towards the center of the Earth).</div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-pink)', fontSize: '1.2rem', marginTop: '-2px' }}>⏩</div>
              <div><b>Velocity:</b> The magnitude of the velocity changes as the object falls, implying the object is accelerating.</div>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ===== ACTIVITY DESCRIPTION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem', border: '1px solid rgba(108,159,255,0.3)', background: 'linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(240,245,255,0.6))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="🎯" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-purple))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Activity</h3>
        </div>
        
        <div className="content-text">
          <div style={{ paddingLeft: '1rem', borderLeft: '2px dashed var(--accent-blue)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p>• Take a stone.</p>
            <p>• Throw it upwards.</p>
            <p>• It reaches a certain height and then it starts falling down.</p>
          </div>
        </div>
      </motion.div>

      {/* ===== UPWARD STONE ACTIVITY ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <StoneUpwardActivity />
      </motion.div>

      {/* ===== AIR RESISTANCE CONCEPT CARD ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <ConceptCard 
          title="Air Resistance" 
          description="In reality, objects don't exist in a pure vacuum. The air itself pushes against falling objects creating 'drag', slowing their fall based on shape and surface area. This is why a flat piece of paper falls slower than a crumpled ball of paper!" 
          color="blue" 
        />
      </motion.div>

      {/* ===== CATCH ACTIVITY ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <FreeFallCatchActivity />
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 2 / Chapter 2.1</p>
        <p style={{ marginTop: '0.5rem' }}>End of Free Fall</p>
      </div>

    </div>
  )
}
