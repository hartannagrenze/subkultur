import React, { useEffect, useState } from 'react';

const SurveyResults = () => {
    const [averageData, setAverageData] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const response = await fetch('http://localhost:3000/results');
            const data = await response.json();
            const processedData = Object.keys(data).map(question => {
                const answers = data[question];
                const sum = Object.keys(answers).reduce((acc, key) => acc + (answers[key] * (key === 'strongly_agree' ? 5 : key === 'agree' ? 4 : key === 'somewhat_agree' ? 3 : key === 'somewhat_disagree' ? 2 : key === 'disagree' ? 1 : 0)), 0);
                const totalCount = Object.values(answers).reduce((acc, cur) => acc + cur, 0);
                const average = totalCount > 0 ? (sum / totalCount) : 0;
                return { question, average };
            });
            setAverageData(processedData);
        };

        fetchResults();
    }, []);

    return (
        <div>
            <h2>Ergebnisse der Umfrage</h2>
            {averageData.map(({ question, average }) => (
                <div key={question} style={{ margin: '10px 0' }}>
                    <div>{question} (Durchschnitt: {average.toFixed(2)})</div>
                    <div style={{ width: `${average * 20}px`, height: '20px', backgroundColor: 'blue', transition: 'width 0.3s ease' }}></div>
                </div>
            ))}
        </div>
    );
};

export default SurveyResults;
