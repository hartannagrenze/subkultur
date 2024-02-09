import React from 'react';
import './App.css';

function OrteListe({ orte, onOrtAuswahl }) {
  const handleOrtClick = (ort) => {
    onOrtAuswahl(ort);
  };
  

  return (
    <div>
      {orte.map((ort, index) => (
        <div key={index} onClick={() => handleOrtClick(ort)}>
        <div className='liste-marker'>{ort.name}</div>
        <div className='liste-adresse'>{ort.address}</div>
        </div>
      ))}
    </div>
  );
}
export default OrteListe;


