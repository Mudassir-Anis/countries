import React from "react";
import "./CountryDetailsShimmer.css";

export default function CountryDetailsShimmer() {
  return (
    <div className="country-details">
      <div className="img-container"></div>

      <div className="details-text-container ">
        <h1 className="shimmer-heading"></h1>
        <div className="details-text">
          <p className="shimmer-para"></p>
          <p className="shimmer-para"></p>
          <p className="shimmer-para"></p>
          <p className="shimmer-para"></p>
          <p className="shimmer-para"></p>
          <p className="shimmer-para"></p>
          <p className="shimmer-para"></p>
          <p className="shimmer-para"></p>
        </div>
      </div>
    </div>
  );
}
