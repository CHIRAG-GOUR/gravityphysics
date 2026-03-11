import React from 'react'
import { motion } from 'framer-motion'
import ConceptCard from './ConceptCard'
import PressureBlockCalculator from './PressureBlockCalculator'

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

export default function ChapterThreeTwo() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="3.2" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 2: The Relationship (Area vs Pressure)</h2>
        </div>
      </motion.div>

      {/* ===== 1. THE TAKEAWAY ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div className="content-text">
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem', background: 'rgba(168, 85, 247, 0.05)', padding: '1rem', borderLeft: '4px solid var(--accent-purple)' }}>
            The most important takeaway is that Pressure is inversely proportional to Area. For the same amount of thrust:
          </p>

          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ marginTop: '3px', background: 'var(--accent-red)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Smaller Area</div>
              <div><b>Higher Pressure:</b> This is why needles and knives have sharp, thin edges—they concentrate force to pierce materials easily.</div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ marginTop: '3px', background: 'var(--accent-blue)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Larger Area</div>
              <div><b>Lower Pressure:</b> This is why heavy trucks have wide tires and army tanks have continuous tracks. By spreading their weight over a larger surface, they exert less pressure and don't sink into the ground.</div>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ===== OBSERVATION TABLE ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem', padding: '2rem' }}>
        <h3 className="section-title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Real World Observations</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) 2fr', gap: '1px', background: '#e2e8f0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
          {/* Header */}
          <div style={{ background: '#f8fafc', padding: '1rem', fontWeight: 'bold', color: 'var(--accent-black)' }}>Observation</div>
          <div style={{ background: '#f8fafc', padding: '1rem', fontWeight: 'bold', color: 'var(--accent-black)' }}>Scientific Explanation</div>
          
          {/* Row 1 */}
          <div style={{ background: 'white', padding: '1rem', fontWeight: 600, color: 'var(--accent-orange)' }}>Camel's broad feet</div>
          <div style={{ background: 'white', padding: '1rem', color: 'var(--text-secondary)' }}>Spreads weight over a large area, reducing pressure so they don't sink in desert sand.</div>
          
          {/* Row 2 */}
          <div style={{ background: 'white', padding: '1rem', fontWeight: 600, color: 'var(--accent-red)' }}>Sharp cutting tools</div>
          <div style={{ background: 'white', padding: '1rem', color: 'var(--text-secondary)' }}>Small surface area at the edge creates high pressure to cut through objects with little effort.</div>
          
          {/* Row 3 */}
          <div style={{ background: 'white', padding: '1rem', fontWeight: 600, color: 'var(--accent-blue)' }}>Wide foundations</div>
          <div style={{ background: 'white', padding: '1rem', color: 'var(--text-secondary)' }}>Buildings are built on wide bases to distribute the massive weight (thrust) and prevent the ground from yielding.</div>
        </div>
      </motion.div>

      {/* ===== HEADER IMAGES SHOWCASE ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <img 
          src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-6.png" 
          alt="Camel Example" 
          style={{ height: '177px', width: 'auto', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }} 
        />
        <img 
          src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-7.png" 
          alt="Knife Example" 
          style={{ height: '184px', width: 'auto', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }} 
        />
        <img 
          src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-8.png" 
          alt="Foundation Example" 
          style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '8px', boxShadow: 'var(--shadow-md)', marginTop: '1rem' }} 
        />
      </motion.div>

      {/* ===== EXPERIMENTAL BLOCK PROBLEM ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="Eg" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-red))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Textbook Example Problem</h3>
        </div>
        
        <div className="content-text" style={{ marginBottom: '2rem' }}>
          <p style={{ fontWeight: 500, fontStyle: 'italic', background: 'rgba(240,245,255,1)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)' }}>
            "A block of wood is kept on a tabletop. The mass of the wooden block is 5 kg and its dimensions are 40 cm × 20 cm × 10 cm. Find the pressure exerted by the wooden block on the table top if it is made to lie on the table top with its sides of dimensions (a) 20 cm × 10 cm and (b) 40 cm × 20 cm."
          </p>
        </div>

        <PressureBlockCalculator />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginTop: '3rem' }}>
           <img 
             src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-9.png" 
             alt="Block diagram" 
             style={{ width: '100%', maxWidth: '412px', height: 'auto', borderRadius: '8px' }} 
           />
           <img 
             src="https://login.skillizee.io/s/articles/69b11d60b48e6ac9f91ee0c7/images/image-20260311131435-10.png" 
             alt="Block math solution" 
             style={{ width: '100%', maxWidth: '428px', height: 'auto', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }} 
           />
        </div>
      </motion.div>


      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 3 / Chapter 3.2</p>
        <p style={{ marginTop: '0.5rem' }}>End of Area vs Pressure</p>
      </div>

    </div>
  )
}
