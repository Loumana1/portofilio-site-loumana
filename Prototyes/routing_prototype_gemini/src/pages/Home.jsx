import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="full-height container" style={{ justifyContent: 'center', padding: '4rem 2rem' }}>
      <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        {/* Identity */}
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 700, 
          letterSpacing: '-0.04em',
          marginBottom: '1rem',
          lineHeight: 1
        }}>
          LOUMANA
        </h1>
        <p style={{ 
          color: 'var(--muted-color)', 
          fontSize: '1.2rem', 
          marginBottom: '4rem',
          maxWidth: '500px',
          lineHeight: 1.5
        }}>
          Artist / Producer / Technologist working with sound, code & systems.
        </p>

        {/* Routing / Navigation */}
        <nav style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          fontSize: '2rem',
          fontWeight: 300,
          letterSpacing: '-0.02em'
        }}>
          <Link to="/music" className="nav-link">MUSIC</Link>
          <Link to="/sound" className="nav-link">SOUND / TECH</Link>
          <Link to="/art" className="nav-link">ART INSTALLATIONS</Link>
          <Link to="/digital" className="nav-link">DIGITAL / SOFTWARE</Link>
        </nav>

        {/* Footer info */}
        <div style={{ marginTop: '5rem', fontSize: '0.85rem', color: 'var(--muted-color)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Brussels · Burkina Faso · 2026</span>
          <Link to="/about">Upcoming Dates / CV</Link>
        </div>
      </div>

      <style>{`
        .nav-link {
          display: inline-block;
          position: relative;
          width: fit-content;
        }
        .nav-link::before {
          content: '→';
          position: absolute;
          left: -30px;
          opacity: 0;
          color: var(--accent-color);
          transition: all 0.2s ease;
        }
        .nav-link:hover::before {
          opacity: 1;
          left: -40px;
        }
      `}</style>
    </div>
  );
};

export default Home;
