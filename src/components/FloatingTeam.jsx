import React, { useState } from 'react';

const FloatingTeam = () => {
  const [activeShape, setActiveShape] = useState(null);

  const shapes = [
    {
      id: 'center',
      title: 'WEB\nDESIGNERS',
      x: 50,
      y: 27,
      size: 260,
      zIndex: 220,
      style: {
        backgroundColor: 'black',
        ringColor: 'black',
        textColor: 'white',
        particleColor: 'black',
        backgroundGradient: {
          color: 'rgba(0, 0, 0, 0.03)',
          stopOpacity: 70
        }
      }
    },
    {
      id: 'creative',
      title: 'CREATIVE\nPEOPLE',
      x: 35,
      y: 35,
      size: 320,
      zIndex: 10,
      style: {
        backgroundColor: '#00C78C',
        ringColor: '#00C78C',
        textColor: 'white',
        particleColor: '#00C78C',
        backgroundGradient: {
          color: 'rgba(0, 204, 126, 0.03)',
          stopOpacity: 70
        }
      }
    },
    {
      id: 'ux',
      title: 'UX & UI\nPROFESSIONALS',
      x: 66,
      y: 35,
      size: 360,
      zIndex: 10,
      style: {
        backgroundColor: '#00C78C',
        ringColor: '#00C78C',
        textColor: 'white',
        particleColor: '#00C78C',
        backgroundGradient: {
          color: 'rgba(0, 204, 126, 0.03)',
          stopOpacity: 70
        }
      }
    },
    {
      id: 'dream',
      title: 'DREAM\nREALIZERS',
      x: 50,
      y: 65,
      size: 300,
      zIndex: 10,
      style: {
        backgroundColor: '#00C78C',
        ringColor: '#00C78C',
        textColor: 'white',
        particleColor: '#00C78C',
        backgroundGradient: {
          color: 'rgba(0, 204, 126, 0.03)',
          stopOpacity: 70
        }
      }
    },
    {
      id: 'ekstra',
      title: 'EXTRA\nTEXT',
      x: 62,
      y: 70,
      size: 200,
      zIndex: 10,
      style: {
        backgroundColor: 'black',
        ringColor: 'black',
        textColor: 'white',
        particleColor: 'black',
        backgroundGradient: {
          color: 'rgba(0, 204, 126, 0.03)',
          stopOpacity: 70
        }
      }
    },
    {
      id: 'extra2',
      title: 'EXTRA\nTEXT',
      x: 37,
      y: 72,
      size: 200,
      zIndex: 10,
      style: {
        backgroundColor: 'black',
        ringColor: 'black',
        textColor: 'white',
        particleColor: 'black',
        backgroundGradient: {
          color: 'rgba(0, 204, 126, 0.03)',
          stopOpacity: 70
        }
      }
    },
  ];

  return (
    <div className="floating-container">
      <div className="shapes-wrapper">
        {shapes.map((shape, index) => (
          <div
            key={shape.id}
            className={`floating-shape ${activeShape === shape.id ? 'active2' : ''}`}
            style={{
              '--x': `${shape.x}%`,
              '--y': `${shape.y}%`,
              '--size': `${shape.size}px`,
              '--background-color': shape.style.backgroundColor,
              '--ring-color': shape.style.ringColor,
              '--text-color': shape.style.textColor,
              '--particle-color': shape.style.particleColor,
              '--gradient-color': shape.style.backgroundGradient.color,
              '--gradient-stop': `${shape.style.backgroundGradient.stopOpacity}%`,
              '--z-index': shape.zIndex,
              '--animation-delay': `${index * 0.5}s`,
              '--animation-duration': `${6 + index}s`
            }}
            onMouseEnter={() => setActiveShape(shape.id)}
            onMouseLeave={() => setActiveShape(null)}
          >
            <div className="shape-content">
              <div className="shape-background"></div>
              <div className="shape-circle"></div>
              <div className="shape-ring"></div>
              <div className="shape-ring-outer"></div>
              <div className="shape-text">{shape.title}</div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="shape-particle"
                  style={{ '--delay': `${i * 0.5}s` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingTeam;