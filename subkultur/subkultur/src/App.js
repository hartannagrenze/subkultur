import './App.css';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {Icon, divIcon, point} from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';


export default function App() {
  //markers
  const markers = [
    {
      geocode: [48.1372, 11.5755],
      popup: "Munich1",
    },
    {
      geocode: [48.1384, 11.5755],
      popup: "Munich2",
    },
    {
      geocode: [48.1369, 11.5755],
      popup: "Munich3",
    },
  ]
  const customIcon = new Icon({
    iconUrl: "./pin.png",
    iconSize: [40, 40],
  });
  const createCustomClusterIcon = (cluster) =>{
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-maker-cluster",
      iconSize: point(33, 33, true),
    });
  }

  return (
    <MapContainer center={[48.1372, 11.5755]} zoom={25}>
      <TileLayer 
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        url= "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
      chunkedLoading
      iconCreateFunction={createCustomClusterIcon}
      >
      {markers.map(marker => (
        <Marker position= {marker.geocode} icon={customIcon}>
        <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
      </MarkerClusterGroup>
    </MapContainer>
  
  );
}