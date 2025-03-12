import React, { useContext, useEffect, useState } from "react";
import "./CountryDetails.css";
import {
  Link,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import CountryDetailsShimmer from "./CountryDetailsShimmer";
import useTheme from "../hooks/useTheme";
export default function CountryDetails() {
  const { state } = useLocation();
  const [isDark] = useTheme();
  const params = useParams();
  const countryName = params.country;

  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  console.log(countryData);

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      tld: data.tld,
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      languages: Object.values(data.languages || {})?.join(", "),
      flag: data.flags.svg,
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }
    Promise.all(
      data.borders?.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([countryBorder]) => countryBorder.name.common);
      })
    ).then((borders) => {
      setCountryData((prevState) => ({ ...prevState, borders }));
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch((err) => {
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return <div>Page Not Found</div>;
  }
  return (
    <main className={isDark ? "dark" : ""}>
      <div className="country-details-container">
        <span
          className="back-button"
          onClick={() => {
            history.back();
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {!countryData ? (
          <CountryDetailsShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData?.flag} alt={`${countryData?.flag} flag`} />
            <div className="details-text-container">
              <h1>{countryData?.name}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name : </b>
                  <span className="native-name">
                    {countryData?.nativeName || countryData?.name}
                  </span>
                </p>
                <p>
                  <b>Population : </b>
                  <span className="population">
                    {countryData?.population?.toLocaleString("en-IN")}
                  </span>
                </p>
                <p>
                  <b>Region : </b>
                  <span className="region">{countryData?.region}</span>
                </p>
                <p>
                  <b>Sub Region : </b>
                  <span className="sub-region">{countryData?.subregion}</span>
                </p>
                <p>
                  <b>Capital: </b>
                  <span className="capital">
                    {countryData?.capital?.join(", ")}
                  </span>
                </p>
                <p>
                  <b>Top Level Domain : </b>
                  <span className="top-level-domain">{countryData?.tld}</span>
                </p>
                <p>
                  <b>Currencies : </b>
                  <span className="currencies">{countryData?.currencies}</span>
                </p>
                <p>
                  <b>Languages: </b>
                  <span className="languages">{countryData?.languages}</span>
                </p>
              </div>
              {countryData?.borders.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>{" "}
                  {countryData?.borders.map((elem) => (
                    <Link className="border-Link" key={elem} to={`/${elem}`}>
                      {elem}
                    </Link>
                  ))}
                  &nbsp;
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// import React, { useEffect, useState } from "react";
// import "./CountryDetails.css";
// import { Link, useLocation, useParams } from "react-router-dom";
// import CountryDetailsShimmer from "./CountryDetailsShimmer";
// export default function CountryDetails() {
//   const { state } = useLocation();
//   console.log("State : ", state);

//   const params = useParams();
//   const countryName = params.country;

//   const [countryData, setCountryData] = useState(null);
//   const [notFound, setNotFound] = useState(false);

//   function updateCountryData(data) {
//     setCountryData({
//       name: data.name.common,
//       nativeName: Object.values(data.name.nativeName)[0].common,
//       population: data.population,
//       region: data.region,
//       subregion: data.subregion,
//       capital: data.capital,
//       tld: data.tld,
//       currencies: Object.values(data.currencies)
//         .map((currency) => currency.name)
//         .join(", "),
//       languages: Object.values(data.languages).join(", "),
//       flag: data.flags.svg,
//       borders: [],
//     });

//     if (!data.borders) {
//       data.borders = [];
//     }
//     Promise.all(
//       data.borders?.map((border) => {
//         return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
//           .then((res) => res.json())
//           .then(([countryBorder]) => countryBorder);
//       })
//     ).then((borders) => {
//       setCountryData((prevState) => ({ ...prevState, borders }));
//     });
//   }

//   useEffect(() => {
//     console.log("Use Effect called");
//     fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
//       .then((res) => res.json())
//       .then(([data]) => {
//         console.log("Data : ", data);
//         updateCountryData(state);
//       })
//       .catch((err) => {
//         setNotFound(true);
//       });
//   }, [countryName]);

//   if (notFound) {
//     return <div>Page Not Found</div>;
//   }
//   return (
//     <main>
//       <div className="country-details-container">
//         <span
//           className="back-button"
//           onClick={() => {
//             history.back();
//           }}
//         >
//           <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
//         </span>
//         {!countryData ? (
//           <CountryDetailsShimmer />
//         ) : (
//           <div className="country-details">
//             <img src={countryData?.flag} alt={`${countryData?.flag} flag`} />
//             <div className="details-text-container">
//               <h1>{countryData?.name}</h1>
//               <div className="details-text">
//                 <p>
//                   <b>Native Name : </b>
//                   <span className="native-name">{countryData?.nativeName}</span>
//                 </p>
//                 <p>
//                   <b>Population : </b>
//                   <span className="population">
//                     {countryData?.population?.toLocaleString("en-IN")}
//                   </span>
//                 </p>
//                 <p>
//                   <b>Region : </b>
//                   <span className="region">{countryData?.region}</span>
//                 </p>
//                 <p>
//                   <b>Sub Region : </b>
//                   <span className="sub-region">{countryData?.subregion}</span>
//                 </p>
//                 <p>
//                   <b>Capital: </b>
//                   <span className="capital">
//                     {countryData?.capital.join(" ")}
//                   </span>
//                 </p>
//                 <p>
//                   <b>Top Level Domain : </b>
//                   <span className="top-level-domain">{countryData?.tld}</span>
//                 </p>
//                 <p>
//                   <b>Currencies : </b>
//                   <span className="currencies">{countryData?.currencies}</span>
//                 </p>
//                 <p>
//                   <b>Languages: </b>
//                   <span className="languages">{countryData?.languages}</span>
//                 </p>
//               </div>
//               {countryData?.borders.length !== 0 && (
//                 <div className="border-countries">
//                   <b>
//                     Border Countries:{" "}
//                     {countryData?.borders.map((elem) => (
//                       <Link
//                         key={elem.name.common}
//                         to={`/${elem.name.common}`}
//                         state={elem}
//                       >
//                         {elem.name.common}
//                       </Link>
//                     ))}
//                   </b>
//                   &nbsp;
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }
