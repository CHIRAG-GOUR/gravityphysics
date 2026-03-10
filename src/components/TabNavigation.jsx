import React from 'react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { path: '/', label: 'Gravitation' },
  // Future chapters:
  // { path: '/chapter-2', label: '⚖️ Mass & Weight', emoji: '⚖️' },
  // { path: '/chapter-3', label: '🏊 Buoyancy', emoji: '🏊' },
]

export default function TabNavigation() {
  return (
    <nav className="tab-nav">
      {tabs.map(tab => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
          end
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
