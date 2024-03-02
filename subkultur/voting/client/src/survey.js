import React, { useState } from 'react';
import './App.css';

const Survey = () => {
    const [answers, setAnswers] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
    });
    let resultsWindow = null;
    
    const handleAnswerChange = (question, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question]: answer,
        }));
    };

    const areAllQuestionsAnswered = () => {
        return Object.values(answers).every(answer => answer !== '');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
            // Überprüfen, ob alle Fragen beantwortet wurden
    if (!areAllQuestionsAnswered()) {
        alert('Bitte beantworten Sie alle Fragen, bevor Sie die Umfrage absenden.');
        return; // Beendet die handleSubmit-Funktion, verhindert das Absenden
    }
        try {
            const response = await fetch('http://localhost:3000/update-results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ results: answers }),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse.message);
                // Reset answers or show a success message
            }
        } catch (error) {
            console.error('Fehler beim Senden der Antworten', error);
        }
                // Überprüfen, ob der Ergebnistab bereits geöffnet ist
                if (resultsWindow === null || resultsWindow.closed) {
                    // Ergebnisseite in einem neuen Tab öffnen, wenn kein Tab geöffnet ist oder der geöffnete Tab geschlossen wurde
                    resultsWindow = window.open('/results', 'resultsTab');
                } else {
                    // Den bereits geöffneten Tab fokussieren und aktualisieren
                    resultsWindow.focus();
                    resultsWindow.location.reload();
                }
    };

    const questions = [
        {
            title: "Gute Technik",
            text: "Die Qualität des Sounds und die gute Technik (Licht, Video) ist mir sehr wichtig."
        },
        {
            title: "Vielfältiges Musikprogramm",
            text: "Ein stabiles Booking bzw. ein vielfältiges Musikprogramm ist mir sehr wichtig.",

        },
        {
            title: "Raumgestaltung",
            text: "Der Raum muss liebevoll gestaltet sein und viel Platz für Kunst ermöglichen.",

        },
        {
            title: "Gutes Gastroangebot",
            text: "Ein solides Bar- und/oder Gastro-Konzept (vielfältiges und günstiges Angebot) ist mir sehr wichtig.",
        },
        {
            title: "Awereness, Inklusion und Barrierefreiheit",
            text: "Dieser Raum muss unbedingt Awareness, Inklusion und Barrierefreiheit im Mittelpunkt haben.",
        },
        {
            title: "Mitgestaltungsmöglichkeiten",
            text: "In diesem Raum muss ich mich unbedingt zuhause fühlen und diesen Raum selber mitgestalten dürfen.",
        },
    ];


    const answerOptions = ['strongly_agree', 'agree', 'somewhat_agree', 'somewhat_disagree', 'disagree', 'strongly_disagree'];
    const answerLabels = ['Stimme voll und ganz zu', 'Stimme zu', 'Stimme eher zu', 'Stimme eher nicht zu', 'Stimme nicht zu', 'Stimme gar nicht zu'];

    return (
        <form onSubmit={handleSubmit} className="survey-container">
            <h2>Was ist dir wichtig?</h2>
            {questions.map((question, qIndex) => (
        <div key={qIndex} className="survey-question">
            <p>{question.text}</p>
            {answerOptions.map((option, aIndex) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => handleAnswerChange(`question${qIndex + 1}`, option)}
                    className={`survey-button ${answers[`question${qIndex + 1}`] === option ? 'selected' : ''}`}
                >
                    {answerLabels[aIndex]}
                </button>
            ))}
        </div>
    ))}

            <button type="submit" className="submit-button">Absenden</button>
        </form>
    );
}
    

export default Survey;
