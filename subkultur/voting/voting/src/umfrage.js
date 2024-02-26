// UmfrageFragen.js
import React from 'react';

const UmfrageFragen = ({ onAntwortSelected }) => {
  const fragen = [
    "Die Qualität des Sounds und die gute Technik (Licht, Video) ist mir sehr wichtig.",
    "Ein stabiles Booking bzw. ein vielfältiges Musikprogramm ist mir sehr wichtig.",
    "Der Raum muss liebevoll gestaltet sein und viel Platz für Kunst ermöglichen.",
    "Ein solides Bar- und/oder Gastro-Konzept (vielfältiges und günstiges Angebot) ist mir sehr wichtig.",
    "Dieser Raum muss unbedingt Awareness, Inklusion und Barrierefreiheit im Mittelpunkt haben.",
    "In diesem Raum muss ich mich unbedingt zuhause fühlen und diesen Raum selber mitgestalten dürfen."
  ];

  return (
    <div>
      {fragen.map((frage, index) => (
        <div key={index}>
          <p>{frage}</p>
          <button onClick={() => onAntwortSelected(index, 0)}>Stimme voll und ganz zu</button>
          <button onClick={() => onAntwortSelected(index, 1)}>Stimme zu</button>
          <button onClick={() => onAntwortSelected(index, 2)}>Stimme eher zu</button>
          <button onClick={() => onAntwortSelected(index, 3)}>Stimme eher nicht zu</button>
          <button onClick={() => onAntwortSelected(index, 4)}>Stimme nicht zu</button>
          <button onClick={() => onAntwortSelected(index, 5)}>Stimme gar nicht zu</button>
        </div>
      ))}
    </div>
  );
};

export default UmfrageFragen;
