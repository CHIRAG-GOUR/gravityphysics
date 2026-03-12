import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CosmicBackground from './components/CosmicBackground'
import HeroSection from './components/HeroSection'
import ChapterContent from './components/ChapterContent'
import ChapterTwo from './components/ChapterTwo'
import ChapterThree from './components/ChapterThree'
import ChapterFour from './components/ChapterFour'
import ChapterTwoOne from './components/ChapterTwoOne'
import ChapterTwoTwo from './components/ChapterTwoTwo'
import ChapterTwoThree from './components/ChapterTwoThree'
import ChapterThreeOne from './components/ChapterThreeOne'
import ChapterThreeTwo from './components/ChapterThreeTwo'
import ChapterThreeThree from './components/ChapterThreeThree'
import ChapterFourOne from './components/ChapterFourOne'
import ChapterFourTwo from './components/ChapterFourTwo'
import ChapterFourThree from './components/ChapterFourThree'
import ChapterFourFour from './components/ChapterFourFour'
import GravityProgressBars from './components/GravityProgressBars'
import FullscreenButton from './components/FullscreenButton'

export default function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Zero-Gravity 3D Background */}
        <div className="three-bg-container">
          <CosmicBackground />
        </div>

        {/* Gravity Drip Progress Bars */}
        <GravityProgressBars />

        {/* Fullscreen Toggle */}
        <FullscreenButton />

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
            <Route path="/chapter-3.1" element={
              <>
                <HeroSection title="THRUST & PRESSURE" description="How forces are distributed across surfaces and the resulting effects." />
                <ChapterThreeOne />
              </>
            } />
            <Route path="/chapter-3.2" element={
              <>
                <HeroSection title="AREA VS PRESSURE" description="Understanding the inverse relationship between area and pressure through real-world examples." />
                <ChapterThreeTwo />
              </>
            } />
            <Route path="/chapter-3.3" element={
              <>
                <HeroSection title="PRESSURE IN FLUIDS" description="Omnidirectional force and an introduction to buoyancy." />
                <ChapterThreeThree />
              </>
            } />
            <Route path="/chapter-4.1" element={
              <>
                <HeroSection title="BUOYANCY" description="The upward force exerted by fluids that makes objects feel lighter." />
                <ChapterFourOne />
              </>
            } />
            <Route path="/chapter-4.2" element={
              <>
                <HeroSection title="FLOAT OR SINK" description="Why some objects float while others sink, and the critical role of density." />
                <ChapterFourTwo />
              </>
            } />
            <Route path="/chapter-4.3" element={
              <>
                <HeroSection title="ARCHIMEDES' PRINCIPLE" description="An upward force equal to the weight of the fluid it displaces." />
                <ChapterFourThree />
              </>
            } />
            <Route path="/chapter-4.4" element={
              <>
                <HeroSection title="APPLICATIONS" description="Real-world uses of buoyancy, from giant steel ships to measuring instruments." />
                <ChapterFourFour />
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
