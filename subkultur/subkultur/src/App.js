import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import markerData from './marker.json';
import OrteListe from './OrteListe';
import Header from './Header.js';

export default function App() {
  const [selectedOrt, setSelectedOrt] = useState(null);
  const [showOrteListe, setShowOrteListe] = useState(false);
  const mapRef = useRef(null);
  const [visitedCounts, setVisitedCounts] = useState(() => {
    // Initialize visited counts from localStorage, or empty object if not available
    const savedCounts = localStorage.getItem('visitedCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  const markers = markerData.map(marker => ({
    id: marker.id,
    geocode: [marker.latitude, marker.longitude],
    popup: marker.name,
    image: marker.image,
    description: marker.description,
    address: marker.address,
    name: marker.name,
    markerimage: marker.markerimage,
    visitedCount: visitedCounts[marker.id] || 0
  }));

  useEffect(() => {
    if (mapRef.current && selectedOrt && selectedOrt.geocode) {
      mapRef.current.setView(selectedOrt.geocode);
    }
  }, [selectedOrt]);

  const handleOrtClick = (ort) => {
    setSelectedOrt(ort);
    setShowOrteListe(false);
  };

  const handleVote = (markerId, increment) => {
    setVisitedCounts(prevCounts => {
      const newCounts = {
        ...prevCounts,
        [markerId]: (prevCounts[markerId] || 0) + increment
      };
      // Save updated counts to localStorage
      localStorage.setItem('visitedCounts', JSON.stringify(newCounts));
      return newCounts;
    });
  };

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  return (
    <div className="app-container">
      <Header />
      {showOrteListe && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-btn" onClick={() => setShowOrteListe(false)}>X</button>
            <OrteListe orte={markers} onOrtAuswahl={handleOrtClick} />
          </div>
        </div>
      )}
      <div className="burger-menu">
        <button onClick={() => setShowOrteListe(true)}>Orte Liste anzeigen</button>
      </div>
      <MapContainer center={[48.1372, 11.5755]} zoom={25} ref={mapRef}>
        <TileLayer
          attribution="Stamen Toner"
          url='https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.jpg'>
        </TileLayer>

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker, index) => {
            const customIcon = new divIcon({
              html: `<img src="${marker.markerimage}" style="width: 50px; height: 50px; background-color: transparent; border: none;" />`,
              iconSize: [50, 50],
            });

            return (
              <Marker key={index} position={marker.geocode} icon={customIcon}>
                <Popup>
                  <div>
                    <h2 style={{ marginBottom: '5px' }}>{marker.popup}</h2>
                    <img src={marker.image} alt={marker.popup} style={{ width: '100px' }} />
                    <p>{marker.description}</p>
                    <p>{marker.address}</p>
                    <p>Visited Count: {visitedCounts[marker.id]}</p>
                    <button onClick={() => handleVote(marker.id, 1)}>I've been here</button>
                    <button onClick={() => handleVote(marker.id, -1)}>Not visited yet</button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
