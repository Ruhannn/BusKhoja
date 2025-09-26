"use client";

import type { LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

const busIcon = L.divIcon({
  className: "",
  html: `
    <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-md border border-gray-200">
      <img src="https://img.icons8.com/clouds/100/bus.png" class="w-10 h-10" />
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});
function LocationMarker({ onLocation }: { onLocation: (pos: L.LatLng) => void }) {
  const [position, setPosition] = useState<LatLngTuple | null>(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 17);
      onLocation(e.latlng);
    },
  });

  if (!position)
    return null;

  return (
    <Marker position={position}>
      <Popup autoClose={false} autoPan={true}>
        You are here
      </Popup>
    </Marker>
  );
}

export default function Map() {
  const [bus, setBus] = useState(false);

  return (
    <MapContainer
      center={{ lat: 23.8103, lng: 90.4125 }}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bus
        ? (
            <>

              <Marker position={[23.829309910104588, 90.36784940356998]} icon={busIcon}>
                <Popup>Osim</Popup>
              </Marker>

              <Marker
                position={[23.8250108944537, 90.36420338846231]}
                icon={busIcon}
              >
                <Popup>Boshumoti</Popup>
              </Marker>
              <Marker
                position={[23.829024583539244, 90.36380055752866]}
                icon={busIcon}
              >
                <Popup>Rajhdhani</Popup>
              </Marker>
              <Marker
                position={[23.82715460175573, 90.3641203603026]}
                icon={busIcon}
              >
                <Popup>
                  Poristhan
                </Popup>
              </Marker>
            </>
          )
        : null}
      <LocationMarker
        onLocation={() => {
          setTimeout(() => setBus(true), 2000);
        }}
      />
    </MapContainer>
  );
}
