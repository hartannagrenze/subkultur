import React, { useEffect, useState } from 'react';
import DataVisualization from './Visualisation'; // Make sure the path is correct

const SurveyResults = () => {
    const [resultsData, setResultsData] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('http://localhost:3000/results');
                let data = await response.json();
    
                let processedData = Object.keys(data).filter(key => key !== 'totalVotes').map(questionKey => {
                    // Berechne die Prozentsätze basierend auf totalVotes
                    const percentage = ((data[questionKey] / data.totalVotes) * 100).toFixed(2);
                    return { question: questionKey, percentage };
                });
    
                setResultsData(processedData);
            } catch (error) {
                console.error('Failed to fetch survey results:', error);
            }
        };
        
        fetchResults();
    }, []);
    
    return (
        <div style={{ position: 'relative' }}>
            <DataVisualization resultsData={resultsData} />
            <img 
                src="/favicon.png" 
                width="130px" 
                alt="Logo" 
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1000,
                }} 
            />
        </div>
    );
};

export default SurveyResults;
