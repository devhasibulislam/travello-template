/**
 * Title: Write a program using JavaScript on GeoLocation
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 21, October 2023
 */

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import _ from "leaflet";
import geocode from "@/libs/geocode";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect, useMemo, useRef, useState } from "react";

const GeoLocation = ({ location, zoom }) => {
  const [center, setCenter] = useState([40.8054, -74.0241]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const { lat, lon } = geocode(location);
        console.log(lat, lon, "lat, lon");
        setCenter([lat, lon]);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCoordinates();
  }, [location]);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // setPosition(marker.getLatLng())
          console.log(marker.getLatLng());
        }
      },
    }),
    []
  );

  useEffect(() => {
    console.log(markerRef.current);
  }, [markerRef.current]);

  return (
    <div
      style={{ height: "400px" }}
      className="w-full max-w-full rounded overflow-hidden"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          eventHandlers={eventHandlers}
          ref={markerRef}
          position={center}
          draggable={true}
          animate={true}
        >
          <Popup>
            {location}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default GeoLocation;
