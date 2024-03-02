  import React, { useState, useEffect } from 'react';


const ArtisticDataVisualization = ({ averageData }) => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  function calculateColor(average, maxValue) {
    const ratio = average / maxValue;
    if (ratio < 0.5) {
      return '#E1C14A'; // Gelb für Werte unterhalb der Mitte
    } else if (ratio < 0.75) {
      // Berechnung für einen Zwischenwert könnte hier eingefügt werden
      return interpolateColor('#E1C14A', '#CF4637', (ratio - 0.5) * 4); // Interpoliert zwischen Gelb und Rot
    } else {
      return '#CF4637'; // Rot für Werte oberhalb von 75%
    }
  }

  // Eine einfache lineare Interpolationsfunktion zwischen zwei Hex-Farben basierend auf einem Faktor
  function interpolateColor(color1, color2, factor) {
    let result = "#", color1Base, color2Base, baseDifference;
    for (let i = 1; i <= 5; i += 2) { // Iteriere durch jede Farbkomponente
      color1Base = parseInt(color1.substr(i, 2), 16);
      color2Base = parseInt(color2.substr(i, 2), 16);
      baseDifference = Math.round(color1Base + (color2Base - color1Base) * factor).toString(16);
      result += ('00' + baseDifference).substr(baseDifference.length);
    }
    return result;
  }

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
  const totalHeight = screenSize.height; // Verwende die gesamte Bildschirmhöhe
  const aspectRatio = 4 / 3; // Beispiel: 4:3 Seitenverhältnis

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {averageData.map(({ title, average }, index) => {
        const heightRatio = average / maxValue;
        const rectHeight = totalHeight * (heightRatio /2.4); // Höhe des Rechtecks basierend auf dem Verhältnis
        const rectWidth = rectHeight * aspectRatio; // Breite des Rechtecks basierend auf dem Seitenverhältnis
        const fontSize = Math.max(rectHeight / 10, 12); // Dynamische Schriftgröße

        const color = calculateColor(average, maxValue);

        return (
          <div key={index} style={{
            margin: '5px',
            width: `${rectWidth}px`,
            height: `${rectHeight}px`,
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: 'white',
            whiteSpace: 'nowrap',
            fontSize: `${fontSize}px`,
          }}>
            {title}
          </div>
        );
      })}
    </div>
  );
};

export default ArtisticDataVisualization;
