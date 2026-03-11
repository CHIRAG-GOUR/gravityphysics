import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CosmicBackground from './components/CosmicBackground'
import HeroSection from './components/HeroSection'
import ChapterContent from './components/ChapterContent'
import ChapterTwo from './components/ChapterTwo'
import ChapterThree from './components/ChapterThree'
import GravityProgressBars from './components/GravityProgressBars'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Zero-Gravity 3D Background */}
        <div className="three-bg-container">
          <CosmicBackground />
        </div>

        {/* Gravity Drip Progress Bars */}
        <GravityProgressBars />

        {/* Content Layer */}
        <div className="content-layer">
          <Routes>
            <Route path="/" element={<Navigate to="/chapter-1.1" replace />} />
            <Route path="/chapter-1.1" element={
              <>
                <HeroSection title="GRAVITATION" description="The fundamental force that governs the universe - from falling apples to orbiting planets." />
                <ChapterContent />
              </>
            } />
            <Route path="/chapter-1.2" element={
              <>
                <HeroSection title="ATTRACTION" description="Understanding that gravity is a universal attractive force between all masses in the universe." />
                <ChapterTwo />
              </>
            } />
            <Route path="/chapter-1.3" element={
              <>
                <HeroSection title="UNIVERSAL LAW" description="F = G(Mm)/d² : The mathematical formula that binds us to the earth and orbits planets around the sun." />
                <ChapterThree />
              </>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
