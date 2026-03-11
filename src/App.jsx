import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CosmicBackground from './components/CosmicBackground'
import HeroSection from './components/HeroSection'
import ChapterContent from './components/ChapterContent'
import ChapterTwo from './components/ChapterTwo'
import ChapterThree from './components/ChapterThree'
import ChapterFour from './components/ChapterFour'
import ChapterTwoOne from './components/ChapterTwoOne'
import ChapterTwoTwo from './components/ChapterTwoTwo'
import ChapterTwoThree from './components/ChapterTwoThree'
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
                <HeroSection title="CENTRIPETAL FORCE" description="The center-seeking force required to keep an object moving in a circular path." />
                <ChapterThree />
              </>
            } />
            <Route path="/chapter-1.4" element={
              <>
                <HeroSection title="UNIVERSAL LAW" description="F = G(Mm)/d² : The mathematical formula that binds us to the earth and orbits planets around the sun." />
                <ChapterFour />
              </>
            } />
            <Route path="/chapter-2.1" element={
              <>
                <HeroSection title="FREE FALL" description="When an object falls towards the earth under the influence of gravitational force alone." />
                <ChapterTwoOne />
              </>
            } />
            <Route path="/chapter-2.2" element={
              <>
                <HeroSection title="ACCELERATION DUE TO GRAVITY" description="The constant acceleration experienced by objects in free fall due to Earth's gravitational attraction." />
                <ChapterTwoTwo />
              </>
            } />
            <Route path="/chapter-2.3" element={
              <>
                <HeroSection title="MASS & WEIGHT" description="Understanding the fundamental difference between the amount of matter and the force of gravity." />
                <ChapterTwoThree />
              </>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
