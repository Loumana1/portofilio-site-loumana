import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Player from './Player';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Minimal Header for subpages */}
      {!isHome && (
        <header style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.2rem' }}>LOUMANA</Link>
          <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--muted-color)' }}>
            <Link to="/music" style={{ color: location.pathname === '/music' ? 'var(--text-color)' : '' }}>MUSIC</Link>
            <Link to="/sound" style={{ color: location.pathname === '/sound' ? 'var(--text-color)' : '' }}>SOUND</Link>
            <Link to="/art" style={{ color: location.pathname === '/art' ? 'var(--text-color)' : '' }}>ART</Link>
            <Link to="/digital" style={{ color: location.pathname === '/digital' ? 'var(--text-color)' : '' }}>DIGITAL</Link>
          </nav>
        </header>
      )}

      <main style={{ flex: 1, paddingBottom: '80px' }}>
        <Outlet />
      </main>

      <Player />
    </div>
  );
};

export default Layout;
