import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import WeightOnPlanetsSimulator from './WeightOnPlanetsSimulator'
import MassVsWeightSortActivity from './MassVsWeightSortActivity'
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

export default function ChapterTwoThree() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="2.3" gradient="linear-gradient(135deg, var(--accent-green), var(--accent-teal))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 3: Mass & Weight</h2>
        </div>
      </motion.div>

      {/* ===== VIDEO ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <VideoCard 
          videoId="rFdbY_V7vIo" 
          title="Mass vs Weight"
          description="Understanding the fundamental difference between the amount of matter and the force of gravity."
        />
      </motion.div>

      {/* ===== DEFINITION: MASS ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="m" gradient="linear-gradient(135deg, var(--accent-pink), var(--accent-red))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Mass</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--accent-black)', marginBottom: '1.5rem' }}>
            Mass of an object is the measure of its inertia. Greater the mass, the greater is the inertia. 
            It remains the same whether the object is on the earth, the moon or even in outer space. Thus, the mass of an object is constant and does not change from place to place.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Unit:</b> The SI unit of mass is the kilogram (kg).</div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-pink)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Quantity:</b> It is a scalar quantity (has only magnitude).</div>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ===== DEFINITION: WEIGHT ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="W" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-purple))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Weight</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--accent-black)', marginBottom: '1.5rem' }}>
            The weight of an object is the force with which it is attracted towards the earth.
          </p>

          <div style={{ margin: '2rem 0', background: 'rgba(59, 130, 246, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-blue)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <p style={{ margin: '0 0 1rem 0' }}>From Newton's Second Law: <br/><b>Force = mass × acceleration (F = ma)</b></p>
             <p style={{ margin: '0 0 1rem 0' }}>For falling objects, acceleration is `g`. So the downward force is: <br/><b>F = m × g</b></p>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-purple)', background: 'white', padding: '0.5rem 2rem', borderRadius: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                W = m × g
             </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Unit:</b> As weight is a force, its SI unit is the Newton (N).</div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-pink)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Quantity:</b> It is a vector quantity (has magnitude and acts vertically downwards).</div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-orange)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Variability:</b> Because `g` varies from place to place, weight also varies. It is zero at the center of the Earth!</div>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ===== WEIGHT ON PLANETS SIMULATOR ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <WeightOnPlanetsSimulator />
      </motion.div>

      {/* ===== WEIGHT ON THE MOON CONCEPT ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <ConceptCard 
          title="Weight of an Object on the Moon" 
          description="The mass of the moon is less than that of the earth. Due to this the moon exerts lesser force of attraction on objects. When we calculate g for the moon, it comes out to be exactly 1/6th of its value on Earth. Therefore, you would weigh 6 times less on the moon!" 
          color="orange" 
        />
      </motion.div>

      {/* ===== SORTING ACTIVITY ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <MassVsWeightSortActivity />
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 2 / Chapter 2.3</p>
        <p style={{ marginTop: '0.5rem' }}>End of Mass & Weight</p>
      </div>

    </div>
  )
}
