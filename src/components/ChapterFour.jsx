import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import UniversalLawMathSimulator from './UniversalLawMathSimulator'
import GravitationalPhenomenaSimulator from './GravitationalPhenomenaSimulator'

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

export default function ChapterFour() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="1.3" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 4: The Universal Law of Gravitation</h2>
        </div>
      </motion.div>

      {/* ===== Video 1 ===== */}
      <motion.div {...sectionAnim}>
        <VideoCard 
          videoId="Af9lRX4xsr0" 
          title="Understanding Universal law of Gravitation!"
          description="An introduction to the Universal Law of Gravitation."
        />
      </motion.div>

      {/* ===== CONCEPT INTRODUCTION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div className="content-text">
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem' }}>
            The law is "universal" because it applies to all bodies in the universe - whether they are celestial (like stars) or terrestrial (like an apple).
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Every object in the universe attracts every other object with a force which is proportional to the product of their masses and inversely proportional to the square of the distance between them. The force is along the line joining the centres of two objects.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102112-1.png" 
              alt="Force Direction Diagram" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
            />
          </div>

          <p style={{ fontStyle: 'italic', fontWeight: '500' }}>
            The gravitational force between two uniform objects is directed along the line joining their centres.
          </p>
        </div>
      </motion.div>

      {/* ===== MATHEMATICAL FORMULA ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="∑" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>The Mathematical Formula</h3>
        </div>
        
        <div className="content-text">
          <p>The gravitational force (F) between two objects of masses M and m at a distance d is given by:</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102112-2.png" 
              alt="F = GMm/d^2" 
              style={{ height: '60px', width: 'auto' }} 
            />
          </div>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: 'var(--accent-black)' }}>1. Derivation Steps:</h4>
          <ul>
            <li style={{ marginBottom: '1rem' }}>
              <b>Mass Relationship:</b> The force is directly proportional to the product of the masses: F is proportional to M × m.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <b>Distance Relationship:</b> The force is inversely proportional to the square of the distance between the centers: 
              <div style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px' }}>
                <img src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102112-3.png" alt="1/d^2" style={{ height: '24px' }} />
              </div>
            </li>
          </ul>

          <p style={{ marginTop: '1.5rem', marginBottom: '1rem' }}><b>Combined Equation:</b> Combining these gives</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <img src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102112-4.png" alt="Proportionality" style={{ height: '30px' }} />
            <span>. By introducing the constant of proportionality (G), we get the final formula.</span>
          </div>

          <p style={{ marginTop: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
             <img src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102211-14.png" alt="Final Formula" style={{ height: '50px' }} />
          </p>
        </div>
      </motion.div>

      {/* ===== INTERACTIVE SIMULATOR ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <UniversalLawMathSimulator />
      </motion.div>

      {/* ===== UNIVERSAL GRAVITATIONAL CONSTANT ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <h3 className="section-title" style={{ marginBottom: '1.5rem' }}>2. The Universal Gravitational Constant (G)</h3>
        
        <VideoCard 
          videoId="c9shwPMpSq8" 
          title="The Universal Gravitational Constant"
          description="Learn about 'G' and Cavendish's experiment."
          style={{ marginBottom: '2rem' }}
        />

        <div className="content-text" style={{ marginTop: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}><b>Value:</b></p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <img src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102112-5.png" alt="G Value" style={{ height: '30px' }} />
            <span>(discovered by Henry Cavendish).</span>
          </div>

          <ul>
            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <b>SI Unit:</b> 
              <img src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102112-6.png" alt="Unit" style={{ height: '30px' }} />
              <span>This is derived by rearranging the formula to:</span>
              <img src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102112-7.png" alt="Derived Unit" style={{ height: '35px' }} />
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ===== WHY DONT WE FEEL THE PULL ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="🤔" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Why don't we feel the pull?</h3>
        </div>

        <div className="content-text">
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <span>Although a gravitational force exists between you and a friend sitting nearby, you do not experience it because the value of G is extremely small</span>
            <img src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102112-8.png" alt="Tiny G" style={{ height: '25px' }} />
            <span>Unless at least one of the objects has an enormous mass (like the Earth), the resulting force (F) is too weak to overcome other forces like friction or even be noticed by our senses.</span>
          </p>

          <div style={{ background: 'rgba(255,122,0,0.05)', borderLeft: '4px solid var(--accent-orange)', padding: '1rem 1.5rem', borderRadius: 'r-8px', marginBottom: '2rem' }}>
            <p style={{ margin: 0, fontWeight: 500 }}>
              <b>Inverse-Square Note:</b> If the distance (d) between two objects increases by a factor of 6, the force (F) becomes 1/36 times smaller.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <b>Direct Proportionality:</b>
              <img src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102211-16.png" alt="Direct Prop" style={{ height: '30px' }} />
              <span>If mass increases, force increases.</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <b>Inverse-Square Law:</b>
              <span>F inversely proportional</span>
              <img src="https://login.skillizee.io/s/articles/69b0f4bef82dfc72003d19b4/images/image-20260311102211-17.png" alt="Inverse Square" style={{ height: '35px' }} />
              <span>If distance increases, force decreases significantly.</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== IMPORTANCE OF THE LAW ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem', border: '1px solid rgba(108,159,255,0.3)', background: 'linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(240,245,255,0.6))' }}>
        <h3 className="section-title" style={{ marginBottom: '1.5rem', color: 'var(--accent-blue)' }}>Importance of the Universal Law</h3>
        
        <div className="content-text">
          <p style={{ marginBottom: '1.5rem' }}>
            The law is "universal" because it applies to all bodies in the universe - whether they are celestial (like stars) or terrestrial (like an apple). It successfully explains phenomena once thought to be unconnected:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 500 }}>
                <div style={{ color: 'var(--accent-blue)', fontSize: '1.5rem' }}>🌍</div> (i) The force that binds us to the earth;
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 500 }}>
                <div style={{ color: 'var(--accent-pink)', fontSize: '1.5rem' }}>🌒</div> (ii) The motion of the moon around the earth;
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 500 }}>
                <div style={{ color: 'var(--accent-orange)', fontSize: '1.5rem' }}>☀️</div> (iii) The motion of planets around the Sun;
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 500 }}>
                <div style={{ color: '#0ea5e9', fontSize: '1.5rem' }}>🌊</div> (iv) The tides due to the moon and the Sun.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ===== GRAVITATIONAL PHENOMENA SIMULATOR ===== */}
      <motion.div {...sectionAnim}>
        <GravitationalPhenomenaSimulator />
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 1 / Chapter 1.3</p>
        <p style={{ marginTop: '0.5rem' }}>End of The Universal Law of Gravitation</p>
      </div>

    </div>
  )
}
