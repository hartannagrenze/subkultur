const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;
const dataPath = './data/surveyResults.json'; 
app.use(cors());
app.use(bodyParser.json());

app.get('/results', (req, res) => {
    try {
        const currentResults = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        res.json(currentResults);
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.post('/update-results', (req, res) => {
    const newResults = req.body.results; // Dies sollte ein Objekt mit Punkten sein, nicht Prozentsätzen
    let currentResults = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Sicherstellen, dass totalVotes korrekt initialisiert und aktualisiert wird
    currentResults.totalVotes = (currentResults.totalVotes || 0) + Object.values(newResults).reduce((sum, value) => sum + value, 0);

    // Punkte für jede Frage direkt hinzufügen, ohne Umrechnung
    for (const question in newResults) {
        if (!currentResults[question]) {
            currentResults[question] = 0; // Initialisiere mit 0, wenn noch nicht vorhanden
        }
        currentResults[question] += newResults[question];
    }

    fs.writeFileSync(dataPath, JSON.stringify(currentResults, null, 2), 'utf8');
    res.send({ message: 'Results successfully updated', updatedResults: currentResults });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
