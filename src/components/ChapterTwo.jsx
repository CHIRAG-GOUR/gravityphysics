import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import AppleEarthSimulator from './AppleEarthSimulator'
import UniversalAttractionSimulator from './UniversalAttractionSimulator'
import { Link } from 'react-router-dom'

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

export default function ChapterTwo() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="1.2" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 2: The Concept of Gravitation</h2>
        </div>
      </motion.div>

      {/* ===== Video 1 ===== */}
      <motion.div {...sectionAnim}>
        <VideoCard 
          videoId="nnV6eFx_9jo" 
          title="CBSE Class 9 || Physics || Gravitation || Animation"
          description="Watch until 2:33 for the core conceptual introduction to Gravitation."
        />
      </motion.div>

      {/* ===== Video 2 ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '2rem' }}>
        <VideoCard 
          videoId="AFGOzTM0N-A" 
          title="Gravitation Concept Animation"
          description="Further visual breakdown of gravitational concepts."
        />
      </motion.div>

      {/* ===== CONCEPT EXPLANATION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="💡" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Understanding Universal Attraction</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem' }}>
            Understanding that gravity is a universal attractive force between all objects with mass.
          </p>

          <ul>
            <li style={{ marginBottom: '1.25rem' }}>
              <b>Newton's Insight:</b> The realization began with a falling apple. Newton conjectured that if the Earth can attract an apple, it can also attract the Moon. He concluded that the same type of force is responsible in both cases.
            </li>
            
            <li style={{ marginBottom: '1.25rem' }}>
              <b>Universal Attraction:</b> Gravitation is not limited to Earth. In our solar system, a force exists between the Sun and the planets. Newton concluded that <em>all objects in the universe attract each other</em>.
            </li>

            <li style={{ marginBottom: '1.25rem' }}>
              <b>The Apple vs. The Earth:</b> While the Earth pulls the apple, the apple <em>also</em> attracts the Earth (per the Third Law of Motion). However, because acceleration is inversely proportional to mass (Second Law of Motion), the Earth's massive size means its acceleration toward the apple is too small to be seen. The same logic explains why the Earth does not visibly move toward the Moon.
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ===== INTERACTIVE SIMULATORS ===== */}
      <motion.div {...sectionAnim}>
        <AppleEarthSimulator />
      </motion.div>

      <motion.div {...sectionAnim}>
        <UniversalAttractionSimulator />
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 1 / Chapter 1.2</p>
        <p style={{ marginTop: '0.5rem' }}>End of The Concept of Gravitation</p>
      </div>

    </div>
  )
}
