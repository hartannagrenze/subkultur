// App.js
import React, { useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import markerData from './marker.json';
import OrteListe from './OrteListe';
import Header from './Header.js';

export default function App() {
  const [selectedOrt, setSelectedOrt] = useState(null);
  const [showOrteListe, setShowOrteListe] = useState(false);
  
  const markers = markerData.map(marker => ({
    geocode: [marker.latitude, marker.longitude],
    popup: marker.name,
    image: marker.image,
    description: marker.description,
    address: marker.address,
    name: marker.name // Fügen Sie den Namen des Ortes zu den Marker-Daten hinzu
  }));

  const customIcon = new Icon({
    iconUrl: "./pin.png",
    iconSize: [40, 40],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-maker-cluster",
      iconSize: point(33, 33, true),
    });
  }

  return (
    <div className="app-container">
      <div className="burger-menu">
      <button onClick={() => setShowOrteListe(true)}>Orte Liste anzeigen</button>
      {showOrteListe && <OrteListe orte={markerData} />}
      </div>
      <Header />
      <MapContainer center={[48.1372, 11.5755]} zoom={25}>
        <TileLayer
          attribution="Stamen Toner"
          url='https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.jpg'>
        </TileLayer>

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>
                <div>
                  <h2 style={{ marginBottom: '5px' }}>{marker.popup}</h2>
                  <img src={marker.image} alt={marker.popup} style={{ width: '100px' }} />
                  <p>{marker.description}</p>
                  <p>{marker.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      {!selectedOrt && (
        <OrteListe orte={markers} onOrtAuswahl={setSelectedOrt} />
      )}
    </div>
  );
}
