import React from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'
import ConceptCard from './ConceptCard'
import BottleBuoyancySimulator from './BottleBuoyancySimulator'

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

export default function ChapterFourOne() {
  return (
    <div className="section-container" style={{ paddingTop: '12rem' }}>
      
      {/* ===== HEADER ===== */}
      <motion.div className="neu-card" {...sectionAnim}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge letter="4.1" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-purple))" />
          <h2 className="section-title" style={{ marginBottom: 0 }}>Chapter 4.1: Buoyancy</h2>
        </div>
      </motion.div>

      {/* ===== VIDEO ===== */}
      <motion.div {...sectionAnim}>
        <VideoCard 
          videoId="khc2wUBsFU4" 
          title="What is Buoyancy? | Physics | Don't Memorise" 
        />
      </motion.div>

      {/* ===== INTRO & WHAT IS BUOYANCY ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="1" gradient="linear-gradient(135deg, var(--accent-green), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>1. What is Buoyancy?</h3>
        </div>
        
        <div className="content-text">
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-black)', marginBottom: '1.5rem' }}>
            Have you ever felt lighter while swimming, or noticed that a bucket of water feels significantly heavier the moment it leaves the surface of a well? These phenomena occur because fluids don't just exert pressure, they exert a specific upward force.
          </p>

          <ConceptCard 
            title="Definition" 
            description="When an object is immersed in a fluid (liquid or gas), it experiences an upward force exerted by the fluid. This force is known as buoyancy or upthrust."
            color="blue"
          />
        </div>
      </motion.div>

      {/* ===== THE BATTLE OF FORCES ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="2" gradient="linear-gradient(135deg, var(--accent-orange), var(--accent-red))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>2. The Battle of Forces</h3>
        </div>
        
        <div className="content-text">
          <p>Every object placed in water is subject to two opposing forces:</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
            <div className="fact-card pink-bg">
              <h4 style={{ fontWeight: 'bold', color: 'var(--accent-pink)', marginBottom: '0.5rem' }}>1. Gravitational Force (Weight)</h4>
              <p style={{ fontSize: '0.9rem' }}>Pulls the object downward toward the center of the Earth.</p>
            </div>
            <div className="fact-card green-bg">
              <h4 style={{ fontWeight: 'bold', color: 'var(--accent-green)', marginBottom: '0.5rem' }}>2. Buoyant Force (Upthrust)</h4>
              <p style={{ fontSize: '0.9rem' }}>Pushes the object upward, opposing gravity.</p>
            </div>
          </div>

          <ConceptCard 
            title="Why do some things float while others sink?"
            description="• If Buoyant Force > Weight: The object rises to the surface and floats (like a plastic bottle).
• If Buoyant Force < Weight: The object sinks (like a stone).
• To keep a floating object submerged: You must apply an external downward force equal to the difference between the upthrust and the object's weight."
            color="purple"
          />
        </div>
      </motion.div>

      {/* ===== INTERACTIVE: BOTTLE BUOYANCY ===== */}
      <motion.div {...sectionAnim} style={{ marginTop: '3rem' }}>
        <BottleBuoyancySimulator />
      </motion.div>

      {/* ===== TRY IT YOURSELF ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="💡" gradient="linear-gradient(135deg, var(--accent-purple), var(--accent-pink))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>Try it yourself!</h3>
        </div>
        
        <div className="content-text">
          <ul>
            <li style={{ marginBottom: '1.25rem' }}><b>Activity:</b> Take an empty plastic bottle. Close the mouth of the bottle with an airtight stopper. Put it in a bucket filled with water. You see that the bottle floats.</li>
            <li style={{ marginBottom: '1.25rem' }}>Push the bottle into the water. You feel an upward push. Try to push it further down. You will find it difficult to push deeper and deeper. This indicates that water exerts a force on the bottle in the upward direction. The upward force exerted by the water goes on increasing as the bottle is pushed deeper till it is completely immersed.</li>
            <li style={{ marginBottom: '1.25rem' }}>Now, release the bottle. It bounces back to the surface.</li>
          </ul>

          <div style={{ background: 'rgba(255, 122, 0, 0.05)', borderLeft: '4px solid var(--accent-orange)', padding: '1.5rem', borderRadius: '0 8px 8px 0', margin: '2rem 0' }}>
            <p style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--accent-black)' }}>
              Does the force due to the gravitational attraction of the earth act on this bottle? If so, why doesn't the bottle stay immersed in water after it is released? How can you immerse the bottle in water?
            </p>
            <p style={{ margin: '0 0 1rem 0' }}>
              The force due to the gravitational attraction of the earth acts on the bottle in the downward direction. So the bottle is pulled downwards. But the water exerts an upward force on the bottle. Thus, the bottle is pushed upwards. When the bottle is immersed, the upward force exerted by the water on the bottle is greater than its weight. Therefore it rises up when released.
            </p>
            <p style={{ margin: 0 }}>
              To keep the bottle completely immersed, the upward force on the bottle due to water must be balanced. This can be achieved by an externally applied force acting downwards. This force must at least be equal to the difference between the upward force and the weight of the bottle.
            </p>
          </div>

          <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>The upward force exerted by the water on the bottle is known as <strong>upthrust</strong> or <strong>buoyant force</strong>. In fact, all objects experience a force of buoyancy when they are immersed in a fluid. The magnitude of this buoyant force depends on the density of the fluid.</p>
        </div>
      </motion.div>

      {/* ===== FACTORS AFFECTING BUOYANCY ===== */}
      <motion.div className="neu-card" {...sectionAnim} style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Badge letter="3" gradient="linear-gradient(135deg, var(--accent-blue), var(--accent-teal))" />
          <h3 className="section-title" style={{ marginBottom: 0 }}>3. Factors Affecting Buoyancy</h3>
        </div>
        
        <div className="content-text">
          <p>The "strength" of this upward push is not the same in every liquid. The magnitude of the buoyant force depends primarily on the density of the fluid.</p>

          <div className="fact-card cyan-bg" style={{ marginTop: '1.5rem' }}>
            <ul style={{ margin: 0 }}>
              <li><strong>Higher Density:</strong> A denser fluid (like salt water) exerts a greater upward force than a less dense fluid (like fresh water). This is why it is easier to float in the ocean than in a swimming pool.</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ===== Footer ===== */}
      <div className="footer">
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>Module 4 / Chapter 4.1</p>
        <p style={{ marginTop: '0.5rem' }}>End of Buoyancy</p>
      </div>

    </div>
  )
}
