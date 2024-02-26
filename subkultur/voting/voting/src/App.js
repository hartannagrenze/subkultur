import React, { useState } from 'react';
import UmfrageFragen from './umfrage.js';
import BubbleChart from './bubble.js';

const App = () => {
  // Zustand für die Umfrageergebnisse
  const [umfrageErgebnisse, setUmfrageErgebnisse] = useState([]);
  const handleAbsenden = async () => {
    try {
      const umfrageErgebnisse = JSON.parse(localStorage.getItem('umfrageErgebnisse'));
      await fetch('/umfragedaten.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ umfrageErgebnisse }),
      });
      console.log('Umfrageergebnisse wurden erfolgreich gesendet!');
    } catch (error) {
      console.error('Fehler beim Senden der Umfrageergebnisse:', error);
    }
  };
  
  // Funktion zur Aktualisierung der Umfrageergebnisse
  const handleAntwortSelected = (frageIndex, antwortIndex) => {
    const neueErgebnisse = [...umfrageErgebnisse];
    neueErgebnisse[frageIndex] = antwortIndex;
    setUmfrageErgebnisse(neueErgebnisse);
    
    // Zwischenspeichern der Umfrageergebnisse in localStorage
    localStorage.setItem('umfrageErgebnisse', JSON.stringify(neueErgebnisse));
  };

  return (
    <div>
      <h1>Fibonacci Umfrage</h1>
      <UmfrageFragen onAntwortSelected={handleAntwortSelected} />
      <BubbleChart data={umfrageErgebnisse} />
      <button onClick={handleAbsenden}>Umfrage sichern</button>
    </div>
  );
};

export default App;
