import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause } from 'lucide-react';

const DUMMY_BEATS = [
  { id: '1', title: 'Midnight City', bpm: 140, genre: 'AFRO / BASS', price: '150' },
  { id: '2', title: 'Broken Signals', bpm: 128, genre: 'BROKEN', price: '200' },
  { id: '3', title: 'Dusty Grooves', bpm: 95, genre: 'HIP HOP', price: '100' },
  { id: '4', title: 'Neon Pulse', bpm: 160, genre: 'ELECTRONIC', price: '180' },
];

const Music = () => {
  const { currentTrack, isPlaying, playTrack } = usePlayer();

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', letterSpacing: '-0.02em' }}>EXCLUSIVE BEATS</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {DUMMY_BEATS.map((beat) => {
          const isThisPlaying = isPlaying && currentTrack?.id === beat.id;

          return (
            <div 
              key={beat.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 2fr 1fr 1fr auto',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                backgroundColor: currentTrack?.id === beat.id ? 'rgba(255,255,255,0.02)' : 'transparent',
                transition: 'background-color 0.2s ease'
              }}
            >
              <button 
                onClick={() => playTrack(beat)}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isThisPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              
              <div style={{ fontWeight: 600 }}>{beat.title}</div>
              <div style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>{beat.bpm} BPM</div>
              <div style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>{beat.genre}</div>
              <div style={{ fontWeight: 600 }}>${beat.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Music;
