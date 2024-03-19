import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addTreemapModule from 'highcharts/modules/treemap';
import './App.css'; // Stelle sicher, dass du die CSS-Datei hast

// Highcharts Treemap-Modul anwenden
addTreemapModule(Highcharts);

const DataVisualization = ({ resultsData }) => {
  const [chartHeight, setChartHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setChartHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const treemapData = resultsData.map((data, index) => ({
    name: data.question, // Verwende die Titel direkt oder wandle die ID in einen lesbaren Titel um
    value: parseFloat(data.percentage),
    colorValue: index // Kann durch eine logische Zuordnung zu Farben ersetzt werden
  }));

  const options = {
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified', // Du kannst "stripes", "sliceAndDice", "squarified" oder "strip" versuchen
      data: treemapData
    }],
    title: {
      text: 'Euer Wunschfreiraum'
    },
    tooltip: {
      formatter: function () {
        return `${this.key}: ${this.point.value.toFixed(2)}%`;
      }
    },
    chart: {
      height: chartHeight
    }
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default DataVisualization;
