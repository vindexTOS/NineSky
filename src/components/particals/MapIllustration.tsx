import React from 'react';

const MapIllustration = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/World_map_blank_without_borders.svg/1024px-World_map_blank_without_borders.svg.png"
        alt="World Map"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          padding: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '5px',
        }}
      >
        <h2>World Map Illustration</h2>
      </div>
    </div>
  );
};

export default MapIllustration;