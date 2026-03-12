import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VideoCard({ videoId, title, subtitle, videoPath }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => {
      setIsPlaying(true);
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    const newValue = !isMuted;
    setIsMuted(newValue);
    videoRef.current.muted = newValue;
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    videoRef.current.volume = value;
    setIsMuted(value === 0);
  };

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2, 0.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    videoRef.current.playbackRate = nextSpeed;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleContextMenu = (e) => e.preventDefault();

  return (
    <motion.div
      className="video-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      onContextMenu={handleContextMenu}
    >
      <div className="video-header">
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(108,159,255,0.3)' }}>
          <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 700 }}>▶</span>
        </div>
        <div>
          <div className="video-header-title">{title || 'Video Explanation'}</div>
          {subtitle && <div className="video-header-sub">{subtitle}</div>}
        </div>
      </div>
      
      {videoPath ? (
        <div 
          ref={containerRef}
          className="custom-video-player"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          style={{ 
            position: 'relative', 
            overflow: 'hidden', 
            borderRadius: isFullscreen ? '0' : '12px', 
            background: '#000',
            aspectRatio: '16/9',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            cursor: showControls ? 'default' : 'none'
          }}
        >
          <video
            ref={videoRef}
            src={videoPath}
            onClick={togglePlay}
            onContextMenu={handleContextMenu}
            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
          />

          {/* Player Branding / Top Bar */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: '1.2rem 1.5rem',
                  background: 'linear-gradient(rgba(0,0,0,0.6), transparent)',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <img 
                  src="/images/skillizee-logo.png" 
                  alt="Skillizee" 
                  style={{ height: '24px', opacity: 0.9, filter: 'brightness(0) invert(1)' }} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Big Center Play Button Overlay */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 0 30px rgba(0,0,0,0.3)'
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Premium Controls Overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2.5rem 1.5rem 1.2rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                  zIndex: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}
              >
                {/* Progress Bar */}
                <div style={{ position: 'relative', height: '6px', width: '100%', borderRadius: '3px', background: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="video-seekbar"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    left: 0, top: 0, 
                    height: '100%', 
                    width: `${(currentTime / duration) * 100 || 0}%`, 
                    background: 'var(--gradient-primary)',
                    borderRadius: '3px',
                    boxShadow: '0 0 10px rgba(108,159,255,0.5)'
                  }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    {/* Play/Pause */}
                    <button onClick={togglePlay} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#fff', display: 'flex', alignItems: 'center' }}>
                      {isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Volume */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="volume-control">
                      <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 0, display: 'flex' }}>
                        {isMuted || volume === 0 ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3z" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                          </svg>
                        )}
                      </button>
                      <input 
                        type="range" min="0" max="1" step="0.1" 
                        value={volume} onChange={handleVolumeChange}
                        style={{ width: '80px', height: '4px', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Time */}
                    <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'var(--font-primary), monospace', opacity: 0.9 }}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    {/* Speed */}
                    <button 
                      onClick={changeSpeed}
                      style={{ 
                        background: 'rgba(255,255,255,0.12)', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        borderRadius: '6px', 
                        color: '#fff', 
                        fontSize: '0.8rem', 
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        minWidth: '55px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.12)'}
                    >
                      {playbackSpeed}x
                    </button>

                    {/* Fullscreen */}
                    <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex' }}>
                      {isFullscreen ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <style dangerouslySetInnerHTML={{ __html: `
            .video-seekbar::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 16px;
              height: 16px;
              background: #fff;
              border-radius: 50%;
              box-shadow: 0 0 10px rgba(0,0,0,0.5);
              transition: transform 0.1s ease;
            }
            .video-seekbar:hover::-webkit-slider-thumb {
              transform: scale(1.2);
            }
            .custom-video-player video::-webkit-media-controls {
              display: none !important;
            }
          `}} />
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </motion.div>
  )
}
