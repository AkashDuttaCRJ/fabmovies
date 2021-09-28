const API_KEY = "c1b4f8bd12bf5a301db1cb132fb69140";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/";

const BACKDROP_SIZE = "w1280";
const POSTER_SIZE = "w500";

const TRENDING_MOVIE_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
const TRENDING_SHOWS_URL = `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`;
const POPULAR_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export const fetchTrendingMovies = async () => {
  const response = await fetch(TRENDING_MOVIE_URL);
  const data = response.json();
  return data;
};

export const fetchTrendingShows = async () => {
  const response = await fetch(TRENDING_SHOWS_URL);
  const data = response.json();
  return data;
};

export const fetchPopularMovies = async () => {
  const response = await fetch(POPULAR_URL);
  const data = response.json();
  return data;
};

export const fetchSearchResult = async (QUERY, PAGE) => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${QUERY}&page=${PAGE}&include_adult=false`
  );
  const data = response.json();
  return data;
};

export const fetchMovieById = async (ID) => {
  const response = await fetch(
    `${BASE_URL}/movie/${ID}?api_key=${API_KEY}&language=en-US`
  );
  const data = response.json();
  return data;
};

export const getGenre = (id) => {
  let i;
  const ids = [
    12, 14, 16, 18, 27, 28, 35, 36, 37, 53, 80, 99, 878, 9648, 10402, 10749,
    10751, 10752, 10770,
  ];
  const genres = [
    "Adventure",
    "Fantasy",
    "Animation",
    "Drama",
    "Horror",
    "Action",
    "Comedy",
    "History",
    "Western",
    "Thriller",
    "Crime",
    "Documentary",
    "Science Fiction",
    "Mystery",
    "Music",
    "Romance",
    "Family",
    "War",
    "TV Movie",
  ];

  for (i = 0; i < ids.length; i++) {
    if (ids[i] === id) {
      return genres[i];
    }
  }
};

export const getShowsGenre = (id) => {
  let i;
  const ids = [
    16, 18, 35, 37, 80, 99, 9648, 10751, 10759, 10762, 10763, 10764, 10765,
    10766, 10767, 10768,
  ];
  const genres = [
    "Animation",
    "Drama",
    "Comedy",
    "Western",
    "Crime",
    "Documentary",
    "Mystery",
    "Family",
    "Action & Adventure",
    "Kids",
    "News",
    "Reality",
    "Sci-Fi & Fantasy",
    "Soap",
    "Talk",
    "War & Politics",
  ];

  for (i = 0; i < ids.length; i++) {
    if (ids[i] === id) {
      return genres[i];
    }
  }
};

export { IMAGE_URL, BACKDROP_SIZE, POSTER_SIZE };
