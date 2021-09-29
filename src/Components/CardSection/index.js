import React from "react";
import { IMAGE_URL, POSTER_SIZE } from "../../API";
import "./CardSection.css";

const CardSection = ({ title, data }) => {
  const { results } = data;
  return (
    <div className="card-section-container">
      <h3 className="section-title">{title}</h3>
      <div className="section-card-container">
        {results.map((result) => {
          return (
            <div key={result.id} className="section-card">
              <img
                src={`${IMAGE_URL}${POSTER_SIZE}${result.poster_path}`}
                alt=""
                className="card-poster"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSection;
