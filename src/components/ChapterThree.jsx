import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import CentripetalStringSimulator from './CentripetalStringSimulator'
import CentripetalOrbitSimulator from './CentripetalOrbitSimulator'

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

export default function ChapterThree() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="1.3" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 3: Centripetal Force</h2>
        </div>
      </motion.div>

      {/* ===== HEADER IMAGE ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '2rem', padding: '0', overflow: 'hidden', display: 'flex', justifyContent: 'center', background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <img 
          src="https://login.skillizee.io/s/articles/69b0f3932942f4e9f0ef6437/images/image-20260311101614-1.png" 
          alt="Centripetal Force Concept" 
          style={{ width: '100%', maxWidth: '750px', height: 'auto', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }} 
        />
      </motion.div>

      {/* ===== Video ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <VideoCard 
          videoPath="/videos/module1/1.3 - Centripital Force.mp4" 
          title="Centripetal Force"
          description="Understanding the 'center-seeking' force."
        />
      </motion.div>

      {/* ===== WHAT IS IT? ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div className="content-text">
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent-orange)', paddingLeft: '1.5rem' }}>
            The "center-seeking" force required to keep an object (like the moon or a stone on a string) moving in a circular path.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--accent-blue)' }}>The Mechanism of Circular Motion</h3>
          <ul>
            <li style={{ marginBottom: '1.5rem' }}>
              When an object (like a stone on a thread) moves in a circle, it changes direction at every point. This constant change in direction means the velocity is changing, which requires acceleration.
            </li>
          </ul>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b0f3932942f4e9f0ef6437/images/image-20260311101614-2.png" 
              alt="Vector Changes" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
            />
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--accent-pink)' }}>Direction and the Tangent Rule</h3>
          <ul>
            <li style={{ marginBottom: '1rem' }}>
              <b>Direction of Force:</b> This acceleration is caused by a force acting towards the centre of the circular path. This is the centripetal force.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <b>The Tangent Rule:</b> If this force is removed (e.g., the thread is released), the object will no longer move in a circle. Instead, it flies off along a straight line that is tangent to the circular path.
            </li>
          </ul>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b0f3932942f4e9f0ef6437/images/image-20260311101614-3.png" 
              alt="Tangent Release" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
            />
          </div>
        </div>
      </motion.div>

      {/* ===== CENTRIPETAL STRING SIMULATOR ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <CentripetalStringSimulator />
      </motion.div>

      {/* ===== THE MOON ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="☾" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>The Moon's Orbit</h3>
        </div>

        <div className="content-text">
          <ul>
            <li style={{ marginBottom: '1.5rem' }}>
              The Moon "falls" toward the Earth at every point in its orbit rather than flying off in a straight line because the Earth's gravitational attraction provides the necessary centripetal force.
            </li>
          </ul>

          <div style={{ background: 'rgba(108,159,255,0.05)', borderLeft: '4px solid var(--accent-blue)', padding: '1.5rem', borderRadius: 'r-8px' }}>
            <p style={{ margin: 0, fontWeight: 500 }}>
              The motion of the moon around the earth is due to the centripetal force. The centripetal force is provided by the force of attraction of the earth. If there were no such force, the moon would pursue a uniform straight line motion.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ===== CENTRIPETAL ORBIT SIMULATOR ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <CentripetalOrbitSimulator />
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 1 / Chapter 1.3</p>
        <p style={{ marginTop: '0.5rem' }}>End of Centripetal Force</p>
      </div>

    </div>
  )
}
