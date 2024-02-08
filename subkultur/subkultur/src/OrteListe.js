// OrteListe.js
import React from 'react';

function OrteListe({ orte, onOrtAuswahl }) {
  return (
    <div>
      <h2>Orte</h2>
      <ul>
        {orte.map((ort, index) => (
          <li key={index} onClick={() => onOrtAuswahl(ort)}>
            {ort.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrteListe;
