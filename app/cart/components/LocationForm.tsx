/* eslint-disable */

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";
// import { LatLngExpression } from "leaflet";
// import "leaflet/dist/leaflet.css";

// interface LocationFormProps {
//   initialLocation?: {
//     latitude: number;
//     longitude: number;
//     address: string;
//     isPrimary: boolean;
//   };
// }

// interface FormData {
//   address: string;
//   isPrimary: boolean;
//   latitude: number;
//   longitude: number;
// }

// const LocationForm: React.FC<LocationFormProps> = ({ initialLocation }) => {
//   const { register, handleSubmit, setValue } = useForm<FormData>({
//     defaultValues: initialLocation || {
//       //   address: "",
//       isPrimary: false,
//       //   latitude: 0,
//       //   longitude: 0,
//     },
//   });

//   const [mapPosition, setMapPosition] = useState<LatLngExpression>({
//     lat: initialLocation?.latitude || 33.8949, // Meknes latitude
//     lng: initialLocation?.longitude || -5.5473, // Meknes longitude
//   });

//   useEffect(() => {
//     if (initialLocation) {
//       setValue("address", initialLocation.address);
//       setValue("isPrimary", initialLocation.isPrimary);
//       setValue("latitude", initialLocation.latitude);
//       setValue("longitude", initialLocation.longitude);
//     }
//   }, [initialLocation, setValue]);

//   const onSubmit = async (data: FormData) => {
//     // try {
//     const geocodeResponse = await axios.get(
//       // `https://api.geocoding-service.com/geocode?address=${data.address}&api_key=AIzaSyAnKC1eyv--hQRe2WiL7BElxnylMlOwXLM`
//       // `https://maps.googleapis.com/maps/api/geocode/json?address=${data.address}&key=AIzaSyDsSZUd6QjlN-dV9fHd-WKnVTyGjLD8MEo`
//       // `https://api.your-geocoding-service.com/geocode?address=${data.address}&key=7b413ca133a042e09282d7233f40a8f5`
//       `https://api.opencagedata.com/geocode/v1/json?key=7b413ca133a042e09282d7233f40a8f5&q=${encodeURIComponent(data.address)}&pretty=1&no_annotations=1`
//     );
//     //  7b413ca133a042e09282d7233f40a8f5
//     const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

//     setMapPosition({ lat, lng });
//     setValue("latitude", lat);
//     setValue("longitude", lng);
//     console.log("data hiya hadi : ", geocodeResponse);

//     //   await axios.post("/api/user-location", {
//     //     ...data,
//     //     latitude: lat,
//     //     longitude: lng,
//     //   });
//     //   alert("Location saved successfully!");
//     // } catch (error) {
//     //   console.error("Error saving location:", error);
//     //   alert("Failed to save location");
//     // }
//   };

//   // Custom hook to handle map clicks
//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setMapPosition({ lat, lng });
//         setValue("latitude", lat);
//         setValue("longitude", lng);
//       },
//     });
//     return null;
//   };

//   return (
//     <div>
//       <h2>Update Location</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Address:</label>
//           <input type="text" {...register("address")} />
//         </div>
//         <div>
//           <label>Primary Location:</label>
//           <input type="checkbox" {...register("isPrimary")} />
//         </div>
//         <button type="submit">Save Location</button>
//       </form>

//       <MapContainer
//         center={mapPosition as LatLngExpression}
//         zoom={13}
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={mapPosition}>
//           <Popup>Selected Location</Popup>
//         </Marker>
//         <LocationMarker />
//       </MapContainer>
//     </div>
//   );
// };

// export default LocationForm;
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
// import L, { LatLngExpression } from "leaflet";
// import "leaflet/dist/leaflet.css";

// interface LocationFormProps {
//   initialLocation?: {
//     latitude: number;
//     longitude: number;
//     address: string;
//     isPrimary: boolean;
//   };
// }

// interface FormData {
//   address: string;
//   isPrimary: boolean;
//   latitude: number;
//   longitude: number;
// }

// const LocationForm: React.FC<LocationFormProps> = ({ initialLocation }) => {
//   const { register, handleSubmit, setValue } = useForm<FormData>({
//     defaultValues: initialLocation || {
//       isPrimary: false,
//       longitude: 0,
//       latitude: 0,
//     },
//   });

//   const [mapPosition, setMapPosition] = useState<LatLngExpression>({
//     lat: initialLocation?.latitude || 33.8949, // Default to Meknes latitude
//     lng: initialLocation?.longitude || -5.5473, // Default to Meknes longitude
//   });

//   useEffect(() => {
//     console.log("chof  : ", initialLocation);
//     if (initialLocation) {
//       setValue("address", initialLocation.address);
//       setValue("isPrimary", initialLocation.isPrimary);
//       setValue("latitude", initialLocation.latitude);
//       setValue("longitude", initialLocation.longitude);
//     }
//   }, [initialLocation, setValue]);

//   const onSubmit = async (data: FormData) => {
//     try {
//       const geocodeResponse = await axios.get(
//         `https://api.opencagedata.com/geocode/v1/json?key=7b413ca133a042e09282d7233f40a8f5&q=${encodeURIComponent(data.address)}&pretty=1&no_annotations=1`
//       );

//       if (geocodeResponse.data.results.length > 0) {
//         const result = geocodeResponse.data.results[0];
//         const { lat, lng } = result.geometry;

//         setMapPosition({ lat, lng });
//         setValue("latitude", lat);
//         setValue("longitude", lng);

//         // await axios.post("/api/user-location", {
//         //   //   ...data,
//         //   //   latitude: lat,
//         //   //   longitude: lng,
//         // });
//         // alert("Location saved successfully!");

//         console.log("data here : ", geocodeResponse);
//         console.log("data here m3A : ", initialLocation);
//       } else {
//         alert("No results found for the given address.");
//       }
//     } catch (error) {
//       console.error("Error fetching geocode data:", error);
//       alert("Failed to fetch geocode data");
//     }
//   };

//   //   const LocationMarker = () => {
//   //     useMapEvents({
//   //       click(e) {
//   //         const { lat, lng } = e.latlng;
//   //         setMapPosition({ lat, lng });
//   //         setValue("latitude", lat);
//   //         setValue("longitude", lng);
//   //       },
//   //     });
//   //     return null;
//   //   };
//   // Custom hook to update map view
//   const UpdateMapView = () => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(mapPosition, map.getZoom());
//     }, [mapPosition, map]);
//     return null;
//   };

//   // Custom hook to handle map clicks
//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setMapPosition({ lat, lng });
//         setValue("latitude", lat);
//         setValue("longitude", lng);
//       },
//     });
//     return null;
//   };

//   const customIcon = new L.Icon({
//     iconUrl: "/home/map.PNG", // Path to your custom marker image
//     iconSize: [32, 32], // Size of the icon
//     iconAnchor: [16, 32], // Anchor point of the icon
//     popupAnchor: [0, -32], // Popup anchor
//   });

//   return (
//     <div>
//       <h2>Update Location</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Address:</label>
//           <input type="text" {...register("address")} />
//         </div>
//         <div>
//           <label>Primary Location:</label>
//           <input type="checkbox" {...register("isPrimary")} />
//         </div>
//         <button type="submit">Save Location</button>
//       </form>

//       <MapContainer
//         center={mapPosition as LatLngExpression}
//         zoom={19}
//         style={{ height: "400px", width: "100%" }}
//       >
//         {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={mapPosition} icon={customIcon}>
//           <Popup>Selected Location</Popup>
//         </Marker>
//         <LocationMarker />
//         <UpdateMapView />
//       </MapContainer>
//     </div>
//   );
// };

// export default LocationForm;

// (قديمة)

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
// import L, { LatLngExpression } from "leaflet";
// import "leaflet/dist/leaflet.css";

// interface LocationFormProps {
//   setAddress: (value: string) => void;
//   setLatitude: (value: number) => void;
//   setLongitude: (value: number) => void;
// }

// interface FormData {
//   address: string;
//   isPrimary: boolean;
//   latitude: number;
//   longitude: number;
// }

// const LocationForm: React.FC<LocationFormProps> = ({
//   setAddress,
//   setLatitude,
//   setLongitude,
// }) => {
//   const { register, handleSubmit, setValue } = useForm<FormData>({
//     defaultValues: {
//       isPrimary: false,
//     },
//   });

//   const [mapPosition, setMapPosition] = useState<LatLngExpression>({
//     lat: 33.8949, // Default to Meknes latitude
//     lng: -5.5473, // Default to Meknes longitude
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       const geocodeResponse = await axios.get(
//         `https://api.opencagedata.com/geocode/v1/json?key=7b413ca133a042e09282d7233f40a8f5&q=${encodeURIComponent(data.address)}&pretty=1&no_annotations=1`
//       );

//       if (geocodeResponse.data.results.length > 0) {
//         const result = geocodeResponse.data.results[0];
//         const { lat, lng } = result.geometry;

//         setMapPosition({ lat, lng });
//         setValue("latitude", lat);
//         setValue("longitude", lng);

//         // Update parent component state
//         setAddress(data.address);
//         setLatitude(lat);
//         setLongitude(lng);

//         await axios.post("/api/user-location", {
//           //   ...data,
//           //   latitude: lat,
//           //   longitude: lng,
//           address: data.address,
//           latitude: lat,
//           longitude: lng,
//           isPrimary: data.isPrimary,
//         });
//         alert("Location saved successfully!");
//         console.log("datas  : ", data);
//       } else {
//         alert("No results found for the given address.");
//       }
//     } catch (error) {
//       console.error("Error fetching geocode data:", error);
//       alert("Failed to fetch geocode data");
//     }
//   };

//   //   const LocationMarker = () => {
//   //     useMapEvents({
//   //       click(e) {
//   //         const { lat, lng } = e.latlng;
//   //         setMapPosition({ lat, lng });
//   //         setValue("latitude", lat);
//   //         setValue("longitude", lng);
//   //       },
//   //     });
//   //     return null;
//   //   };

//   const UpdateMapView = () => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(mapPosition, map.getZoom());
//     }, [mapPosition, map]);
//     return null;
//   };

//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setMapPosition({ lat, lng });
//         setValue("latitude", lat);
//         setValue("longitude", lng);
//       },
//     });
//     return null;
//   };

//   const customIcon = new L.Icon({
//     iconUrl: "/home/map.PNG", // Path to your custom marker image
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
//   });

//   return (
//     <div>
//       <h2>Update Location</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Address:</label>
//           <input type="text" {...register("address")} />
//         </div>
//         <div>
//           <label>Primary Location:</label>
//           <input type="checkbox" {...register("isPrimary")} />
//         </div>
//         <button type="submit">Save Location</button>
//       </form>

//       <MapContainer
//         center={mapPosition as LatLngExpression}
//         zoom={19}
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={mapPosition} icon={customIcon}>
//           <Popup>Selected Location</Popup>
//         </Marker>
//         <LocationMarker />
//         <UpdateMapView />
//       </MapContainer>
//     </div>
//   );
// };

// export default LocationForm;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

interface LocationFormProps {
  setAddress: (value: string) => void;
  setLatitude: (value: number) => void;
  setLongitude: (value: number) => void;
}

interface FormData {
  address: string;
  isPrimary: boolean;
  latitude: number;
  longitude: number;
}

const LocationForm: React.FC<LocationFormProps> = ({
  setAddress,
  setLatitude,
  setLongitude,
}) => {
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      isPrimary: false,
    },
  });

  const [mapPosition, setMapPosition] = useState<LatLngExpression>({
    lat: 33.8949, // Default to Meknes latitude
    lng: -5.5473, // Default to Meknes longitude
  });

  const onSubmit = async (data: FormData) => {
    try {
      const geocodeResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=7b413ca133a042e09282d7233f40a8f5&q=${encodeURIComponent(data.address)}&pretty=1&no_annotations=1`
      );

      if (geocodeResponse.data.results.length > 0) {
        const result = geocodeResponse.data.results[0];
        const { lat, lng } = result.geometry;

        setMapPosition({ lat, lng });
        setValue("latitude", lat);
        setValue("longitude", lng);

        setAddress(data.address);
        setLatitude(lat);
        setLongitude(lng);

        await axios.post("/api/user-location", {
          address: data.address,
          latitude: lat,
          longitude: lng,
          isPrimary: data.isPrimary,
        });
        alert("Location saved successfully!");
      } else {
        alert("No results found for the given address.");
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
      alert("Failed to fetch geocode data");
    }
  };

  const UpdateMapView = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(mapPosition, map.getZoom());
    }, [mapPosition, map]);
    return null;
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMapPosition({ lat, lng });
        setValue("latitude", lat);
        setValue("longitude", lng);
      },
    });
    return null;
  };

  const customIcon = new L.Icon({
    iconUrl: "/home/map.PNG", // Path to your custom marker image
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="flex flex-col p-4 space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold mb-4"
      >
        Update Location
      </motion.h2>
      <div className="grid grid-cols-2 items-center justify-center gap-6">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-4 mb-4"
        >
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Address:</label>
            <input
              type="text"
              {...register("address")}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("isPrimary")}
              className="form-checkbox"
            />
            <label className="font-medium">Primary Location:</label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Save Location
          </button>
        </motion.form>

        <MapContainer
          center={mapPosition as LatLngExpression}
          zoom={19}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={mapPosition} icon={customIcon}>
            <Popup>Selected Location</Popup>
          </Marker>
          <LocationMarker />
          <UpdateMapView />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationForm;
