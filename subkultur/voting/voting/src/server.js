// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000; // Ändere den Port auf 8000

app.use(bodyParser.json());

// GET-Endpunkt zum Laden der Umfrageergebnisse
app.get('/umfrageErgebnisse', (req, res) => {
  fs.readFile('umfrageErgebnisse.json', (err, data) => {
    if (err) {
      console.error('Fehler beim Laden der Umfrageergebnisse:', err);
      res.status(500).send('Interner Serverfehler');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// PUT-Endpunkt zum Aktualisieren der Umfrageergebnisse
app.put('/umfragedaten.json', (req, res) => {
  const neueErgebnisse = req.body.umfrageErgebnisse; // Neue Umfrageergebnisse aus dem Request-Body
  fs.readFile('/umfragedaten.json', (err, data) => {
    if (err) {
      console.error('Fehler beim Laden der Umfrageergebnisse:', err);
      res.status(500).send('Interner Serverfehler');
      return;
    }
    let existierendeErgebnisse = [];
    try {
      existierendeErgebnisse = JSON.parse(data).umfrageErgebnisse; // Aktuelle Umfrageergebnisse aus der Datei
    } catch (parseError) {
      console.error('Fehler beim Parsen der Umfrageergebnisse:', parseError);
    }
    const aktualisierteErgebnisse = existierendeErgebnisse.concat(neueErgebnisse); // Kombiniere alte und neue Ergebnisse
    fs.writeFile('umfragedaten.json', JSON.stringify({ umfrageErgebnisse: aktualisierteErgebnisse }), (writeErr) => {
      if (writeErr) {
        console.error('Fehler beim Speichern der Umfrageergebnisse:', writeErr);
        res.status(500).send('Interner Serverfehler');
        return;
      }
      res.send('Umfrageergebnisse erfolgreich aktualisiert');
    });
  });
});

  
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
