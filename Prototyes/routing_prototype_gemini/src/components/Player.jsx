import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const Player = () => {
  const { currentTrack, isPlaying, playTrack } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(10, 10, 10, 0.85)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--border-color)',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000
    }} className="animate-fade-in">
      
      {/* Track Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--border-color)', borderRadius: '4px' }}></div>
        <div>
          <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{currentTrack.title}</h4>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted-color)' }}>{currentTrack.bpm} BPM • {currentTrack.genre}</p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'center' }}>
        <button style={btnStyle}><SkipBack size={20} /></button>
        <button 
          style={{ ...btnStyle, backgroundColor: 'var(--text-color)', color: 'var(--bg-color)', padding: '0.5rem', borderRadius: '50%' }}
          onClick={() => playTrack(currentTrack)}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button style={btnStyle}><SkipForward size={20} /></button>
      </div>

      {/* Utilities */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'flex-end' }}>
        <Volume2 size={18} color="var(--muted-color)" />
        <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '2px' }}>
          <div style={{ width: '60%', height: '100%', backgroundColor: 'var(--accent-color)', borderRadius: '2px' }}></div>
        </div>
        <button style={{
          background: 'none',
          border: '1px solid var(--accent-color)',
          color: 'var(--accent-color)',
          padding: '0.4rem 1rem',
          borderRadius: '4px',
          fontSize: '0.8rem',
          cursor: 'pointer'
        }}>
          Purchase ${currentTrack.price}
        </button>
      </div>
    </div>
  );
};

const btnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-color)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default Player;
