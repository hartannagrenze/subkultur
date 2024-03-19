import React, { useEffect, useState } from 'react';
import DataVisualization from './Visualisation'; // Make sure the path is correct

// In deiner Komponente, die DataVisualization einbindet
const SurveyResults = () => {
    const [resultsData, setResultsData] = useState([]);
    const [totalVotes, setTotalVotes] = useState(0);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('http://localhost:3000/results');
                const data = await response.json();
                
                // Berechne totalVotes basierend auf der erhaltenen Antwort
                const total = data.totalVotes;
                
                let processedData = Object.keys(data).filter(key => key !== 'totalVotes').map(questionKey => {
                    const percentage = (data[questionKey] / total) * 100;
                    return { question: questionKey, percentage: percentage.toFixed(2) };
                });
                
                setResultsData(processedData);
                setTotalVotes(total); // Setze totalVotes im State
            } catch (error) {
                console.error('Failed to fetch survey results:', error);
            }
        };
        
        fetchResults();
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <DataVisualization resultsData={resultsData} totalVotes={totalVotes} />
            {/* Andere Komponenten oder Inhalt */}
        </div>
    );
};

export default SurveyResults;
