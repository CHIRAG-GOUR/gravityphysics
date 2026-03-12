import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import ConceptCard from './ConceptCard'
import PinThrustSimulator from './PinThrustSimulator'
import SandFootprintActivity from './SandFootprintActivity'

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

export default function ChapterThreeOne() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="3.1" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-red))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 1: Thrust & Pressure</h2>
        </div>
      </motion.div>

      {/* ===== HEADER IMAGES ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '2rem', padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <img 
          src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-1.png" 
          alt="Thrust and Pressure Concept 1" 
          style={{ width: '100%', maxWidth: '790px', height: 'auto', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }} 
        />
        <img 
          src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-2.png" 
          alt="Thrust and Pressure Concept 2" 
          style={{ width: '100%', maxWidth: '275px', height: 'auto', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }} 
        />
      </motion.div>

      {/* ===== VIDEO ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <VideoCard 
          videoPath="/videos/module3/3.1 - 1 Difference between Thrust and Pressure.mp4" 
          title="Difference between Thrust and Pressure?"
          description="Understanding force distribution."
        />
      </motion.div>

      {/* ===== 1. THRUST DEFINITION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="1" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-purple))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>1. Thrust</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderLeft: '4px solid var(--accent-blue)' }}>
            The total force acting perpendicular to a surface is called thrust.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Nature:</b> It is a vector quantity (it has a specific direction).</div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-pink)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Example:</b> When you push a pin into a board or stand on the ground, your weight acts as thrust because it is directed 90° to the surface.</div>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ===== 2. PRESSURE DEFINITION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="2" gradient="linear-gradient(135deg, var(--accent-green), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>2. Pressure</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderLeft: '4px solid var(--accent-green)' }}>
            Pressure is the thrust acting per unit area of a surface. It tells us how "concentrated" a force is.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-3.png" 
              alt="Pressure Formula" 
              style={{ width: '100%', maxWidth: '258px', height: 'auto', marginBottom: '1.5rem' }} 
            />
            <img 
              src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-4.png" 
              alt="Pressure Units" 
              style={{ width: '100%', maxWidth: '197px', height: 'auto' }} 
            />
          </div>

          <ConceptCard 
            title="Pascal (Pa)" 
            description="In honor of scientist Blaise Pascal, the SI unit of pressure is named the Pascal (Pa)." 
            color="green" 
          />
        </div>
      </motion.div>

      {/* ===== SITUATION 1: PIN BOARD ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="S1" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-red))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Situation 1: Fixing a Poster</h3>
        </div>
        
        <div className="content-text">
          <p style={{ marginBottom: '1.5rem' }}>
            You wish to fix a poster on a bulletin board. To do this task you will have to press drawing pins with your thumb. You apply a force on the surface area of the head of the pin. This force is directed perpendicular to the surface area of the board. This force acts on a smaller area at the tip of the pin. 
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-5.png" 
              alt="Thumb pushing drawing pin" 
              style={{ width: '100%', maxWidth: '417px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
            />
          </div>
          
          <p style={{ fontWeight: 500, fontStyle: 'italic', textAlign: 'center', color: 'var(--text-secondary)' }}>
            To fix a poster, drawing pins are pressed with the thumb perpendicular to the board.
          </p>
        </div>
      </motion.div>

      {/* ===== INTERACTIVE 1: THUMB PIN SIMULATOR ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <PinThrustSimulator />
      </motion.div>

      {/* ===== SITUATION 2: SAND ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="S2" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Situation 2: Standing on Sand</h3>
        </div>
        
        <div className="content-text">
          <p style={{ marginBottom: '1rem' }}>
            You stand on loose sand. Your feet go deep into the sand. Now, lie down on the sand. You will find that your body will not go that deep in the sand. In both cases the force exerted on the sand is the weight of your body.
          </p>
          <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid var(--accent-blue)', padding: '1.5rem', borderRadius: '0 8px 8px 0', marginTop: '1.5rem' }}>
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--accent-black)' }}>
              When you stand on loose sand, the force, that is, the weight of your body is acting on an area equal to area of your feet. When you lie down, the same force acts on an area equal to the contact area of your whole body, which is larger than the area of your feet. 
            </p>
            <p style={{ marginTop: '1rem', marginBottom: 0, fontWeight: 700, color: 'var(--accent-purple)' }}>
              Thus, the effects of forces of the same magnitude on different areas are different. In the above cases, thrust is the same. But effects are different. Therefore the effect of thrust depends on the area on which it acts.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ===== INTERACTIVE 2: SAND FOOTPRINT ACTIVITY ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <SandFootprintActivity />
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 3 / Chapter 3.1</p>
        <p style={{ marginTop: '0.5rem' }}>End of Thrust & Pressure</p>
      </div>

    </div>
  )
}
