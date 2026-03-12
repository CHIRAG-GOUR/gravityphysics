import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import ConceptCard from './ConceptCard'
import DensitySubmersionSimulator from './DensitySubmersionSimulator'

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

export default function ChapterFourTwo() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="4.2" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-red))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Chapter 4.2: Float or Sink</h2>
        </div>
      </motion.div>

      {/* ===== REAL-WORLD MYSTERY ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="💡" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Real-World Mystery: Ships vs. Sheets</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.25rem', lineHeight: '1.7', fontWeight: '500', color: 'var(--text-secondary)' }}>
            Why does a massive ship made of iron float, while a thin sheet of iron sinks? 
          </p>
          <p style={{ marginTop: '1rem' }}>
            The ship is designed to displace a massive volume of water. Because it occupies so much space, the total upward buoyant force acting on its hull is greater than the total weight of the ship. A flat sheet of iron displaces very little water, so the upward force is too weak to stop it from sinking.
          </p>
        </div>
      </motion.div>

      {/* ===== VIDEO 1 ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <VideoCard 
          videoId="2dyCe1GPagE" 
          title="Float or Sink - Why do things float- Why do things sink- Lesson for kids" 
        />
      </motion.div>

      {/* ===== WHY OBJECTS FLOAT OR SINK ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="1" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Why Objects Float or Sink?</h3>
        </div>
        
        <div className="content-text">
          <p>Take an iron nail and place it on the surface of the water. Observe what happens.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', margin: '2rem 0' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #ef4444', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
              <p style={{ margin: 0, fontWeight: 500, color: '#b91c1c' }}>
                The nail sinks. The force due to the gravitational attraction of the earth on the iron nail pulls it downwards. There is an upthrust of water on the nail, which pushes it upwards. But the downward force acting on the nail is greater than the upthrust of water on the nail.
              </p>
            </div>
            <div>
              <VideoCard videoId="cd0ibGkSoBA" title="Why Cork Floats & Iron Sinks ?" isShort={true} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== INTERACTIVE: DENSITY SIMULATOR ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <DensitySubmersionSimulator />
      </motion.div>

      {/* ===== DENSITY: THE DECIDING FACTOR ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="2" gradient="linear-gradient(135deg, var(--accent-green), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Density: The Deciding Factor</h3>
        </div>
        
        <div className="content-text">
          <ConceptCard 
            title="Density" 
            description="Density determines whether the upward push of water (upthrust) is strong enough to overcome an object's downward pull (weight). It's the mass per unit volume of a substance."
            color="green"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
            <div className="fact-card pink-bg">
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-pink)', marginBottom: '1rem' }}>1. Why the Iron Nail Sinks</h4>
              <p>The density of iron is much higher than the density of water. Because it is so dense, the weight of the nail is greater than the upthrust provided by the water. Since the downward force wins, the nail sinks.</p>
            </div>
            <div className="fact-card green-bg">
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-green)', marginBottom: '1rem' }}>2. Why Other Objects Float</h4>
              <p>If an object (like a piece of cork or a hollow plastic ball) has a density lower than that of water, the water is able to provide an upthrust that is equal to or greater than the object's weight. Since the upward force supports the weight, the object floats.</p>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', overflow: 'hidden', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
            <thead style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--card-border)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Object's Density</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Comparison to Liquid</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Result</th>
              </tr>
            </thead>
            <tbody style={{ fontWeight: '500', whiteSpace: 'nowrap' }}>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '1rem 1.5rem' }}>Greater than Liquid</td>
                <td style={{ padding: '1rem 1.5rem', color: '#dc2626' }}>Weight &gt; Upthrust</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold', color: '#b91c1c' }}>Sinks</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 1.5rem' }}>Less than Liquid</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--accent-green)' }}>Weight ≤ Upthrust</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>Floats</td>
              </tr>
            </tbody>
          </table>

          <div style={{ background: 'rgba(74, 108, 247, 0.05)', borderLeft: '4px solid var(--accent-blue)', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
            <p style={{ fontStyle: 'italic', margin: 0, fontWeight: 500, color: 'var(--accent-black)' }}>
              "It isn't just about how heavy an object is, but how compact its mass is compared to the fluid it is in. This is why a heavy wooden log floats, while a tiny, light iron needle sinks."
            </p>
          </div>
        </div>
      </motion.div>

      {/* ===== CHECK YOUR UNDERSTANDING ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="❓" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-red))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Check Your Understanding</h3>
        </div>

        <div className="content-text" style={{ display: 'grid', gap: '1rem' }}>
          <div className="fact-card purple-bg" style={{ margin: 0, padding: '1rem 1.5rem' }}>
            <p style={{ color: 'var(--accent-purple)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Q1: Why is it difficult to hold a school bag having a strap made of a thin and strong string?</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>Think about the Relationship between Pressure and Area from the previous module!</p>
          </div>
          <div className="fact-card cyan-bg" style={{ margin: 0, padding: '1rem 1.5rem' }}>
            <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', margin: 0 }}>Q2: What do you mean by buoyancy?</p>
          </div>
          <div className="fact-card green-bg" style={{ margin: 0, padding: '1rem 1.5rem' }}>
            <p style={{ color: 'var(--accent-green)', fontWeight: 'bold', margin: 0 }}>Q3: Why does an object float or sink when placed on the surface of water?</p>
          </div>
        </div>
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 4 / Chapter 4.2</p>
        <p style={{ marginTop: '0.5rem' }}>End of Float or Sink</p>
      </div>

    </div>
  )
}
