import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Constants for the game
const CorrectM = "6×10²⁴"
const CorrectR = "6.4×10⁶"
const G = "6.67×10⁻¹¹"

export default function GravityValueCalculatorActivity() {
  const [mValue, setMValue] = useState("?")
  const [rValue, setRValue] = useState("?")
  const [isCalculated, setIsCalculated] = useState(false)
  
  const optionsM = ["100", "6×10²⁴", "1.98×10³⁰", "5.97"]
  const optionsR = ["10", "1.5×10⁸", "6.4×10⁶", "6400"]

  const handleDragStart = (e, value, type) => {
    e.dataTransfer.setData('value', value)
    e.dataTransfer.setData('type', type)
  }

  const handleDrop = (e, targetType) => {
    e.preventDefault()
    const value = e.dataTransfer.getData('value')
    const type = e.dataTransfer.getData('type')
    
    // Allow any drop, we check correctness later
    if (targetType === 'M') {
      setMValue(value)
    } else if (targetType === 'R') {
      setRValue(value)
    }
    
    setIsCalculated(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleCalculate = () => {
    if (mValue === CorrectM && rValue === CorrectR) {
      setIsCalculated(true)
    } else {
      alert("Uh oh! Incorrect values. Please use the exact mass and radius of the Earth provided in standard SI units.")
    }
  }

  const resetActivity = () => {
    setMValue("?")
    setRValue("?")
    setIsCalculated(false)
  }

  return (
    <div className="neu-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
      <h3 className="section-title" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>"Discovering" g</h3>
      <p className="section-subtitle" style={{ fontSize: '0.9rem', textAlign: 'center', marginBottom: '2rem' }}>
        Drag the correct values for Earth's Mass (M) and Earth's Radius (R) into the equation to calculate acceleration due to gravity.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        
        {/* Toolbelt / Options */}
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '300px' }}>
          
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'center' }}>Possible Mass Options (kg)</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {optionsM.map(opt => (
                <div 
                  key={opt}
                  draggable 
                  onDragStart={(e) => handleDragStart(e, opt, 'M')}
                  style={{ background: 'var(--accent-orange)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'grab', fontSize: '0.9rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'center' }}>Possible Radius Options (m)</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {optionsR.map(opt => (
                <div 
                  key={opt}
                  draggable 
                  onDragStart={(e) => handleDragStart(e, opt, 'R')}
                  style={{ background: 'var(--accent-blue)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'grab', fontSize: '0.9rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* The Equation Builder Zone */}
        <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(108,159,255,0.05)', padding: '2rem', borderRadius: '16px', border: '2px dashed rgba(108,159,255,0.3)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            <span style={{ color: 'var(--accent-purple)' }}>g</span>
            <span style={{ color: 'var(--accent-black)' }}>=</span>
            
            {/* Fraction */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              {/* Numerator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <div style={{ padding: '0.5rem 1rem', background: '#cbd5e1', borderRadius: '8px', fontSize: '1.2rem', color: 'var(--accent-black)' }}>{G}</div>
                 <span style={{ color: 'var(--accent-black)' }}>×</span>
                 <div 
                    onDrop={(e) => handleDrop(e, 'M')}
                    onDragOver={handleDragOver}
                    style={{ padding: '0.5rem 1rem', background: mValue === "?" ? 'transparent' : 'var(--accent-orange)', border: mValue === "?" ? '2px dashed var(--accent-orange)' : 'none', borderRadius: '8px', fontSize: '1.2rem', color: mValue === "?" ? 'var(--text-secondary)' : 'white', minWidth: '80px', textAlign: 'center', transition: 'all 0.3s' }}
                 >
                   {mValue === "?" ? "Drop M" : mValue}
                 </div>
              </div>
              
              {/* Divider line */}
              <div style={{ width: '100%', height: '4px', background: 'var(--accent-black)', borderRadius: '2px' }} />

              {/* Denominator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                 <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>(</span>
                 <div 
                    onDrop={(e) => handleDrop(e, 'R')}
                    onDragOver={handleDragOver}
                    style={{ padding: '0.5rem 1rem', background: rValue === "?" ? 'transparent' : 'var(--accent-blue)', border: rValue === "?" ? '2px dashed var(--accent-blue)' : 'none', borderRadius: '8px', fontSize: '1.2rem', color: rValue === "?" ? 'var(--text-secondary)' : 'white', minWidth: '80px', textAlign: 'center', transition: 'all 0.3s' }}
                 >
                   {rValue === "?" ? "Drop R" : rValue}
                 </div>
                 <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>)²</span>
              </div>
            </div>

          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
            <button 
              onClick={handleCalculate}
              disabled={isCalculated || mValue === "?" || rValue === "?"}
              className="interactive-btn"
              style={{ background: 'var(--accent-green)', color: 'white', padding: '1rem 2rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: (isCalculated || mValue === "?" || rValue === "?") ? 'not-allowed' : 'pointer', opacity: (isCalculated || mValue === "?" || rValue === "?") ? 0.5 : 1 }}
            >
              Calculate g!
            </button>
            <button onClick={resetActivity} className="interactive-btn" style={{ background: '#e2e8f0', color: 'var(--accent-black)', padding: '1rem 2rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
               Reset
            </button>
          </div>

          {/* Result Reveal */}
          {isCalculated && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--accent-black)', color: 'white', borderRadius: '12px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', width: '100%' }}
            >
              <h4 style={{ color: 'var(--accent-orange)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Calculation Successful!</h4>
              <p style={{ margin: 0, fontSize: '1rem', color: '#cbd5e1' }}>Placing these massive numbers into the formula yields:</p>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-green)', marginTop: '1rem', fontFamily: 'monospace' }}>
                 9.8 m/s²
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}
