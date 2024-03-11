import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon, Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import markerData from './marker.json';
import OrteListe from './OrteListe.js';
import Header from './Header.js';

export default function App() {
  const [selectedOrt, setSelectedOrt] = useState(null);
  const [showOrteListe, setShowOrteListe] = useState(false);
  const markerRefs = useRef({}); // Schritt 1: Map für Marker-Referenzen
  
  const mapRef = useRef(null);
  

  const markers = markerData.map(marker => ({
    id: marker.id,
    geocode: [marker.latitude, marker.longitude],
    popup: marker.name,
    image: marker.image,
    description: marker.description,
    address: marker.address,
    name: marker.name,
    zeiten: marker.zeiten,
    betreibende: marker.betreibende,
    kommerziell: marker.kommerziell,
    grösse: marker.grösse,
    gestaltung: marker.gestaltung,
  }));

  
  useEffect(() => {
    if (mapRef.current && selectedOrt && selectedOrt.geocode) {
      mapRef.current.setView(selectedOrt.geocode, 65); // Zoom auf 25
    }
  }, [selectedOrt]);

  const handleOrtClick = (ort) => {
    setSelectedOrt(ort);
    setShowOrteListe(false);
    const markerRef = markerRefs.current[ort.id];
    if (markerRef) {
      setTimeout(() => {
        markerRef.openPopup();
      }, 300); // Kurze Verzögerung vor dem Öffnen des Popups
    }
  };
  

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: [33, 33],
    });
  };

  return (
    <div className="app-container">
      <Header />
      {showOrteListe && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="close-btn" onClick={() => setShowOrteListe(false)}>X</div >
            <OrteListe orte={markers} onOrtAuswahl={handleOrtClick} />
          </div>
        </div>
      )}
      <div className="list-button">
        <div onClick={() => setShowOrteListe(true)}> LISTE </div>
      </div>
      <MapContainer center={[48.1372, 11.5755]} zoom={13} minZoom={10}  ref={mapRef}>
        <TileLayer
          attribution="Stamen Toner"
          url='https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.jpg'
          >  
        </TileLayer>

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker, index) => {
            const customIcon = new Icon({
              iconUrl: marker.image,
              iconSize: [38, 38]
            });
            
            return (
              <Marker key={index} position={marker.geocode} icon={customIcon} ref={(ref) => {
                markerRefs.current[marker.id] = ref; // Speichert die Referenz
              }}>
                <Popup className="popup">
                  <div className='frame'>
                    <div className='block1'>
                      <h1 className="name">{marker.popup}</h1>
                      <p className='address'>{marker.address}</p>
                    </div>
                    <div className='block2'>
                      <div className='left'>
                        <p className = "infoblock"><strong>ZEITEN</strong> {marker.zeiten}</p>
                        <p className = "infoblock"><strong>BETREIBENDE</strong> {marker.betreibende}</p>
                        <p className = "infoblock"><strong>KOMMERZIELL</strong> {marker.kommerziell}</p>
                        <p className = "infoblock"><strong>GRÖSSE</strong> {marker.grösse}</p>
                        <p className = "infoblock"><strong>MITGESTALTUNG</strong> {marker.gestaltung}</p>
                      </div>
                      <div className='right'>
                        <div className="image-container" style={{ height: 'auto', minHeight: '100px' }}>
                          <img src={marker.image} alt={marker.popup} style={{ width: '100%', height: '100%' }} />
                        </div>
                      </div>
                    </div>
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
