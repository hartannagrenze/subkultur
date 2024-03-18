import React from 'react';
import { ReactP5Wrapper } from "react-p5-wrapper";

const DataVisualization = ({ resultsData }) => {
  const sketch = (p) => {
    const canvasWidth = 1300;
    const canvasHeight = 900;
    const totalArea = canvasWidth * canvasHeight;

    let subRects = []; // Array zum Speichern der kleineren Rechtecke

    // Berechne die Gesamtfläche basierend auf den prozentualen Anteilen
    resultsData.forEach((data, index) => {
      const percentage = data.percentage;
      const area = totalArea * (percentage / 100);
      const color = p.color(['#E7BF25', '#E0372C', '#73D7B3', '#73BF60', '#D072B6', '#2C69E0'][index % 6]);

      // Bestimme die Anzahl der kleinen Rechtecke pro Farbe
      const numOfSubRects = Math.ceil(percentage); // oder jede andere Logik
      const subArea = area / numOfSubRects; // Fläche für jedes kleine Rechteck

      for (let i = 0; i < numOfSubRects; i++) {
        subRects.push({
          width: Math.sqrt(subArea),
          height: Math.sqrt(subArea),
          color: color
        });
      }
    });

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop(); // Stoppt die draw-Schleife, da keine Animation benötigt wird
    };

    p.draw = () => {
      p.background(240);
      let x = 0, y = 0;
      let rowHeight = 0;

      subRects.forEach((subRect, index) => {
        // Überprüfe, ob wir am Rand des Canvas sind
        if (x + subRect.width > canvasWidth) {
          x = 0; // Zurück zum linken Rand
          y += rowHeight; // Gehe eine Reihe nach unten
          rowHeight = 0; // Zurücksetzen der Zeilenhöhe
        }

        // Zeichne das kleine Rechteck
        p.fill(subRect.color);
        p.rect(x, y, subRect.width, subRect.height);

        // Aktualisiere x für das nächste Rechteck
        x += subRect.width;

        // Aktualisiere die maximale Zeilenhöhe
        if (subRect.height > rowHeight) {
          rowHeight = subRect.height;
        }
      });
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default DataVisualization;
