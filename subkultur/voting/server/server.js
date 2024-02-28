const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data', 'surveyResults.json');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());



app.post('/update-results', (req, res) => {
    const newResults = req.body.results;
    // Lese die aktuellen Ergebnisse
    let currentResults = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Aktualisiere die Ergebnisse basierend auf der neuen Abstimmung
    for (const question in newResults) {
        if (currentResults[question] && currentResults[question][newResults[question]] !== undefined) {
            currentResults[question][newResults[question]] += 1;
        }
    }

    // Schreibe die aktualisierten Ergebnisse zurück in die JSON-Datei
    fs.writeFileSync(dataPath, JSON.stringify(currentResults, null, 2), 'utf8');

    res.send({ message: 'Ergebnisse erfolgreich aktualisiert', updatedResults: currentResults });
});


// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
