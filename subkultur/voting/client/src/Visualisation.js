import React from 'react';
import { ReactP5Wrapper } from "react-p5-wrapper";

const DataVisualization = ({ resultsData, totalVotes }) => {
  const sketch = (p) => {
    let canvasWidth = 1950;
    let canvasHeight = 1200;
    let images = [];
    let areas = [];
    let scrollTextX = 30;
    let peopleVoted = totalVotes/30;
    const elements = [
      {
        imagePath: '/technik1.png',
        title: 'TECHNIK',
        color: '#E4342F'
      },
      {
        imagePath: '/booking.png',
        title: 'BOOKING',
        color: '#36B160'
      },
      {
        imagePath: '/kunst.png',
        title: 'KUNST',
        color: '#342D56'
      },
      {
        imagePath: '/gastro.png',
        title: 'GASTRO',
        color: '#E7BF25'
      },
      {
        imagePath: '/aware.png',
        title: 'AWARENESS',
        color: '#168692'
      },
      {
        imagePath: '/gestaltung.png',
        title: 'MITGESTALTUNG',
        color: '#F48C05'
      },
    ];


    p.preload = () => {
      elements.forEach(element => {
        images.push(p.loadImage(element.imagePath));
      });
    };

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(30);
      calculateAreas();
    };

    function calculateAreas() {
      let totalArea = canvasWidth * canvasHeight;
      resultsData.forEach((data, index) => {
        const area = totalArea * (data.percentage / 100);
        areas.push({
          area: area,
          element: elements[index % elements.length],
          scrollOffsetX: p.random(0, 1000),
          scrollOffsetY: p.random(0, 1000),
          scrollSpeedX: p.random(0.00005, 0.0001), // Langsamere Geschwindigkeit
          scrollSpeedY: p.random(0.00005, 0.0001), // Langsamere Geschwindigkeit
          zoomFactor: 1 // Größerer Zoomfaktor
        });
      });
    };
    
    p.draw = () => {
      p.background(255);
      if (totalVotes === 0) {
        return; // Verlässt die draw-Funktion frühzeitig, wenn keine Votes vorhanden sind
      }
      let currentX = 0;
      let currentY = 0;
      let maxHeight = 0;
      p.background(255);
    
      areas.forEach((area, index) => {
        const { element, scrollOffsetX, scrollOffsetY, zoomFactor } = area;
        const img = images[index % images.length];
        let rectWidth = Math.min(area.area / canvasHeight, canvasWidth);
        let rectHeight = area.area / rectWidth;
    
        // Stellt sicher, dass das Bild das Rechteck vollständig ausfüllt
        let imgZoomWidth = img.width * zoomFactor;
        let imgZoomHeight = img.height * zoomFactor;
    
        // Begrenzt die Scroll-Bewegung, um leere Bereiche zu vermeiden
        let maxScrollX = imgZoomWidth - rectWidth;
        let maxScrollY = imgZoomHeight - rectHeight;
        let scrollX = (Math.sin(p.millis() * 0.0005 + scrollOffsetX) + 1) / 2 * maxScrollX;
        let scrollY = (Math.cos(p.millis() * 0.0005 + scrollOffsetY) + 1) / 2 * maxScrollY;
    
        p.image(img, currentX, currentY, rectWidth, rectHeight, scrollX, scrollY, rectWidth, rectHeight);
        let percentage = resultsData[index].percentage;
        let roundedPercentage = Math.round(percentage)
        // Text und Farbüberblendung
        p.fill(element.color);
        p.blendMode(p.DIFFERENCE);
        p.rect(currentX, currentY, rectWidth, rectHeight);
        p.blendMode(p.BLEND);
        drawVerticalText(`${element.title} ${roundedPercentage}%`, currentX + 10, currentY + 20, p);
        
        // Zeichnet den durchlaufenden Text am oberen Rand
          // Texteinstellungen
          // Hintergrundbalken konstant am unteren Rand zeichnen
  p.fill('black'); // Dunkler Hintergrund für bessere Lesbarkeit des weißen Textes
  p.rect(0, canvasHeight - 55, canvasWidth, 100); // Der Balken bedeckt den unteren Teil des Canvas
  
  // Texteinstellungen
  p.fill(255); // Weiße Textfarbe für Kontrast
  p.textSize(50);
  p.textFont('Arial');
  p.textStyle(p.BOLD); // Ändern Sie es zu NORMAL, wenn Sie keinen kursiven Text wünschen
  let scrollingText = `Das sind eure Prioritäten bei Freiräumen. Bisher haben ${peopleVoted} Leute gevotet. Gebe auch du deine Stimme am Touchbildschirm ab!`.toUpperCase();

  // Text zweimal zeichnen für wiederholenden Effekt
  let textWidth = p.textWidth(scrollingText) + 20; // Etwas zusätzlichen Platz hinzufügen
  p.text(scrollingText, scrollTextX, canvasHeight - 10);
  p.text(scrollingText, scrollTextX + textWidth, canvasHeight - 10);
  
          // Textposition aktualisieren
          scrollTextX -= 1; // Bewegt den Text 2 Pixel nach links pro Frame
          if (scrollTextX < -textWidth)  {
            scrollTextX = 0; // Textposition zurücksetzen, wenn der Text komplett durchgelaufen ist
          }
        currentX += rectWidth;
        if (rectHeight > maxHeight) {
          maxHeight = rectHeight;
        }
        if (currentX >= canvasWidth) {
          currentX = 0;
          currentY += maxHeight;
          maxHeight = 0;
        }
      });
    };
    
    function drawVerticalText(text, x, y, p) {
      p.push();
      p.fill(255); // Weißer Text
      p.textSize(80);
      p.textFont('Arial');
      p.textStyle(p.BOLD);
      p.translate(x, y);
      p.rotate(p.HALF_PI); // Dreht den Text um 90 Grad
      p.text(text, 0, 0); 
      p.pop();
    }
    
  }    

  return <ReactP5Wrapper sketch={sketch} />;
};

export default DataVisualization;
