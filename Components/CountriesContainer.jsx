import React from "react";
// import countriesData from "../countriesData";
import CountryCard from "./CountryCard";
import { useState } from "react";
import { useEffect } from "react";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesContainer({ query, query1 }) {
  console.log("re-render");
  const [countriesData, setCountriesData] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      });
  }, []);

  return (
    <>
      {countriesData.length === 0 ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          {countriesData
            .filter(
              (country) =>
                country.name.common.toLowerCase().includes(query) ||
                country.region.toLowerCase().includes(query.toLowerCase())
            )
            .map((country, i) => (
              <CountryCard
                key={i}
                flag={country.flags.svg}
                name={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
                data={country}
              />
            ))}
        </div>
      )}
    </>
  );
}
