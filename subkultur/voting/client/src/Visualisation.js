import React from 'react';

const ArtisticDataVisualization = ({ averageData }) => {
  const maxValue = Math.max(...averageData.map(data => data.average));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {averageData.map(({ question, average }, index) => {
        const size = (average / maxValue) * 100 + 50; // Calculate size based on average
        const color = `hsl(${(average / maxValue) * 120}, 100%, 50%)`; // Calculate color based on average
        return (
          <div key={index} title={question} style={{
            margin: '10px',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
            verticalAlign: 'middle',
            lineHeight: `${size}px`,
          }}>
            {average.toFixed(1)}
          </div>
        );
      })}
    </div>
  );
};

export default ArtisticDataVisualization;
