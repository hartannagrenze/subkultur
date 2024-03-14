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
    const newResults = req.body.results;
    // Read the current results
    let currentResults = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Update the total and points per question
    currentResults.total += 30; // Assuming each survey always adds 30 points to the total
    for (const question in newResults) {
        currentResults[question] += newResults[question];
    }

    // Calculate the percentage for each question based on the new total
    Object.keys(currentResults).forEach(key => {
        if (key !== 'total') {
            currentResults[key] = (currentResults[key] / currentResults.total) * 100;
        }
    });

    // Write the updated results back to the JSON file
    fs.writeFileSync(dataPath, JSON.stringify(currentResults, null, 2), 'utf8');

    res.send({ message: 'Results successfully updated', updatedResults: currentResults });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
