// 'use client'

// import React, { useState } from "react";
// import UpdateName from "./UpdateName";
// import UpdatePnum from "./UpdatePnum";
// import UpdateAddrs from "./UpdateAddrs";
// import MapComponent from "./MapComponent";
// import CountrySelector from "./CountrySelector";

// // interface User {
// //   //   image: string;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   streetAddress: string;
// //   postalCode: string;
// //   country: string;
// // }

// // interface ProfilePageProps {
// //   user: User;
// // }

// const ProfilePage = ({ user }: { user: any }) => {

//   const [address, setAddress] = useState(user?.streetAddress || "");
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [postalCode, setPostalCode] = useState(user?.postalCode || "");

//   return (
//     <div className="profile-page p-4 max-w-md mx-auto mt-10 bg-white shadow-gray-400 shadow-lg rounded-md">
//       <div className="flex justify-center mb-4">
//         <img
//           src={user?.image || "/home/profile.jpeg"}
//           alt="Profile"
//           className="w-32 h-32 rounded-full object-cover"
//         />
//       </div>
//       <div className="text-center mb-4">
//         <UpdateName user={user} />
//         <p className="text-gray-600">{user?.email}</p>
//       </div>
//       <div className="text-left space-y-2">
//         <div>
//           <h2 className="text-xl font-semibold">Contact Information</h2>
//           <div className="text-gray-800">
//             <strong>Phone:</strong> <UpdatePnum user={user} />
//           </div>
//           <div className="text-gray-800">
//             <strong>Address:</strong> <UpdateAddrs user={user} />
//           </div>
//           <p className="text-gray-800">
//             <strong>Postal Code:</strong> {user?.postalCode}
//           </p>
//           <p className="text-gray-800">
//             <strong>Country:</strong> {user?.country}
//           </p>
//         </div>
//         <div className="location-section">
//           <h2>Select Location</h2>
//           <MapComponent setAddress={setAddress} />
//           <CountrySelector
//             selectedCountry={selectedCountry}
//             setSelectedCountry={setSelectedCountry}
//             postalCode={postalCode}
//             setPostalCode={setPostalCode}
//             selectedState={selectedState}
//             setSelectedState={setSelectedState}
//             selectedCity={selectedCity}
//             setSelectedCity={setSelectedCity}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
"use client";

import React, { useState } from "react";
import UpdateName from "./UpdateName";
import UpdatePnum from "./UpdatePnum";
import UpdateAddrs from "./UpdateAddrs";
import MapComponent from "./MapComponent";
import CountrySelector from "./CountrySelector";
import { motion } from "framer-motion";

const ProfilePage = ({ user }: { user: any }) => {
  const [address, setAddress] = useState(user?.streetAddress || "");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");

  return (
    <motion.div
      className="profile-page p-6 max-w-5xl mx-auto mt-10 bg-white shadow-xl rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image */}
        <motion.div
          className="flex flex-col items-center md:items-start md:col-span-1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={user?.image || "/home/profile.jpeg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-lg mb-4 border-4 border-orange-500"
          />
          <UpdateName user={user} />
          <p className="text-gray-500">{user?.email}</p>
        </motion.div>

        {/* Contact and Address Info */}
        <motion.div
          className="md:col-span-2 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md border-l-4 border-orange-400"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2 text-orange-600">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Phone:</span>
              <UpdatePnum user={user} />
            </div>

            {/* Address */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Address:</span>
              <UpdateAddrs user={user} />
            </div>

            {/* Postal Code */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Postal Code:</span>
              <span>{user?.postalCode}</span>
            </div>

            {/* Country */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Country:</span>
              <span>{user?.country}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Location and Map */}
      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Country Selector */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border-l-4 border-orange-400">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">
            Select Location
          </h2>
          <CountrySelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>

        {/* Google Map */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border-l-4 border-orange-400">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Map</h2>
          <MapComponent setAddress={setAddress} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
