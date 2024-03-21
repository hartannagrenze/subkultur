import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addTreemapModule from 'highcharts/modules/treemap';

addTreemapModule(Highcharts);

const DataVisualization = ({ resultsData, totalVotes }) => {
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
      question1: "#E4342F",
      question2: "#E7BF25",
      question3: "#F48C05",
      question4: "#168692",
      question5: "#36B160",
      question6: "#342D56",
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
  const totalParticipants = totalVotes / 30;

  const options = {
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      data: treemapData,
      dataLabels: {
        enabled: true,
        useHTML: true,
        align: 'left',
        verticalAlign: 'top',
        style: {
          fontSize: '30px', // Setzt eine konstante Schriftgröße
          fontFamily: 'Arial',
          color: 'black', // Oder eine andere Farbe, je nach Bedarf
          textOutline: false,
          fontStyle: 'italic',
          fontWeight: 50,
        },
        format: '{point.value:.0f}%<br>{point.name}',
      },
    }],
    plotOptions: {
      series: {
        animation: {
          duration: 1000, // Dauer der Animation in Millisekunden
          easing: 'easeOutSine' // Art der Animation (z.B. 'linear', 'easeInSine', 'easeInOutQuad', usw.)
        }
      }
    },  
    title: {
      text: 'Euer Wunschfreiraum',
      align: 'left',
      style: {
        color: 'black',
        fontFamily: 'Arial',
        fontSize: '100px',
        fontStyle: 'italic',
        fontWeight: '200', // 'bold' oder eine spezifische Zahl wie '700' für Schriftgewicht verwenden
        lineHeight: 'normal',
        textAlign: 'left',
        marginBottom: '40px',
      }
    },
    credits: {
      enabled: false // Entfernt das "Highcharts.com"-Label
    },
    tooltip: {
      formatter: function () {
        // Auch hier `.toFixed(0)` für 0 Nachkommastellen
        return `${this.key}: ${this.point.value.toFixed(0)}%`;
      }
    },
    chart: {
      height: chartHeight
    },
    subtitle: {
      text: `Bisher haben ${totalParticipants.toFixed(0)} Personen teilgenommen. Stimme auch am Touchbildschirm mit ab!`,
      align: 'left',
      style: {
        color: '#000',
        fontFamily: 'Arial',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: '800',
      }
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default DataVisualization;
