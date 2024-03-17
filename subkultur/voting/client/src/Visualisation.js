import React from 'react';
import { ReactP5Wrapper } from "react-p5-wrapper";

const DataVisualization = ({ resultsData }) => {
  const sketch = (p) => {
    const canvasWidth = 1300;
    const canvasHeight = 900;
    const totalArea = canvasWidth * canvasHeight;
    
    // Berechne die Gesamtfläche basierend auf den prozentualen Anteilen
    let rects = resultsData.map((data, index) => {
      const percentage = data.percentage;
      const area = totalArea * (percentage / 100);
      return {
        area: area,
        color: p.color(['#E7BF25', '#E0372C', '#73D7B3', '#73BF60', '#D072B6', '#2C69E0'][index % 6]),
        percentage: percentage
      };
    });

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop(); // Stoppt die draw-Schleife, da keine Animation benötigt wird
    };

    p.draw = () => {
      p.background(240);
      let x = 0, y = 0;
      let maxHeight = 0;

      rects.forEach(rect => {
        const rectWidth = Math.sqrt((rect.area * rect.percentage) / 100);
        const rectHeight = rect.area / rectWidth;

        if (x + rectWidth > canvasWidth) {
          x = 0;
          y += maxHeight;
          maxHeight = 0;
        }
        p.fill(rect.color);
        p.rect(x, y, rectWidth, rectHeight);

        x += rectWidth;
        if (rectHeight > maxHeight) {
          maxHeight = rectHeight;
        }
      });
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default DataVisualization;
