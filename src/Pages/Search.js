import React, { useEffect, useState } from "react";
import { fetchSearchResult, IMAGE_URL, POSTER_SIZE } from "../API";
import "./Search.css";
import NoImage from "../Assets/No-Image.png";

const Search = ({ match }) => {
  const SearchTerm = match.params.searchterm;
  const [searchResults, setSearchResults] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    const data = await fetchSearchResult(SearchTerm, page);
    setSearchResults((prev) => ({
      ...data,
      results:
        page > 1 ? [...prev.results, ...data.results] : [...data.results],
    }));
  };

  return (
    <div className="search-container">
      <h1 className="heading">Showing results for '{SearchTerm}':</h1>
      <div className="search-results">
        {searchResults &&
          searchResults.results.map((result) => (
            <div className="card">
              <img
                src={
                  result.poster_path
                    ? `${IMAGE_URL}${POSTER_SIZE}${result.poster_path}`
                    : NoImage
                }
                alt={result.media_type === "movie" ? result.title : result.name}
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
  );
};

export default Search;
