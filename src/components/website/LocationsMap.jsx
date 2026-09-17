import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function LocationsMap({ locations }) {

  const validLocations = locations.filter(
    (location) =>
      location.latitude != null &&
      location.longitude != null
  );

  if (validLocations.length === 0) {
    return (
      <div className="mb-8 rounded-xl border p-6 text-center">
        No map locations available.
      </div>
    );
  }

  const center = [
    validLocations[0].latitude,
    validLocations[0].longitude,
  ];

  return (
    <div className="mb-8 overflow-hidden rounded-xl">
      <MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom={false}
        className="h-[450px] w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validLocations.map((location) => (
          <Marker
            key={location.id}
            position={[
              location.latitude,
              location.longitude,
            ]}
          >
            <Popup>
              <div>
                <strong>{location.name}</strong>

                <br />

                {location.addressLine1}

                <br />

                {location.city}, {location.region}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default LocationsMap;