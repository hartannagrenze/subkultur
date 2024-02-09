import React from 'react';

function OrteListe({ orte, onOrtAuswahl }) {
  const handleOrtClick = (ort) => {
    onOrtAuswahl(ort);
  };
  

  return (
    <div>
      <h2>Orte</h2>
      {orte.map((ort, index) => (
        <div key={index} onClick={() => handleOrtClick(ort)}>
          {ort.name}
        </div>
      ))}
    </div>
  );
}
export default OrteListe;


