// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import { Country } from "country-state-city";
// import { City } from "country-state-city";
// import axios from "axios";

// // interface OptionType {
// //   label: string;
// //   value: string;
// // }

// // interface CountrySelectorProps {
// //   selectedCountry: OptionType | null;
// //   setSelectedCountry: (country: OptionType | null) => void;
// //   postalCode: string;
// //   setPostalCode: (postalCode: string) => void;
// //   selectedStreet: OptionType | null;
// //   setSelectedStreet: (street: OptionType | null) => void;
// // }

// const CountrySelector = ({
//   selectedCountry,
//   setSelectedCountry,
//   postalCode,
//   setPostalCode,
//   selectedStreet,
//   setSelectedStreet,
// }: any) => {
//   const [countryOptions, setCountryOptions] = useState<any[]>([]);
//   const [streetOptions, setStreetOptions] = useState<any[]>([]);

//   useEffect(() => {
//     const countriesList = Country.getAllCountries().map((country) => ({
//       label: country.name,
//       value: country.name,
//     }));
//     setCountryOptions(countriesList);
// }, []);

// useEffect(() => {
//     const fetchStreets = async () => {
//       if (selectedCountry) {
//           try {
//           const response = await axios.get("/api/maps", {
//             params: { input: selectedCountry.value },
//           });
//           const streets = response.data.predictions.map((prediction: any) => ({
//             label: prediction.description,
//             value: prediction.description,
//         }));
//         setStreetOptions(streets);
//         console.log('hhhk :',response.data)
//         } catch (error) {
//           console.error("Error fetching streets:", error);
//         }
//       }
//     };

//     fetchStreets();
//   }, [selectedCountry]);

//   return (
//     <div>
//       <Select
//         options={countryOptions}
//         value={selectedCountry}
//         onChange={(selected) => setSelectedCountry(selected)}
//         placeholder="Select a Country"
//       />
//       <Select
//         options={streetOptions}
//         value={selectedStreet}
//         onChange={(selected) => setSelectedStreet(selected)}
//         placeholder="Select a Street"
//       />
//       <input
//         type="text"
//         value={postalCode}
//         onChange={(e) => setPostalCode(e.target.value)}
//         placeholder="Enter Postal Code"
//         className="input"
//       />
//     </div>
//   );
// };

// export default CountrySelector;
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

const CountrySelector = ({
  selectedCountry,
  setSelectedCountry,
  postalCode,
  setPostalCode,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
}: any) => {
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch countries and set options
    const countriesList = Country.getAllCountries().map((country) => ({
      label: country.name,
      value: country.isoCode,
    }));
    setCountryOptions(countriesList);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const statesList = State.getStatesOfCountry(selectedCountry.value).map(
        (state) => ({
          label: state.name,
          value: state.isoCode,
        })
      );
      setStateOptions(statesList);
      setSelectedState(null); // Clear state and city selections when country changes
      setSelectedCity(null);
    }
  }, [selectedCountry, setSelectedState, setSelectedCity]);

  useEffect(() => {
    // Fetch cities when a state is selected
    if (selectedState) {
      const citiesList = City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value
      ).map((city) => ({
        label: city.name,
        value: city.name,
      }));
      setCityOptions(citiesList);
    }
  }, [selectedState, selectedCountry]);

  return (
    <div>
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={(selected) => setSelectedCountry(selected)}
        placeholder="Select a Country"
      />
      <Select
        options={stateOptions}
        value={selectedState}
        onChange={(selected) => setSelectedState(selected)}
        placeholder="Select a State"
      />
      <Select
        options={cityOptions}
        value={selectedCity}
        onChange={(selected) => setSelectedCity(selected)}
        placeholder="Select a City"
      />
    </div>
  );
};

export default CountrySelector;
