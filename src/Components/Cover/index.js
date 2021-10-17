import React, { useContext, useEffect, useState } from "react";
import { getGenre, getShowsGenre } from "../../API";
import "./Cover.css";
import Play from "../../Assets/play-solid.svg";
import Plus from "../../Assets/plus-solid.svg";
import Star from "../../Assets/star-solid.svg";
import Check from "../../Assets/check-solid.svg";
import { useHistory } from "react-router";
import { WishlistContext } from "../../WishlistContext";

function Cover({
  id,
  imageUrl,
  posterUrl,
  title,
  desc,
  genres,
  rating,
  shows,
  showTrailer,
  sendVideoId,
}) {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const history = useHistory();

  const [isAdded, setIsAdded] = useState(false);
  const {wishlistMovies, setWishlistMovies,  wishlistShows, setWishlistShows} = useContext(WishlistContext);

  useEffect(() => {
    const checkWishlistAdded = () => {
        !shows
        ? setIsAdded(wishlistMovies?.includes(id))
        : setIsAdded(wishlistShows?.includes(id));
    }
    checkWishlistAdded();
    // eslint-disable-next-line
}, [id, wishlistMovies, wishlistShows])

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
            <button
              className="watch-btn"
              onClick={() => {
                showTrailer(true);
                sendVideoId(id);
              }}
            >
              <img src={Play} alt="" className="play" />
              WATCH TRAILER
            </button>
            <button 
            className={isAdded ? "watch-btn grey green" : "watch-btn grey"} 
            title="Add to Wishlist"
            onClick={isAdded ? null : (() => {
              !shows
              ? setWishlistMovies((prev) => wishlistMovies?.length === 0 ? [id] :[...prev, id])
              : setWishlistShows((prev) => wishlistShows?.length === 0 ? [id] :[...prev, id]);
            })}>
              {isAdded ? <img src={Check} alt="" className="plus" /> : <img src={Plus} alt="" className="plus" />}
            </button>
          </div>
        </div>
        <div className="poster-container" onClick={() => shows ? history.push(`/tv/${id}`) : history.push(`/movie/${id}`)}>
          <img src={posterUrl} alt="" className="poster" />
        </div>
      </div>
    </div>
  );
}

export default Cover;
