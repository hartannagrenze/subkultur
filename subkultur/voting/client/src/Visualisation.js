import React from 'react';
import { ReactP5Wrapper } from "react-p5-wrapper";
const colors = ['#FF6347', '#FFD700', '#FF8C00', '#1E90FF', '#32CD32', '#8A2BE2']; // Colors for each question



const DataVisualization = ({ resultsData }) => {
  const sketch = (p) => {
    let rects = [];
    const canvasWidth = 1300;
    const canvasHeight = 900;
    const areaMultiplier = 200000; // Bestimmt die Größe der Rechtecke

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.noStroke();
      // Initialisiere Rechtecke mit sicherer Platzierung
      resultsData.forEach((data, i) => {
        let initialArea = areaMultiplier * (data.percentage / 100);
        let rectWidth = p.random(50, 100);
        let rectHeight = initialArea / rectWidth;
        rects.push({
          x: p.random(0, canvasWidth - rectWidth),
          y: p.random(0, canvasHeight - rectHeight),
          width: rectWidth,
          height: rectHeight,
          area: initialArea,
          xSpeed: p.random(-2, 2),
          ySpeed: p.random(-2, 2),
          color: p.color(colors[i % colors.length])
        });
      });
    };
  
    p.draw = () => {
      p.background(240);
      rects.forEach((rect) => {
        // Zeichne das Rechteck
        p.fill(rect.color);
        p.rect(rect.x, rect.y, rect.width, rect.height);

        // Update Position mit Kollisionsvermeidung
        let newX = rect.x + rect.xSpeed;
        let newY = rect.y + rect.ySpeed;

        // Verhindere das Verlassen des Canvas
        if (newX <= 0 || newX + rect.width >= canvasWidth) {
          rect.xSpeed *= -1;
        } else {
          rect.x = newX;
        }

        if (newY <= 0 || newY + rect.height >= canvasHeight) {
          rect.ySpeed *= -1;
        } else {
          rect.y = newY;
        }

        // Dynamisch ändere das Seitenverhältnis, während die Fläche gleich bleibt
        rect.width += p.sin(p.frameCount * 0.03) * 2;
        rect.height = rect.area / rect.width;
        // Anpassung, um sicherzustellen, dass die Rechtecke im Canvas bleiben
        rect.x = p.constrain(rect.x, 0, canvasWidth - rect.width);
        rect.y = p.constrain(rect.y, 0, canvasHeight - rect.height);
      });
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default DataVisualization;
