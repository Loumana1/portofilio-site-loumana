import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Music from './pages/Music';
import Placeholder from './pages/Placeholder';

function App() {
  return (
    <PlayerProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="music" element={<Music />} />
          <Route path="sound" element={<Placeholder title="Sound / Tech" desc="Audio software, DSP, Pure Data, spatial audio, instruments." />} />
          <Route path="art" element={<Placeholder title="Art Installations" desc="Installations, performances, sound art, exhibitions." />} />
          <Route path="digital" element={<Placeholder title="Digital / Software" desc="Web experiments, applications, digital works." />} />
          <Route path="about" element={<Placeholder title="About / Contact" desc="CV, dates, and contact information." />} />
        </Route>
      </Routes>
    </PlayerProvider>
  );
}

export default App;
