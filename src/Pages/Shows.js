import { useState, useEffect, useContext } from "react";
import Slider from "infinite-react-carousel";

import {
  fetchTrendingShows,
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

function Shows() {
  const [trending, setTrending] = useState(null);
  const [popular, setPopular] = useState(null);
  const [animation, setAnimation] = useState(null);
  const [drama, setDrama] = useState(null);
  const [crime, setCrime] = useState(null);
  const [mystery, setMystery] = useState(null);
  const [family, setFamily] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [videoId, setVideoId] = useState();
  const [videoUrl, setVideoUrl] = useState();

  const [mainClass, setMainClass] = useState("app");

  const {menuOpen} = useContext(WishlistContext);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getVideoUrl = async () => {
      const data = await fetchVideoUrl("tv", videoId);
      setVideoUrl(await data);
    };
    videoId && getVideoUrl();
  }, [videoId]);

  useEffect(() => {
    openModal && setMainClass("app prevent-scroll");
    !openModal && setMainClass("app");
  }, [openModal])

  const getData = async () => {
    const data = await fetchTrendingShows();
    setTrending(await data);

    const populardata = await fetchPopularMovies("tv");
    setPopular(await populardata);

    const animationdata = await fetchMovieByGenre("tv", 16);
    setAnimation(await animationdata);

    const dramadata = await fetchMovieByGenre("tv", 18);
    setDrama(await dramadata);

    const crimedata = await fetchMovieByGenre("tv", 80);
    setCrime(await crimedata);

    const mysterydata = await fetchMovieByGenre("tv", 9648);
    setMystery(await mysterydata);

    const familydata = await fetchMovieByGenre("tv", 10751);
    setFamily(await familydata);
  };

  return (
    <div className={mainClass}>
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
                title={result.name}
                desc={result.overview}
                genres={result.genre_ids}
                rating={result.vote_average}
                showTrailer={setOpenModal}
                sendVideoId={setVideoId}
                shows
              />
            );
          })}
        </Slider>
      )}
      {popular && <CardSection title="Popular" data={popular} shows />}
      {animation && <CardSection title="Animation" data={animation} shows />}
      {crime && <CardSection title="Crime" data={crime} shows />}
      {drama && <CardSection title="Drama" data={drama} shows />}
      {family && <CardSection title="Family" data={family} shows />}
      {mystery && <CardSection title="Mystery" data={mystery} shows />}
    </div>
  );
}

export default Shows;
