import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map2.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "../Contexts/CititsContext";
import { useGeolocation } from "../Hooks/UseGeolocation";
import Button from "./Button";
import { UseUrlLocation } from "../Hooks/UseUrlLocation";

const flagemojiToPNG = (flag) => {
  const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function Map2() {
  const {
    isLoading: isLoadingPosi,
    position: geoPosition,
    getPosition,
  } = useGeolocation();

  const { cities, mapPosition, setMapPosition } = useContext(CitiesContext);
  const [lat, lng] = UseUrlLocation();

  useEffect(() => {
    if (lng && lat && (lat !== mapPosition[0] || lng !== mapPosition[1])) {
      setMapPosition([lat, lng]); // Create a new reference
    }
  }, [lat, lng, mapPosition, setMapPosition]);

  useEffect(
    function () {
      if (geoPosition) {
        setMapPosition([geoPosition.lat, geoPosition.lng]);
      }
    },
    [geoPosition, setMapPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosi ? "Loading" : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {flagemojiToPNG(city.emoji)}
              {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick></DetectClick>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position); // Update the map's view only when the position changes
  }, [map, position]);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map2;
