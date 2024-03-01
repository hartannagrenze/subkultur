import React, { useEffect, useState } from 'react';
import ArtisticDataVisualization from './Visualisation'; // Adjust the import path as necessary

const SurveyResults = () => {
    const [averageData, setAverageData] = useState([]);
    const answerWeights = {
        strongly_agree: 5,
        agree: 4,
        somewhat_agree: 3,
        somewhat_disagree: 2,
        disagree: 1,
        strongly_disagree: 0
    };
    

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('http://localhost:3000/results');
                const data = await response.json();
                const processedData = Object.keys(data).map(questionKey => {
                    const answers = data[questionKey];
                    let weightedSum = 0;
                    let totalResponses = 0;
                    
                    Object.entries(answers).forEach(([answerKey, count]) => {
                        const weight = answerWeights[answerKey];
                        weightedSum += weight * count;
                        totalResponses += count;
                    });
        
                    const average = totalResponses > 0 ? weightedSum / totalResponses : 0;
                    return { question: questionKey, average };
                });
                setAverageData(processedData);
            } catch (error) {
                console.error('Failed to fetch survey results:', error);
            }
        };
        
        fetchResults();
    }, );


    return (
        <div>
            <h2>Survey Results Visualization</h2>
            <ArtisticDataVisualization averageData={averageData} />
        </div>
    );
};

export default SurveyResults;
