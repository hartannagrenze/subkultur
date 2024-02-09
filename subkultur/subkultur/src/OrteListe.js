import React from 'react';

function OrteListe({ orte, onOrtAuswahl }) {
  const handleOrtClick = (ort) => {
    onOrtAuswahl(ort);
  };

  return (
    <div>
      <h2>Orte</h2>
      <ul>
        {orte.map((ort, index) => (
          <li key={index} onClick={() => handleOrtClick(ort)}>
            {ort.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrteListe;


