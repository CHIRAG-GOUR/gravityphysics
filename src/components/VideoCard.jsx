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
                <div style={{ 
                  width: 0, height: 0, 
                  borderTop: '15px solid transparent', 
                  borderBottom: '15px solid transparent', 
                  borderLeft: '25px solid #fff',
                  marginLeft: '5px'
                }} />
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
                  padding: '2rem 1.5rem 1rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  zIndex: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Play/Pause */}
                    <button onClick={togglePlay} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
                      {isPlaying ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <div style={{ width: '4px', height: '18px', background: '#fff', borderRadius: '2px' }} />
                          <div style={{ width: '4px', height: '18px', background: '#fff', borderRadius: '2px' }} />
                        </div>
                      ) : (
                        <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '14px solid #fff' }} />
                      )}
                    </button>

                    {/* Volume */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="volume-control">
                      <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 0 }}>
                        {isMuted || volume === 0 ? '🔇' : '🔊'}
                      </button>
                      <input 
                        type="range" min="0" max="1" step="0.1" 
                        value={volume} onChange={handleVolumeChange}
                        style={{ width: '60px', height: '4px', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Time */}
                    <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 500, fontFamily: 'monospace' }}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Speed */}
                    <button 
                      onClick={changeSpeed}
                      style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        borderRadius: '4px', 
                        color: '#fff', 
                        fontSize: '0.75rem', 
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        minWidth: '45px'
                      }}
                    >
                      {playbackSpeed}x
                    </button>

                    {/* Fullscreen */}
                    <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.1rem' }}>
                      {isFullscreen ? '🏁' : '🔲'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <style dangerouslySetInnerHTML={{ __html: `
            .video-seekbar::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 14px;
              height: 14px;
              background: #fff;
              border-radius: 50%;
              box-shadow: 0 0 10px rgba(0,0,0,0.5);
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
