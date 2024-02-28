import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const SurveyResults = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const fetchResults = async () => {
            const response = await fetch('http://localhost:3000/results');
            const data = await response.json();
            // Transformieren Sie `data` in das Format, das von `react-chartjs-2` benötigt wird
            setChartData({
                labels: Object.keys(data),
                datasets: [{
                    label: 'Umfrageergebnisse',
                    data: Object.values(data).map(result => result.average), // Annahme: `average` ist der gewünschte Wert
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }],
            });
            // Setzen Sie hier weitere Optionen, falls nötig
            setChartOptions({
                scales: {
                    y: { // Beachten Sie, dass dies für Chart.js v3+ gilt. Für v2 könnte es `yAxes` sein.
                        beginAtZero: true,
                    },
                },
            });
        };

        fetchResults();
    }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur beim Mounten der Komponente ausgeführt wird

    return (
        <div>
            <h2>Ergebnisse der Umfrage</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default SurveyResults;
