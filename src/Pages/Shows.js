import { useState, useEffect } from "react";
import Slider from "infinite-react-carousel";

import {
  fetchTrendingShows,
  IMAGE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../API";
// import "./App.css";
import Header from "../Components/Header";
import Cover from "../Components/Cover";

function Shows() {
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetchTrendingShows();
    setTrending(await data);
  };

  return (
    <div className="app">
      <Header />
      {trending && (
        <Slider autoplay arrows={false} pauseOnHover={false}>
          {trending.results.map((result) => {
            return (
              <Cover
                key={result.id}
                imageUrl={`${IMAGE_URL}${BACKDROP_SIZE}${result.backdrop_path}`}
                posterUrl={`${IMAGE_URL}${POSTER_SIZE}${result.poster_path}`}
                title={result.name}
                desc={result.overview}
                genres={result.genre_ids}
                rating={result.vote_average}
                shows
              />
            );
          })}
        </Slider>
      )}
    </div>
  );
}

export default Shows;
