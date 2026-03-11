import React, { useState } from 'react'

const ALL_ITEMS = [
  { id: '1', text: 'Measure of inertia', correctBox: 'MASS' },
  { id: '2', text: 'Force of gravity on an object', correctBox: 'WEIGHT' },
  { id: '3', text: 'Measured in Kilograms (kg)', correctBox: 'MASS' },
  { id: '4', text: 'Measured in Newtons (N)', correctBox: 'WEIGHT' },
  { id: '5', text: 'Constant everywhere in the universe', correctBox: 'MASS' },
  { id: '6', text: 'Zero at the center of the earth', correctBox: 'WEIGHT' },
  { id: '7', text: 'Scalar quantity (magnitude only)', correctBox: 'MASS' },
  { id: '8', text: 'Vector quantity (magnitude & downward direction)', correctBox: 'WEIGHT' },
]

export default function MassVsWeightSortActivity() {
  const [items, setItems] = useState(ALL_ITEMS)
  const [massBox, setMassBox] = useState([])
  const [weightBox, setWeightBox] = useState([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('itemId', item.id)
  }

  const handleDrop = (e, targetBox) => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('itemId')
    const draggedItem = items.find(i => i.id === itemId)
    
    if (!draggedItem) return // Case where item might be dragged from wrong place or twice

    if (draggedItem.correctBox === targetBox) {
      // Success
      setItems(prev => prev.filter(i => i.id !== itemId))
      if (targetBox === 'MASS') setMassBox(prev => [...prev, draggedItem])
      if (targetBox === 'WEIGHT') setWeightBox(prev => [...prev, draggedItem])
      
      setScore(prev => prev + 1)
      setFeedback("Correct! 🎉")
    } else {
      // Fail
      setFeedback(`Oops! "${draggedItem.text}" belongs in the other category.`)
    }

    setTimeout(() => setFeedback(""), 2000)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleReset = () => {
    setItems(ALL_ITEMS)
    setMassBox([])
    setWeightBox([])
    setScore(0)
    setFeedback("")
  }

  const isComplete = score === ALL_ITEMS.length

  return (
    <div className="neu-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Concept Sorter: Mass vs Weight</h3>
          <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Mass and Weight are often confused in daily life, but they are very different in physics. Drag and drop the properties into their correct categories.</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
         <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>
             Progress: <span style={{ color: isComplete ? 'var(--accent-green)' : 'var(--accent-purple)' }}>{score} / {ALL_ITEMS.length}</span>
         </div>
         <div style={{ color: feedback.includes('Correct') ? 'var(--accent-green)' : 'var(--accent-orange)', fontWeight: 'bold' }}>
             {feedback}
         </div>
         <button onClick={handleReset} className="interactive-btn" style={{ padding: '0.5rem 1rem', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
             Reset Game
         </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Unsorted Items Bank */}
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', background: 'rgba(108,159,255,0.05)', borderRadius: '12px', minHeight: '300px' }}>
          <h4 style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '0.5rem' }}>Property Bank</h4>
          {items.map(item => (
            <div 
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              style={{
                background: 'white',
                padding: '0.75rem',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                cursor: 'grab',
                fontSize: '0.9rem',
                fontWeight: 500,
                borderLeft: '4px solid var(--accent-blue)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {item.text}
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center' }}>
               All sorted perfectly!<br/>Great job!
            </div>
          )}
        </div>

        {/* Drop Zones */}
        <div style={{ flex: '2 1 400px', display: 'flex', gap: '1rem' }}>
          
          {/* MASS Box */}
          <div 
            onDrop={(e) => handleDrop(e, 'MASS')}
            onDragOver={handleDragOver}
            style={{ flex: 1, background: '#fef2f2', border: '2px dashed #fca5a5', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'background 0.3s' }}
          >
            <h4 style={{ color: '#ef4444', textAlign: 'center', margin: '0 0 1rem 0', padding: '0.5rem', background: '#fee2e2', borderRadius: '8px' }}>MASS</h4>
            {massBox.map(item => (
               <div key={item.id} style={{ background: 'white', padding: '0.75rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '0.85rem', color: 'var(--accent-black)' }}>
                 ✅ {item.text}
               </div>
            ))}
          </div>

          {/* WEIGHT Box */}
          <div 
            onDrop={(e) => handleDrop(e, 'WEIGHT')}
            onDragOver={handleDragOver}
            style={{ flex: 1, background: '#eff6ff', border: '2px dashed #93c5fd', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'background 0.3s' }}
          >
            <h4 style={{ color: '#3b82f6', textAlign: 'center', margin: '0 0 1rem 0', padding: '0.5rem', background: '#dbeafe', borderRadius: '8px' }}>WEIGHT</h4>
            {weightBox.map(item => (
               <div key={item.id} style={{ background: 'white', padding: '0.75rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '0.85rem', color: 'var(--accent-black)' }}>
                 ✅ {item.text}
               </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}
