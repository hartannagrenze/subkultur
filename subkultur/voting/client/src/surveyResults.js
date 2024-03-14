import React, { useEffect, useState } from 'react';
import DataVisualization from './Visualisation'; // Make sure the path is correct

const SurveyResults = () => {
    const [resultsData, setResultsData] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('http://localhost:3000/results');
                const data = await response.json();
                delete data.total; // Remove the total so we don't try to display it as a question

                const processedData = Object.keys(data).map(questionKey => {
                    const percentage = data[questionKey]; // Use the percentage from the server
                    return { question: questionKey, percentage }; // The server should already provide the percentage
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
