import { useEffect, useState } from "react";
import { fetchMovieById } from "../API";
import "./Wishlist.css";

function Wishlist() {
  const [listIds, setListIds] = useState([631843, 436969, 597891, 566525]);

  const [movies, setMovies] = useState([]);

  // const deleteItem = (id) => {
  //   const updatedItems = listIds.filter((item) => {
  //     return item !== id;
  //   });
  //   setListIds(updatedItems);
  // };

  const deleteItem = (id) => {
    setListIds(listIds.filter((item) => item !== id));
  };

  const emptyMoviesList = () => setMovies([]);

  const fetchItem = async (id) => {
    const data = await fetchMovieById(id);
    setMovies((prev) => [...prev, data]);
  };

  useEffect(() => {
    emptyMoviesList();
    listIds &&
      listIds.forEach((item) => {
        fetchItem(item);
      });
  }, [listIds]);

  return (
    <div className="wishlist">
      <h1 className="heading">Wishlist:</h1>
      <div className="wishlist-results">
        {listIds.length === 0 ? (
          <div className="empty">Your Wishlist is empty</div>
        ) : (
          movies.map((movie, i) => (
            <div key={movie.id}>
              {movie.title}
              <button onClick={() => deleteItem(movie.id)}>Del</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
