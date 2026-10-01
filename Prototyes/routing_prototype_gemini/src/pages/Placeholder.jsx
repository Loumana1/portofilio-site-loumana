import React from 'react';

const Placeholder = ({ title, desc }) => {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{title}</h1>
      <p style={{ color: 'var(--muted-color)', fontSize: '1.2rem', maxWidth: '600px' }}>
        {desc}
      </p>
      
      <div style={{ 
        marginTop: '3rem', 
        height: '400px', 
        border: '1px dashed var(--border-color)', 
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted-color)'
      }}>
        [ {title} Content Archive ]
      </div>
    </div>
  );
};

export default Placeholder;
