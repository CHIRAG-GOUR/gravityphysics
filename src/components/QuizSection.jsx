import React, { useState } from 'react'
import { motion } from 'framer-motion'

const questions = [
  {
    id: 'q1',
    text: 'Why does the Moon not fall to the Earth?',
    options: [
      { label: 'A', text: 'The Moon has no mass', correct: false },
      { label: 'B', text: 'There is no gravity in space', correct: false },
      { label: 'C', text: 'The Moon is in free fall but its tangential velocity keeps it in orbit', correct: true },
      { label: 'D', text: 'The Sun pushes the Moon away from Earth', correct: false },
    ],
    explanation: 'The Moon IS falling toward Earth! But its sideways velocity is just right so it keeps missing — creating a stable orbit.'
  },
  {
    id: 'q2',
    text: 'If the distance between two objects doubles, what happens to the gravitational force?',
    options: [
      { label: 'A', text: 'It doubles', correct: false },
      { label: 'B', text: 'It halves', correct: false },
      { label: 'C', text: 'It becomes one-fourth', correct: true },
      { label: 'D', text: 'It stays the same', correct: false },
    ],
    explanation: 'Since force is inversely proportional to d², doubling the distance means F becomes 1/(2²) = 1/4 of the original.'
  },
]

function Question({ question }) {
  const [selected, setSelected] = useState(null)
  const answered = selected !== null

  const handleSelect = (index) => {
    if (answered) return
    setSelected(index)
  }

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        {question.text}
      </p>
      <div>
        {question.options.map((opt, i) => {
          let className = 'quiz-option'
          if (answered) {
            className += ' disabled'
            if (i === selected && !opt.correct) className += ' wrong'
            if (opt.correct) className += ' correct'
          }
          return (
            <motion.div
              key={i}
              className={className}
              onClick={() => handleSelect(i)}
              whileTap={!answered ? { scale: 0.98 } : {}}
            >
              <strong>{opt.label}.</strong> {opt.text}
            </motion.div>
          )
        })}
      </div>
      {answered && (
        <motion.div
          className="quiz-feedback"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: question.options[selected].correct ? 'var(--card-green)' : '#fee2e2',
            color: question.options[selected].correct ? '#059669' : '#dc2626',
          }}
        >
          {question.options[selected].correct ? '✅ Correct! ' : '❌ Not quite. '}
          {question.explanation}
        </motion.div>
      )}
    </div>
  )
}

export default function QuizSection() {
  return (
    <motion.div
      className="neu-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: '#fff', boxShadow: '0 0 12px rgba(52,211,153,0.3)' }}>Q</div>
        <h3 className="section-title" style={{ marginBottom: 0 }}>Quick Check</h3>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', marginTop: '0.5rem' }}>
        Test your understanding!
      </p>
      {questions.map(q => <Question key={q.id} question={q} />)}
    </motion.div>
  )
}
