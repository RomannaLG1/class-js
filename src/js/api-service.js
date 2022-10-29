import axios from 'axios';

const API_KEY = '7653694c4941db1f3bfb7af19c86b9a8';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchPopularMovies(page) {
  const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${page}`;
  const response = await axios(url);
  console.log(response);
  return response;
}


async function fetchMovieById (movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const response = await axios(url);
  console.log(response);
  return response;
};

async function fetchMoviesGenres() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const genres = await axios(url);
  return genres;
};

export { fetchPopularMovies, fetchMovieById, fetchMoviesGenres };
