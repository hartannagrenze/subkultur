import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

function CustomMarker({ marker }) {
  const [visitedCount, setVisitedCount] = useState(marker.visitedCount || 0);

  const handleVote = (increment) => {
    // Increment visited count by 1 or -1 based on the vote
    const newVisitedCount = visitedCount + increment;
    setVisitedCount(newVisitedCount);

    // Update marker data in your database or wherever it's stored
    // Here, you might want to make an API call to update the marker's visited count
  };

  return (
    <Marker position={[marker.latitude, marker.longitude]}>
      <Popup>
        <div>
          <h2>{marker.name}</h2>
          <p>Description: {marker.description}</p>
          <p>Address: {marker.address}</p>
          <p>Visited Count: {visitedCount}</p>
          <button onClick={() => handleVote(1)}>I've been here</button>
          <button onClick={() => handleVote(-1)}>Not visited yet</button>
        </div>
      </Popup>
    </Marker>
  );
}

export default CustomMarker;
