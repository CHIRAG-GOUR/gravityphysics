import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import AccelerationGravitySimulator from './AccelerationGravitySimulator'
import GravityValueCalculatorActivity from './GravityValueCalculatorActivity'

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

export default function ChapterTwoTwo() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="2.2" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Unit 2: Acceleration due to Gravity</h2>
        </div>
      </motion.div>

      {/* ===== VIDEO ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <VideoCard 
          videoId="zy1Bb6Pp95s" 
          title="Acceleration due to Gravity? Physics"
          description="Understanding 'g' and how it varies."
        />
      </motion.div>

      {/* ===== DEFINITION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="g" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-purple))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Definition</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--accent-black)', marginBottom: '1.5rem' }}>
            The constant acceleration experienced by objects in free fall due to the Earth's gravitational attraction.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Symbol:</b> <strong>g</strong></div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-pink)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Unit:</b> <img src="https://login.skillizee.io/s/articles/69b0fbf0f82dfc72003d1caf/images/image-20260311105357-2.png" alt="m/s^2" style={{ height: '20px', verticalAlign: 'middle' }} /> (the same as standard acceleration).</div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--accent-orange)', fontSize: '1.2rem', marginTop: '-2px' }}>•</div>
              <div><b>Variation:</b> Because the Earth is not a perfect sphere (it is flattened at the poles and bulges at the equator), the value of g is greater at the poles than at the equator.</div>
            </li>
          </ul>

          <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid var(--accent-blue)', padding: '1rem 1.5rem', borderRadius: 'r-8px', marginTop: '2rem' }}>
            <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Key Takeaway</h4>
            <p style={{ margin: 0, fontWeight: 500 }}>
              Every time an object falls toward Earth, it isn't just "moving", it is accelerating. This constant pull ensures that the further an object falls, the faster it goes (until it hits an obstacle or terminal velocity).
            </p>
          </div>
        </div>
      </motion.div>

      {/* ===== EARTH BULGE SIMULATOR ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <AccelerationGravitySimulator />
      </motion.div>

      {/* ===== CALCULATION ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="∑" gradient="linear-gradient(135deg, var(--accent-green), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Calculation</h3>
        </div>
        
        <div className="content-text">
          <p>To find the value of g, we use the relationship between Newton's Second Law <strong>(F = mg)</strong> and the Universal Law of Gravitation.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b0fbf0f82dfc72003d1caf/images/image-20260311105357-3.png" 
              alt="mg = GMm/d^2" 
              style={{ height: '45px', width: 'auto' }} 
            />
          </div>

          <p>For an object on or near the surface of the Earth, the distance <strong>d</strong> is equal to the radius of the Earth <strong>R</strong>.</p>
          
          <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--accent-black)' }}>The Formula</h4>
          <p>Thus, for objects on or near the surface of the earth:</p>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
            <img 
              src="https://login.skillizee.io/s/articles/69b0fbf0f82dfc72003d1caf/images/image-20260311105357-4.png" 
              alt="g = GM/R^2" 
              style={{ height: '100px', width: 'auto' }} 
            />
          </div>

          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '2rem' }}>
            <h4 style={{ color: 'var(--accent-purple)', marginBottom: '1rem', fontSize: '1.1rem' }}>Substituting the Constants:</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <b>Universal Gravitational Constant (G):</b>
                <img src="https://login.skillizee.io/s/articles/69b0fbf0f82dfc72003d1caf/images/image-20260311105357-5.png" alt="G Value" style={{ height: '50px' }} />
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <b>Mass of the Earth (M):</b>
                <img src="https://login.skillizee.io/s/articles/69b0fbf0f82dfc72003d1caf/images/image-20260311105357-6.png" alt="M Value" style={{ height: '30px' }} />
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <b>Radius of the Earth (R):</b>
                <img src="https://login.skillizee.io/s/articles/69b0fbf0f82dfc72003d1caf/images/image-20260311105357-7.png" alt="R Value" style={{ height: '30px' }} />
              </li>
            </ul>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
              <img src="https://login.skillizee.io/s/articles/69b0fbf0f82dfc72003d1caf/images/image-20260311105357-8.png" alt="Calculation Steps" style={{ height: '120px' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Standard Value Result: Approximately</span>
              <img src="https://login.skillizee.io/s/articles/69b0fbf0f82dfc72003d1caf/images/image-20260311105357-9.png" alt="9.8 m/s^2" style={{ height: '40px' }} />
            </div>
            
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Note: For most calculations involving objects near the surface, we treat g as a constant. However, for objects far from the Earth, the distance d increases, causing the value of g to decrease.</p>
          </div>
        </div>
      </motion.div>

      {/* ===== EQUATION BUILDER ACTIVITY ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <GravityValueCalculatorActivity />
      </motion.div>

      {/* ===== MOTION OF OBJECTS EQUATIONS ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <h3 className="section-title" style={{ marginBottom: '1.5rem' }}>Motion of Objects under Earth's Gravitational Force</h3>
        <div className="content-text">
          <p>
            We know that an object experiences acceleration during free fall. This acceleration experienced by an object is independent of its mass. This means that all objects hollow or solid, big or small, should fall at the same rate. According to a story, Galileo dropped different objects from the top of the Leaning Tower of Pisa in Italy to prove the same.
          </p>

          <p style={{ marginTop: '1.5rem', marginBottom: '1.5rem', fontWeight: '500' }}>
            As g is constant near the earth, all the equations for the uniformly accelerated motion of objects become valid with acceleration <b>a</b> replaced by <b>g</b>.
          </p>

          <p style={{ fontStyle: 'italic', marginBottom: '2rem' }}>
            In applying these equations, we will take acceleration to be positive when it is in the direction of the velocity, that is, in the direction of motion. The acceleration will be taken as negative when it opposes the motion (e.g. throwing an object upwards).
          </p>

          {/* Example Problem Image */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <h4 style={{ color: 'var(--accent-orange)' }}>Example Problem</h4>
            <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>An object is thrown vertically upwards and rises to a height of 10 m. Calculate the velocity with which the object was thrown upwards and the time taken.</p>
            <img src="https://login.skillizee.io/s/articles/69b0fbf0f82dfc72003d1caf/images/image-20260311105357-15.png" alt="Example Problem Solution" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>

        </div>
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 2 / Chapter 2.2</p>
        <p style={{ marginTop: '0.5rem' }}>End of Acceleration due to Gravity</p>
      </div>

    </div>
  )
}
