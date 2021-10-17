import { useContext, useEffect, useState } from "react";
import { fetchById } from "../API";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import { WishlistContext } from "../WishlistContext";
import "./Wishlist.css";
import trash from "../Assets/trash-solid.svg";
import { useHistory } from "react-router";

function Wishlist() {
  const {wishlistMovies, setWishlistMovies,  wishlistShows, setWishlistShows, menuOpen} = useContext(WishlistContext);

  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const history = useHistory();

  const deleteMovieItem = (id) => {
    setWishlistMovies(wishlistMovies.filter((item) => item !== id));
  };

  const deleteShowItem = (id) => {
    setWishlistShows(wishlistShows.filter((item) => item !== id));
  };

  const emptyMoviesList = () => setMovies([]);
  const emptyShowsList = () => setShows([]);

  useEffect(() => {
    const fetchItems = async () => {
      Promise.all(
        wishlistMovies?.map(async (id) => {
          return await fetchById("movie", id);
        })
      ).then((result) => setMovies((prev) => [...prev, ...result]));
      Promise.all(
        wishlistShows?.map(async (id) => {
          return await fetchById("tv", id);
        })
      ).then((result) => setShows((prev) => [...prev, ...result]));
    };
    emptyMoviesList();
    emptyShowsList();
    wishlistMovies && wishlistShows && fetchItems();
  }, [wishlistMovies, wishlistShows]);

  return (
    <>
      <Header />
      {menuOpen && <Menu />}
      <div className="wishlist">
        <h1 className="heading">Wishlist:</h1>
        <div className="wishlist-results">
          <h3>Movies</h3>
          {wishlistMovies.length === 0 ? (
            <div className="no-data">Your Wishlist is empty</div>
          ) : (
            movies.map((movie) => (
              <div className="wishlist-item" key={movie.id}>
                <p onClick={() => history.push(`/movie/${movie.id}`)}>{movie.title}</p>
                <button className="delete-btn" onClick={() => deleteMovieItem(movie.id)}>
                  <img src={trash} alt="" />
                </button>
              </div>
            ))
          )}
          <h3>Tv Shows</h3>
          {wishlistShows.length === 0 ? (
            <div className="no-data">Your Wishlist is empty</div>
          ) : (
            shows.map((show) => (
              <div className="wishlist-item" key={show.id}>
                <p onClick={() => history.push(`/tv/${show.id}`)}>{show.name}</p>
                <button  className="delete-btn" onClick={() => deleteShowItem(show.id)}>
                <img src={trash} alt="" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
