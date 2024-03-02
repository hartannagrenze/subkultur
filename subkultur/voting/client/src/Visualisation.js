import React, { useState, useEffect } from 'react';

const ArtisticDataVisualization = ({ averageData }) => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxValue = Math.max(...averageData.map(data => data.average));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {averageData.map(({ title, average }, index) => {
        const dynamicSizeFactor = Math.max(screenSize.width, screenSize.height) / 4.3;
        const size = (average / maxValue) * dynamicSizeFactor + 40;
        // Schriftgröße dynamisch anpassen. Hier als Beispiel: 1/10 der Quadratgröße
        const color = `hsl(${(average / maxValue) * 210}, 100%, 50%)`;
        return (
          <div key={index} title={title} style={{
            margin: '5px',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px', // Etwas Platz um den Text, um Überlauf zu verhindern
            overflow: 'hidden', // Verhindert Textüberlauf
            textOverflow: 'ellipsis', // Fügt "..." hinzu, wenn der Text überläuft
            whiteSpace: 'nowrap', // Hält den Text in einer einzigen Linie
          }}>
          </div>
        );
      })}
    </div>
  );
};

export default ArtisticDataVisualization;
