import React from "react";
import { useHistory } from "react-router";

import { IMAGE_URL, POSTER_SIZE } from "../../API";
import "./CardSection.css";
import NoImage from "../../Assets/No-Image.png";

const CardSection = ({ title, data, shows }) => {
  const { results } = data;

  const history = useHistory();

  return (
    <div className="card-section-container">
      <h3 className="section-title">{title}</h3>
      <div className="section-card-container">
        {results.map((result) => {
          return (
            <div key={result.id} className="section-card" onClick={() => shows ? history.push(`/tv/${result.id}`) : history.push(`/movie/${result.id}`)}>
              <img
                src={result.poster_path ? `${IMAGE_URL}${POSTER_SIZE}${result.poster_path}` : NoImage}
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
