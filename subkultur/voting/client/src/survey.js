import React, { useState } from 'react';
import './App.css';

const Survey = () => {
    const [answers, setAnswers] = useState({
        question1: 0,
        question2: 0,
        question3: 0,
        question4: 0,
        question5: 0,
        question6: 0,
    });
    const [totalPoints, setTotalPoints] = useState(30);

    let resultsWindow = null;
    const handleAnswerChange = (question, delta) => {
        setAnswers(prevAnswers => {
            const newAnswerValue = Math.max(prevAnswers[question] + delta, 0);
            
            // Berechne die vorläufige neue Gesamtpunktzahl, um zu prüfen, ob die Änderung zulässig ist
            let tempAnswers = { ...prevAnswers, [question]: newAnswerValue };
            const newTotalPoints = Object.values(tempAnswers).reduce((total, currentValue) => total + currentValue, 0);
    
            // Prüfe, ob die neue Gesamtpunktzahl das Limit von 30 Punkten überschreitet
            if (newTotalPoints > 30) {
                // Wenn das Hinzufügen von Punkten das Limit überschreiten würde, zeige eine Warnung und mache keine Änderung
                if (delta > 0) {
                    alert('Maximal 30 Punkte insgesamt erlaubt.');
                    return prevAnswers;
                }
                // Wenn Punkte entfernt werden, sollte diese Situation theoretisch nicht eintreten
            }
    
            // Wenn die neue Gesamtpunktzahl innerhalb des Limits liegt, aktualisiere den Zustand und die verbleibenden Punkte
            setTotalPoints(30 - newTotalPoints);
            return tempAnswers;
        });
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (totalPoints !== 0) {
            alert('Bitte verteilen Sie alle 30 Punkte, bevor Sie die Umfrage absenden.');
            return;
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

    return (
        <form onSubmit={handleSubmit} className="survey-container">
        <div className='umfrage'>Umfrage</div>
        <div className='untertext'>
        Verteile <span className="total-points">{totalPoints}</span> Punkte auf die verschiedenen Kategorien
        </div>
            {questions.map((question, qIndex) => (
                <div className="question-details">
                    <button className="question-button" type="button" onClick={() => handleAnswerChange(`question${qIndex + 1}`, -1)}>-</button>
                    <input className="question-input" type="number" readOnly value={answers[`question${qIndex + 1}`]} />
                    <button className="question-button" type="button" onClick={() => handleAnswerChange(`question${qIndex + 1}`, 1)}>+</button>
                    <div className='question-info' >
                        <div className="question-title">{question.title}</div>
                        <div>{question.text}</div>
                    </div>
                </div>
            ))}
            <button type="submit" className="submit-button">Absenden</button>
        </form>
    );
}

    
export default Survey;
