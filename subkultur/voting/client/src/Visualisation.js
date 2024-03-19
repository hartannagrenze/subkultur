import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addTreemapModule from 'highcharts/modules/treemap';

addTreemapModule(Highcharts);

const DataVisualization = ({ resultsData }) => {
  const [chartHeight, setChartHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setChartHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Funktion, die Frage-IDs Titeln zuordnet
  const getQuestionTitle = (questionId) => {
    const titles = {
      question1: "Technik",
      question2: "Booking",
      question3: "Kunst",
      question4: "Gastro",
      question5: "Awareness",
      question6: "Mitgestaltung",
    };
    return titles[questionId] || questionId;
  };

  // Funktion, die Frage-IDs Farben zuordnet
  const getQuestionColor = (questionId) => {
    const colors = {
      question1: "#FF6347",
      question2: "#FFD700",
      question3: "#FF8C00",
      question4: "#1E90FF",
      question5: "#32CD32",
      question6: "#8A2BE2",
    };
    return colors[questionId] || '#FFFFFF'; // Standardfarbe als Fallback
  };

  // Adapting the given data to the format expected by Highcharts
  // Hier wird getQuestionTitle verwendet, um die Titel zuzuweisen
  // Und getQuestionColor für die Farben
  const treemapData = resultsData.map(data => ({
    name: getQuestionTitle(data.question),
    value: parseFloat(data.percentage),
    color: getQuestionColor(data.question), // Farbe direkt zuweisen
  }));

  const options = {
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
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
