


// Add imports above this line
// import { skillsItems } from './gallery-items';
// // Change code below this line
// console.log(skillsItems);
import {
  fetchPopularMovies,
  fetchMovieById,
  fetchMoviesGenres,
} from './api-service';
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.movies-list');
const arrayGenres = [];
fetchMoviesGenres().then(response => {
  // console.log(response);
  for (const elm of response.data.genres) {
    // console.log(elm);
    arrayGenres.push(elm);
  }
});
fetchPopularMovies(3).then(response => {
  console.log(response);
  const filmsArray = response.data.results;
  console.log(filmsArray);
  filmsArray.forEach(element => {
    const newGenresArray = [];
    const resultGenres = element.genre_ids.map(genreId => {
      const resulIdtArray = arrayGenres.map( item => {
        if(item.id === genreId){
          newGenresArray.push(item.name);
        }
      })
    })
    renderMoviesCard(element, newGenresArray);
  });
});
function renderMoviesCard(movie, genres) {
 const { id, poster_path, title, original_title, release_date } = movie;
  listEl.innerHTML +=
         ` <li class='movie-info'>
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
