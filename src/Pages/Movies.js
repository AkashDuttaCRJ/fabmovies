import { useState, useEffect, useContext } from "react";
import Slider from "infinite-react-carousel";

import {
  fetchTrendingMovies,
  IMAGE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  fetchPopularMovies,
  fetchMovieByGenre,
  fetchVideoUrl,
} from "../API";
import "./Movies.css";
import Header from "../Components/Header";
import Cover from "../Components/Cover";
import CardSection from "../Components/CardSection";
import TrailerModal from "../Components/TrailerModal";
import Menu from "../Components/Menu";
import { WishlistContext } from "../WishlistContext";

function Movies() {
  const [trending, setTrending] = useState(null);
  const [popular, setPopular] = useState(null);
  const [action, setAction] = useState(null);
  const [adventure, setAdventure] = useState(null);
  const [comedy, setComedy] = useState(null);
  const [horror, setHorror] = useState(null);
  const [crime, setCrime] = useState(null);
  const [romance, setRomance] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [videoId, setVideoId] = useState();
  const [videoUrl, setVideoUrl] = useState();

  const {menuOpen} = useContext(WishlistContext);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getVideoUrl = async () => {
      const data = await fetchVideoUrl("movie", videoId);
      setVideoUrl(await data);
    };
    videoId && getVideoUrl();
  }, [videoId]);

  const getData = async () => {
    const data = await fetchTrendingMovies();
    setTrending(await data);

    const populardata = await fetchPopularMovies("movie");
    setPopular(await populardata);

    const actiondata = await fetchMovieByGenre("movie", 28);
    setAction(await actiondata);

    const adventuredata = await fetchMovieByGenre("movie", 12);
    setAdventure(await adventuredata);

    const comedydata = await fetchMovieByGenre("movie", 35);
    setComedy(await comedydata);

    const horrordata = await fetchMovieByGenre("movie", 27);
    setHorror(await horrordata);

    const crimedata = await fetchMovieByGenre("movie", 80);
    setCrime(await crimedata);

    const romancedata = await fetchMovieByGenre("movie", 10749);
    setRomance(await romancedata);
  };

  return (
    <div className="app">
      {openModal && videoUrl && (
        <TrailerModal url={videoUrl.results} showTrailer={setOpenModal} />
      )}
      <Header />
      {menuOpen && <Menu />}
      {trending && (
        <Slider autoplay arrows={false} className="carousel">
          {trending.results.map((result) => {
            return (
              <Cover
                key={result.id}
                id={result.id}
                imageUrl={`${IMAGE_URL}${BACKDROP_SIZE}${result.backdrop_path}`}
                posterUrl={`${IMAGE_URL}${POSTER_SIZE}${result.poster_path}`}
                title={result.title}
                desc={result.overview}
                genres={result.genre_ids}
                rating={result.vote_average}
                showTrailer={setOpenModal}
                sendVideoId={setVideoId}
              />
            );
          })}
        </Slider>
      )}
      {popular && <CardSection title="Popular" data={popular} />}
      {action && <CardSection title="Action" data={action} />}
      {adventure && <CardSection title="Adventure" data={adventure} />}
      {comedy && <CardSection title="Comedy" data={comedy} />}
      {crime && <CardSection title="Crime" data={crime} />}
      {horror && <CardSection title="Horror" data={horror} />}
      {romance && <CardSection title="Romance" data={romance} />}
    </div>
  );
}

export default Movies;
