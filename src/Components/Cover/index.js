import React from "react";
import { getGenre, getShowsGenre } from "../../API";
import "./Cover.css";
import Play from "../../Assets/play-solid.svg";
import Plus from "../../Assets/plus-solid.svg";
import Star from "../../Assets/star-solid.svg";

function Cover({ imageUrl, posterUrl, title, desc, genres, rating, shows }) {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="cover-container">
      <img src={imageUrl} alt={title} className="cover-img" />
      <div className="content-container">
        <div className="contents">
          <h1 className="title">{title}</h1>
          <div className="genres-container">
            {genres.map((genre) => {
              return (
                <div key={genre} className="genre">
                  {shows ? getShowsGenre(genre) : getGenre(genre)}
                </div>
              );
            })}
            <div className="rating">
              <img src={Star} alt="" className="star" />
              {rating}
            </div>
          </div>
          <p className="desc">{truncate(desc, 200)}</p>
          <div className="btn-container">
            <button className="watch-btn">
              <img src={Play} alt="" className="play" />
              WATCH TRAILER
            </button>
            <button className="watch-btn grey" title="Add to Wishlist">
              <img src={Plus} alt="" className="plus" />
            </button>
          </div>
        </div>
        <div className="poster-container">
          <img src={posterUrl} alt="" className="poster" />
        </div>
      </div>
    </div>
  );
}

export default Cover;
