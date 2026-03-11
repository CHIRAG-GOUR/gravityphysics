import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import ConceptCard from './ConceptCard'
import SubmarinePressureSimulator from './SubmarinePressureSimulator'

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

export default function ChapterThreeThree() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="3.3" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-teal))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 3: Pressure in Fluids</h2>
        </div>
      </motion.div>

      {/* ===== HEADER IMAGE ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '2rem', padding: '0', overflow: 'hidden', display: 'flex', justifyContent: 'center', background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <img 
          src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-11.png" 
          alt="Pressure in Fluids Hero" 
          style={{ width: '100%', maxWidth: '790px', height: 'auto', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }} 
        />
      </motion.div>

      {/* ===== VIDEO ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <VideoCard 
          videoId="4p216lbkkxU" 
          title="Fluids at Rest: Crash Course Physics #14"
          description="Understanding how pressure works inside liquids and gases."
        />
      </motion.div>

      {/* ===== PRESSURE IN FLUIDS DEFINITION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="1" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-purple))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Pressure in Fluids</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', padding: '1.5rem', borderLeft: '4px solid var(--accent-blue)', borderRadius: '0 12px 12px 0' }}>
            All liquids and gases are fluids. A solid exerts pressure on a surface due to its weight. Similarly, fluids have weight, and they also exert pressure on the base and walls of the container in which they are enclosed. 
          </p>

          <ConceptCard 
            title="Omnidirectional Pressure" 
            description="Pressure exerted in any confined mass of fluid is transmitted undiminished in all directions." 
            color="blue" 
          />
        </div>
      </motion.div>

      {/* ===== INTERACTIVE: SUBMARINE *****/}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <SubmarinePressureSimulator />
      </motion.div>

      {/* ===== BUOYANCY INTRO ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="2" gradient="linear-gradient(135deg, var(--accent-green), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Buoyancy</h3>
        </div>
        
        <div className="content-text">
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Have you ever had a swim in a pool and felt lighter? Have you ever drawn water from a well and felt that the bucket of water is heavier when it is out of the water? 
          </p>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Have you ever wondered why a ship made of iron and steel does not sink in sea water, but the exact same amount of iron and steel in the form of a sheet would sink to the bottom instantly?
          </p>
          
          <div style={{ background: '#f0fdf4', borderLeft: '4px solid var(--accent-green)', padding: '1.5rem', borderRadius: '0 8px 8px 0', marginTop: '1.5rem' }}>
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-green)', fontSize: '1.2rem' }}>
              These questions can be answered by taking Buoyancy into consideration.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 3 / Chapter 3.3</p>
        <p style={{ marginTop: '0.5rem' }}>End of Pressure in Fluids</p>
      </div>

    </div>
  )
}
