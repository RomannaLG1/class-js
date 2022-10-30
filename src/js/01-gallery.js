import {
  fetchPopularMovies,
  fetchMovieById,
  fetchMoviesGenres,
  fetchMoviesBySearch,
} from './api-service';
const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.movies-list');

// ================Create array all movies genres==================//
const arrayGenres = []; // <-- arrray all movies genres
fetchMoviesGenres().then(response => {
  // console.log(response);
  for (const elm of response.data.genres) {
    // console.log(elm);
    arrayGenres.push(elm);
  }
});

// // ================ fetch popular movies for start pages ==================//
fetchPopularMovies(4).then(response => {
  //<-- fetchPopularMovies(3 <- number of page for pagination)
  console.log(response);
  const filmsArray = response.data.results;
  console.log(filmsArray);
  filmsArray.forEach(element => {
    const newGenresArray = [];
    const resultGenres = element.genre_ids.map(genreId => {
      const resulIdtArray = arrayGenres.map(item => {
        if (item.id === genreId) {
          newGenresArray.push(item.name);
        }
      });
    });
    renderMoviesCard(element, newGenresArray);
  });
});

// ====================== Fetch Movie By Query =================== //
formEl.addEventListener('submit', searchMovies);

function searchMovies(evt) {
  evt.preventDefault();

  const searchToMovie = inputEl.value.trim();
  clearMoviesContainer();
  fetchMoviesBySearch(searchToMovie, 1).then(response => {
    //<-- fetchPopularMovies( 1 <- number of page for pagination)
    console.log(response);
    const filmsArray = response.data.results;
    console.log(filmsArray);
    filmsArray.forEach(element => {
      const newGenresArray = [];
      const resultGenres = element.genre_ids.map(genreId => {
        const resulIdtArray = arrayGenres.map(item => {
          if (item.id === genreId) {
            newGenresArray.push(item.name);
          }
        });
      });
      renderMoviesCard(element, newGenresArray);
    });
  });
}

// ==================== Render Movies Card ===================== //
function renderMoviesCard(movie, genres) {
  const { id, poster_path, title, original_title, release_date } = movie;
  listEl.innerHTML += ` <li class='movie-info'>
      <a href="#" id="${id}">
          <img
            class='movie-poster'
            src='https://image.tmdb.org/t/p/w500/${poster_path}'
            alt='${title}'
            width='395'
            height='574'
          />
          <h3 class='movie-title'> ${original_title}</h3>
          <p class='genres'>${genres.join(', ')}</p>
          <p class='year'>${+parseInt(release_date)}</p>
      </a>
        </li>`;
}

// =================== Clear Movies Container =================== //

function clearMoviesContainer() {
  listEl.innerHTML = '';
}
