import React, { useContext, useEffect, useState } from "react";
import { fetchSearchResult, IMAGE_URL, POSTER_SIZE } from "../API";
import "./Search.css";
import NoImage from "../Assets/No-Image.png";
import Header from "../Components/Header";
import { useHistory } from "react-router";
import Menu from "../Components/Menu";
import { WishlistContext } from "../WishlistContext";

const Search = ({ match }) => {
  const SearchTerm = match.params.searchterm;
  const [searchResults, setSearchResults] = useState(null);
  const [page, setPage] = useState(1);

  const history = useHistory();

  const {menuOpen} = useContext(WishlistContext);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [SearchTerm]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [page]);

  const getData = async () => {
    const data = await fetchSearchResult(SearchTerm, page);
    setSearchResults((prev) => ({
      ...data,
      results:
        page > 1 ? [...prev.results, ...data.results] : [...data.results],
    }));
  };

  console.log(searchResults);

  return (
    <>
      <Header />
      {menuOpen && <Menu />}
      <div className="search-container">
        <h1 className="heading">Showing results for '{SearchTerm}':</h1>
        <div className="search-results">
          {searchResults &&
            searchResults.results.map((result) => (
              <div className="card" onClick={() => result.poster_path ? result.media_type === "tv" ? history.push(`/tv/${result.id}`) : history.push(`/movie/${result.id}`) : null} >
                <img
                  src={
                    result.poster_path
                      ? `${IMAGE_URL}${POSTER_SIZE}${result.poster_path}`
                      : NoImage
                  }
                  alt={
                    result.media_type === "movie" ? result.title : result.name
                  }
                  className="poster-card"
                />
              </div>
            ))}
        </div>
        {searchResults && searchResults.total_pages > page && (
          <div className="show-more">
            <button onClick={() => setPage(page + 1)}>Show More</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
