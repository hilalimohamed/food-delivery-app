import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({
  setAddress,
}: {
  setAddress: (address: string) => void;
}) => {
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat && lng) {
      setMarkerPosition({ lat, lng });
      // Convert lat/lng to address (you can use a geocoding API here)
      setAddress("Selected Address");
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyABBsxxBpNKOt4Ezti799zb75IJ0x-UGNY">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={markerPosition}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
